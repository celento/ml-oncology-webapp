import numpy as np 
import pandas as pd 
import os,gc,pathlib
from sklearn.metrics import confusion_matrix
 
   
import torch
import torch.nn as nn
import torch.nn.functional as F


print(os.listdir("/content/drive/My Drive/Dataset/extract"))
import torchvision.models as models


DATA_DIR='/content/drive/My Drive/Dataset/extract/brain_tumor_dataset'

# Listing the directory contents
os.listdir(f'{DATA_DIR}')
# ['no', 'yes']

data = ImageDataBunch.from_folder(DATA_DIR, train=".", 
                                  valid_pct=0.2,
                                  ds_tfms=get_transforms(flip_vert=True, max_warp=0),
                                  size=224,bs=8, 
                                  num_workers=0).normalize(imagenet_stats)
print(f'Classes: \n {data.classes}')

# Displaying the first few rows
data.show_batch(rows=10, figsize=(10,5))


# Creating the CA-CNN Model

# Contains 3 Cascading Layers with the output of each model fed into the next.
# The final model is saved and used to for testing
 
class conv(nn.Module):
    def __init__(self,in_ch,out_ch):
        super(conv,self).__init__()
        self.conv=nn.Sequential(
            nn.Conv3d(in_ch,out_ch,(3,3,3),padding=(1,1,1)),
            nn.BatchNorm3d(out_ch),
            nn.PReLU(),
        )
    def forward(self, x):
        x=self.conv(x)
        return x
class inconv(nn.Module):
    def __init__(self,in_ch,out_ch):
        super(inconv,self).__init__()
        self.conv=nn.Sequential(
            nn.Conv3d(in_ch,out_ch,3,padding=1),
            nn.BatchNorm3d(out_ch),
            nn.PReLU(),
        )
    def forward(self, x):
        x=self.conv(x)
        return x
class res_block(nn.Module):
    ''''''
    def __init__(self,in_ch,out_ch,d=1):
        super(res_block,self).__init__()
        self.doubleconv = nn.Sequential(
            nn.Conv3d(in_ch, out_ch, (3, 3, 1), padding=(d, d, 0), dilation=(d, d, 1)),
            nn.BatchNorm3d(out_ch),
            nn.PReLU(),
            nn.Conv3d(out_ch, out_ch, (3, 3, 1), padding=(d, d, 0), dilation=(d, d, 1)),
            nn.BatchNorm3d(out_ch),
            nn.PReLU()
        )
    def forward(self, x):
        x1 = self.doubleconv(x)
        x =x+ x1
        return x
class anistropic_conv(nn.Module):
    '''1X1X3'''
    def __init__(self,in_ch,out_ch):
        super(anistropic_conv,self).__init__()
        self.aniconv=nn.Sequential(
            nn.Conv3d(in_ch,out_ch,(1,1,3),padding=(0,0,1),dilation=1),
            nn.BatchNorm3d(out_ch),
            nn.PReLU(),
        )
    def forward(self,x):
        x1=self.aniconv(x)
        return x1
class Block_3(nn.Module):
    def __init__(self,in_ch,out_ch,flag):
        super(Block_3,self).__init__()
        if flag==1:
            self.block = nn.Sequential(
                res_block(in_ch, out_ch, 1),
                res_block(out_ch, out_ch, 2),
                res_block(out_ch, out_ch, 3),
                anistropic_conv(out_ch, out_ch)
            )
        else:
            self.block = nn.Sequential(
                res_block(in_ch, out_ch, 3),
                res_block(out_ch, out_ch, 2),
                res_block(out_ch, out_ch, 1),
                anistropic_conv(out_ch, out_ch)
            )
    def forward(self, x):
        x1=self.block(x)
        return x1
class Block_2(nn.Module):
    def __init__(self,in_ch,out_ch,flag):
        super(Block_2,self).__init__()
        self.flag=flag
        self.block=nn.Sequential(
            res_block(in_ch,out_ch),
            res_block(out_ch,out_ch),
            anistropic_conv(out_ch,out_ch),
        )
        self.pooling=nn.Sequential(
            nn.Conv3d(out_ch, out_ch, kernel_size=(3,3,1), stride=(2,2,1),padding=(1,1,0)),
            nn.BatchNorm3d(out_ch),
            nn.PReLU(),
        )

    def forward(self, x):
        x1=self.block(x)
        out=self.pooling(x1)
        if self.flag==1:
            return x1,out
        else:
            return out
class up(nn.Module):
    def __init__(self,in_ch,out_classes,flag):
        super(up,self).__init__()
        if flag==2:
            self.conv = nn.Sequential(
                nn.Conv3d(in_ch, out_classes, (3, 3, 1), padding=(1, 1, 0)),
                nn.ConvTranspose3d(out_classes, out_classes, kernel_size=(3,3,1), \
                           stride=(2,2,1),padding=(1,1,0),output_padding=(1,1,0)),
                nn.BatchNorm3d(out_classes),
                nn.PReLU(),
            )
        if flag==4:
            self.conv = nn.Sequential(
                nn.Conv3d(in_ch, out_classes, (3, 3, 1), padding=(1, 1, 0)),
                nn.ConvTranspose3d(out_classes, out_classes, kernel_size=(3,3,1), \
                           stride=(2,2,1),padding=(1,1,0),output_padding=(1,1,0)),
                nn.BatchNorm3d(out_classes),
                nn.PReLU(),
                nn.ConvTranspose3d(out_classes,out_classes, kernel_size=(3,3,1), \
                           stride=(2,2,1),padding=(1,1,0),output_padding=(1,1,0)),
                nn.BatchNorm3d(out_classes),
                nn.PReLU(),
            )
        if flag==1:
            self.conv = nn.Sequential(
                nn.Conv3d(in_ch, out_classes, (3, 3, 1), padding=(1, 1, 0)),
            )


    def forward(self, x):
        x=self.conv(x)
        return x


class WNET(nn.Module):
    def __init__(self,n_channels,out_ch,n_classes):
        super(WNET,self).__init__()
        self.conv=conv(n_channels,out_ch)
        self.block0=Block_2(out_ch,out_ch,0)
        self.block1=Block_2(out_ch,out_ch,1)
        self.block2 = Block_3(out_ch, out_ch,1)
        self.block3 = Block_3(out_ch, out_ch, 0)
        self.up0=up(out_ch,n_classes,2)
        self.up1 = up(out_ch, n_classes*2, 4)
        self.up2 = up(out_ch, n_classes*4, 4)
        self.out=up(7*n_classes,n_classes,1)
    def forward(self, x):
        x=self.conv(x)
        x=self.block0(x)
        x0,x=self.block1(x)
        x0=self.up0(x0)
        x=self.block2(x)
        x1=self.up1(x)
        x=self.block3(x)
        x=self.up2(x)
        x=torch.cat([x0,x1,x],dim=1)
        x=self.out(x)
        return F.sigmoid(x)
class ENET(nn.Module):
    def __init__(self,n_channels,out_ch,n_classes):
        super(ENET, self).__init__()
        self.conv = conv(n_channels, out_ch)
        self.block0 = Block_2(out_ch, out_ch, 1)
        self.block1 = Block_2(out_ch, out_ch, 1)
        self.block2 = Block_3(out_ch, out_ch, 1)
        self.block3 = Block_3(out_ch, out_ch, 0)
        self.up1 = up(out_ch, n_classes * 2, 2)
        self.up2 = up(out_ch, n_classes * 2, 2)
        self.out = up(5 * n_classes, n_classes, 1)

    def forward(self, x):
        x = self.conv(x)
        x,_ = self.block0(x)
        x0, x = self.block1(x)
        x = self.block2(x)
        x1 = self.up1(x)
        x = self.block3(x)
        x = self.up2(x)
        x = torch.cat([x0, x1, x], dim=1)
        x = self.out(x)
        return F.sigmoid(x)


# Training the model

learn.fit_one_cycle(10,3e-3)

learn = cnn_learner(data, models.resnet152, metrics=accuracy, model_dir="/tmp/model/")


learn.save('/content/drive/My Drive/Dataset/stage-2')

# Testing with a sample image


img = torch.from_numpy(im).type(torch.FloatTensor) 

from PIL import Image as PImage
from fastai.vision import *

# x =""
# with open("/content/drive/My Drive/Dataset/extract/yes/Y1.jpg", 'rb') as f:
#   x = list(f)
 
pil_im = PImage.fromarray(im) 
x = pil2tensor(pil_im ,np.float32)
preds_num = learn.predict(Image(x))[2].numpy()


