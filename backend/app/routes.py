from flask import Blueprint, jsonify, request
from app import db
from app.models import Cliente, Admin
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required  # Importa jwt_required para proteger rutas

# Crea un Blueprint para organizar las rutas
routes = Blueprint('routes', __name__)

@routes.route('/clientes', methods=['GET'])
@jwt_required()  # Requiere autenticación JWT para acceder a esta ruta
def get_clientes():
    # Obtiene todos los clientes de la base de datos y los devuelve en formato JSON
    clientes = Cliente.query.all()
    return jsonify([cliente.to_dict() for cliente in clientes])

@routes.route('/clientes/buscar', methods=['GET'])
@jwt_required()  # Requiere autenticación JWT para acceder a esta ruta
def buscar_clientes():
    # Obtiene un término de búsqueda y devuelve clientes que coinciden con el DNI o el correo electrónico
    termino_busqueda = request.args.get('busqueda', type=str)
    clientes = Cliente.query.filter(
        (Cliente.dni == termino_busqueda) | (Cliente.email == termino_busqueda)
    ).all()
    return jsonify([cliente.to_dict() for cliente in clientes])

@routes.route('/cliente', methods=['POST'])
@jwt_required()  # Requiere autenticación JWT para acceder a esta ruta
def add_cliente():
    # Añade un nuevo cliente a la base de datos, verificando primero que el DNI y el correo no estén ya registrados
    data = request.json
    dni_existente = Cliente.query.filter_by(dni=data['dni']).first()
    email_existente = Cliente.query.filter_by(email=data['email']).first()

    if dni_existente or email_existente:
        return jsonify({"msg": "El DNI/RUT o correo electrónico ya está registrado"}), 400

    nuevo_cliente = Cliente(
        name=data['name'], 
        lastname=data['lastname'], 
        dni=data['dni'], 
        email=data['email'], 
        points=data['points']
    )
    db.session.add(nuevo_cliente)
    db.session.commit()
    return jsonify(nuevo_cliente.to_dict()), 201

@routes.route('/cliente/<int:id>', methods=['PUT'])
@jwt_required()  # Requiere autenticación JWT para acceder a esta ruta
def update_cliente(id):
    # Actualiza la información de un cliente específico
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
@jwt_required()  # Requiere autenticación JWT para acceder a esta ruta
def delete_cliente(id):
    # Elimina un cliente específico de la base de datos
    cliente = Cliente.query.get_or_404(id)
    db.session.delete(cliente)
    db.session.commit()
    return jsonify({'message': 'Cliente eliminado correctamente'})

@routes.route('/login', methods=['POST'])
def login():
    # Maneja la autenticación de los usuarios (administradores) y devuelve un token JWT si las credenciales son correctas
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
