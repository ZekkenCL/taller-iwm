from flask import Blueprint, jsonify, request
from app import db
from app.models import Cliente
from app.models import Admin
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token

# Crea un Blueprint
routes = Blueprint('routes', __name__)

@routes.route('/clientes', methods=['GET'])
def get_clientes():
    clientes = Cliente.query.all()
    return jsonify([cliente.to_dict() for cliente in clientes])

@routes.route('/cliente/<int:id>', methods=['GET'])
def get_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    return jsonify(cliente.to_dict())

@routes.route('/cliente', methods=['POST'])
def add_cliente():
    data = request.json
    nuevo_cliente = Cliente(name=data['name'], lastname=data['lastname'], dni=data['dni'], email=data['email'], points=data['points'])
    db.session.add(nuevo_cliente)
    db.session.commit()
    return jsonify(nuevo_cliente.to_dict()), 201

@routes.route('/cliente/<int:id>', methods=['PUT'])
def update_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    data = request.json
    cliente.name = data['name']
    cliente.lastname = data['lastname']
    cliente.dni = data['dni']
    cliente.email = data['email']
    cliente.points = data['points']
    db.session.commit()
    return jsonify(cliente.to_dict())

@routes.route('/cliente/<int:id>', methods=['DELETE'])
def delete_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    db.session.delete(cliente)
    db.session.commit()
    return jsonify({'message': 'Cliente eliminado correctamente'})

@routes.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Falta JSON en la solicitud"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username or not password:
        return jsonify({"msg": "Faltan credenciales"}), 400

    admin = Admin.query.filter_by(user=username).first()
    if not admin or not check_password_hash(admin.password, password):
        return jsonify({"msg": "Credenciales incorrectas"}), 401

    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200
