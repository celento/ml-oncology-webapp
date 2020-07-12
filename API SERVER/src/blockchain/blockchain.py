# input  userid,
import datetime
import hashlib
import json
from flask import Flask, jsonify,request
 


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
                return False
            previous_proof = previous_block['proof']
            proof = block['proof']
            hash_operation = hashlib.sha256(str(proof**2 - previous_proof**2).encode()).hexdigest()
            if hash_operation[:4] != '0000':
                return False
            previous_block = block
            block_index += 1
        return True
 
 
app = Flask(__name__)
 
blockchain = Blockchain()

@app.route('/mine/doctor', methods = ['GET'])
def mine_block_doctor():
    doctorID = "123"
    hID = "1234"
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


@app.route('/mine/patient', methods = ['GET'])
def mine_block_patient():
    patientID = "1234567"
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


@app.route('/mine/access', methods = ['GET'])
def mine_block_access():
    doctorID = "123"
    patientID = "12334"
    hID = "1234"
    accessCode = "23123"
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
 

@app.route('/is_authorized', methods = ['GET'])
def is_authorized():
    doctorID = "123"
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

 
app.run(host = '0.0.0.0', port = 7000)
