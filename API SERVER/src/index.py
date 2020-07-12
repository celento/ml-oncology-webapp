from flask import Flask
from flask import request, render_template
from flask import jsonify
from flask_cors import CORS
import random
import string
import urllib.request
import re
import io
import calendar
import requests
from decimal import *
import json
import os
from random import randrange
import datetime
import hashlib

# Load model Brain Cancer
import numpy as np 
import pandas as pd 
import os,gc,pathlib
from sklearn.metrics import confusion_matrix
from fastai import *
from fastai.vision import *
from fastai.vision.models import *
import torchvision.models as models
import cv2
from PIL import Image as PImage
from fastai.vision import *


# IPFS
import ipfshttpclient

# to enable ipfs daemon to work with our meteor desktop/mobile apps
 

app = Flask(__name__)
CORS(app,headers=['Content-Type'])


class Blockchain:

    def __init__(self):
        self.chainPatient = []
        self.chainDoctor = []
        self.chainAccess = []
        self.create_block_doctor(doctorID=None,hID=None,proof = 1, previous_hash = '0')
        self.create_block_patient(patientID=None,proof = 1, previous_hash = '0')
        self.create_block_access(doctorID=None,patientID=None,hID=None,aCode=None,proof = 1, previous_hash = '0')


    def create_block_doctor(self,doctorID,hID,proof,previous_hash):
        block = {'index': len(self.chainDoctor) + 1,
                 'timestamp': str(datetime.datetime.now()),
                 'proof': proof,
                 'doctorID':doctorID,
                 'hospitalID':hID,
                 'previous_hash': previous_hash}
        self.chainDoctor.append(block)
        return block

    def create_block_patient(self,patientID,proof,previous_hash):
        block = {'index': len(self.chainPatient) + 1,
                 'timestamp': str(datetime.datetime.now()),
                 'proof': proof,
                 'patientID':patientID,
                 'previous_hash': previous_hash}
        self.chainPatient.append(block)
        return block

    def create_block_access(self,doctorID,patientID,hID,aCode,proof,previous_hash):
        block = {'index': len(self.chainAccess) + 1,
                 'timestamp': str(datetime.datetime.now()),
                 'proof': proof,
                 'doctorID':doctorID,
                 'patientID':patientID,
                 'hospitalID' : hID,
                 'accessCode' : aCode,
                 'previous_hash': previous_hash}
        self.chainAccess.append(block)
        return block

    def get_previous_block(self,type):
        if type==1:
            return self.chainAccess[-1]
        elif type==2:
            return self.chainPatient[-1]
        elif type==3:
            return self.chainDoctor[-1]
        else:
            return False
    

    def proof_of_work(self, previous_proof):
        new_proof = 1
        check_proof = False
        while check_proof is False:
            hash_operation = hashlib.sha256(str(new_proof**2 - previous_proof**2).encode()).hexdigest()
            if hash_operation[:4] == '0000':
                check_proof = True
            else:
                new_proof += 1
        return new_proof
    
    def hash(self, block):
        encoded_block = json.dumps(block, sort_keys = True).encode()
        return hashlib.sha256(encoded_block).hexdigest()
    
    def is_chain_valid(self,chain,type):
 
        previous_block = chain
        block_length = len(chain)
        block_index = 1

        while block_index < block_length:
            block = chain[block_index]
            if block['previous_hash'] != self.hash(previous_block):
                print("h1")
                return False
            previous_proof = previous_block['proof']
            proof = block['proof']
            hash_operation = hashlib.sha256(str(proof**2 - previous_proof**2).encode()).hexdigest()
            if hash_operation[:4] != '0000':
                print("h2",block_index)
                return False
            previous_block = block
            block_index += 1
        return True
 
 
 
blockchain = Blockchain()

@app.route('/mine/doctor', methods = ['POST'])
def mine_block_doctor():
    req_data = request.get_json()
    doctorID = req_data['doctorID']
    hID = req_data['hID']
    previous_block = blockchain.get_previous_block(type=3)
    previous_proof = previous_block['proof']
    proof = blockchain.proof_of_work(previous_proof)
    previous_hash = blockchain.hash(previous_block)
    block = blockchain.create_block_doctor(doctorID,hID,proof,previous_hash)
    response = {'message': 'A new doctor block has been successfully mined!',
                'index': block['index'],
                'timestamp': block['timestamp'],
                'proof': block['proof'],
                'previous_hash': block['previous_hash']}
    return jsonify(response), 200


@app.route('/mine/patient', methods = ['POST'])
def mine_block_patient():
    req_data = request.get_json()
    patientID = req_data['patientID']
    previous_block = blockchain.get_previous_block(type=2)
    previous_proof = previous_block['proof']
    proof = blockchain.proof_of_work(previous_proof)
    previous_hash = blockchain.hash(previous_block)
    block = blockchain.create_block_patient(patientID,proof,previous_hash)
    response = {'message': 'A new patient block has been successfully mined!',
                'index': block['index'], 
                'timestamp': block['timestamp'],
                'proof': block['proof'],
                'previous_hash': block['previous_hash']}
    return jsonify(response), 200


@app.route('/mine/access', methods = ['POST'])
def mine_block_access():
    req_data = request.get_json()
    doctorID = req_data['doctorID']
    patientID = req_data['patientID']
    hID = req_data['hID']
    accessCode = req_data['accessCode']
    previous_block = blockchain.get_previous_block(type=1)
    previous_proof = previous_block['proof']
    proof = blockchain.proof_of_work(previous_proof)
    previous_hash = blockchain.hash(previous_block)
    block = blockchain.create_block_access(doctorID,patientID,hID,accessCode,proof,previous_hash)
    response = {'message': 'A new access block has been successfully mined!',
                'index': block['index'],
                'timestamp': block['timestamp'],
                'proof': block['proof'],
                'previous_hash': block['previous_hash']}
    return jsonify(response), 200

 
@app.route('/get_chain/doctor', methods = ['GET'])
def get_chain_doctor():
    response = {'chain': blockchain.chainDoctor,
                'length': len(blockchain.chainDoctor)}
    return jsonify(response), 200

@app.route('/get_chain/patient', methods = ['GET'])
def get_chain_patient():
    response = {'chain': blockchain.chainPatient,
                'length': len(blockchain.chainPatient)}
    return jsonify(response), 200
 
@app.route('/get_chain/access', methods = ['GET'])
def get_chain_access():
    response = {'chain': blockchain.chainAccess,
                'length': len(blockchain.chainAccess)}
    return jsonify(response), 200
 

@app.route('/is_authorized', methods = ['POST'])
def is_authorized():
    req_data = request.get_json()
    doctorID = req_data['doctorID']
    chain = blockchain.chainDoctor
    chain_length = len(chain)
    response = False
    for i in chain:
        if i['doctorID'] == doctorID:
            response = True
    return jsonify(valid=response), 200

@app.route('/is_valid/doctor', methods = ['GET'])
def is_valid_doctor():
    is_valid = blockchain.is_chain_valid(blockchain.chainDoctor,type=3)
    if is_valid:
        response = {'message': 'All good. The Blockchain is valid.'}
    else:
        response = {'message': 'Houston, we have a problem. The Doctor Blockchain is not valid.'}
    return jsonify(response), 200

@app.route('/is_valid/patient', methods = ['GET'])
def is_valid_patient():
    is_valid = blockchain.is_chain_valid(blockchain.chainPatient,type=2)
    if is_valid:
        response = {'message': 'All good. The Patient Blockchain is valid.'}
    else:
        response = {'message': 'Houston, we have a problem. The Patient Blockchain is not valid.'}
    return jsonify(response), 200

@app.route('/is_valid/access', methods = ['GET'])
def is_valid_access():
    is_valid = blockchain.is_chain_valid(blockchain.chainAccess,type=1)
    if is_valid:
        response = {'message': 'All good. The Blockchain is valid.'}
    else:
        response = {'message': 'Houston, we have a problem. The Access Blockchain is not valid.'}
    return jsonify(response), 200




@app.route("/")
def hello():
	return "01000111 01101100 01100001 01100100 00100000 01111001 01101111 01110101 00100000 01110100 01101111 01101111 01101011 00100000 01110100 01101000 01100101 00100000 01110100 01101001 01101101 01100101 00100000 01110100 01101111 00100000 01100011 01101111 01101110 01110110 01100101 01110010 01110100 00100000 01110100 01101000 01101001 01110011 00100000 00111100 00110011"

@app.route("/brain_cancer",methods = ['POST'])
def brain_cancer():
    path = os.getcwd()+"/temp_storage"
    dirs = os.listdir( path )

    # for file in dirs:
    #     print(file)
    rand = randrange(324234,10443243)
    req_data = request.get_json()
    link = req_data['link']

    urllib.request.urlretrieve(link,path+"/"+str(rand)+".jpg")

    # cv2 imread
    im = cv2.imread(path+"/"+str(rand)+".jpg")
    #To convert the image into a Tensor which is required for our model
  
    print(im)
    pil_im = PImage.fromarray(im) 
    x = pil2tensor(pil_im ,np.float32)

    #  Prediction
    new_learn = load_learner('./')
    x1 = new_learn.get_preds(Image(x))
    print(type(list(x1)[0]))
    print(list(x1))


    return jsonify(prediction=list(x1))


@app.route("/ipfs")

# TODO
# Get file from aws, then upload to ipfs, return back the ipfs url, delete the file on aws s3

def ipfs():
    client = ipfshttpclient.connect('/ip4/127.0.0.1/tcp/5001/http')
    res = client.add('y.pdf')
    print("https://ipfs.io/ipfs/"+res['Hash'])
    file = open('ipfs_files/y.pdf','wb')
    file.write(client.cat(res['Hash']))
    return "IPFS"






if __name__ == "__main__": 
    app.run(host ='0.0.0.0', port = 7000, debug = True) 