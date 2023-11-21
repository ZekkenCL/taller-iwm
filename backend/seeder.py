from app import create_app, db
from app.models import Cliente, Admin
from werkzeug.security import generate_password_hash

app = create_app()
app.app_context().push()

def seed_data():
    # Datos de prueba para Clientes
    clientes = [
        Cliente(name='Juan', lastname='Pérez', dni='12345678', email='juan@example.com', points=10),
        Cliente(name='Ana', lastname='García', dni='87654321', email='ana@example.com', points=20)
    ]

    # Datos de prueba para Admins con contraseña hasheada
    admin_password = generate_password_hash('Jaqamain3pals')
    admin_user = Admin(user='Ochietto', password=admin_password)

    # Insertar en la base de datos
    db.session.add_all(clientes)
    db.session.add(admin_user)
    db.session.commit()

if __name__ == '__main__':
    seed_data()
