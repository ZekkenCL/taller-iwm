from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

# Inicializa las extensiones
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:beno1989@localhost:3306/taller'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY']='jakshdjkashd882jhj3bjh1l'

    jwt = JWTManager(app)

    # Inicializa las extensiones con el objeto de la app
    db.init_app(app)
    migrate.init_app(app, db)

    CORS(app)

    # Importa y registra el Blueprint
    from app.routes import routes
    app.register_blueprint(routes)

    return app

