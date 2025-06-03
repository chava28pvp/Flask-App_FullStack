import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'devkey123')  # Usar variable de entorno en producción
    SQLALCHEMY_DATABASE_URI = (
 "mssql+pyodbc://@GAMEZ28\\SQLEXPRESS/ToDoListConnection"
    "?driver=ODBC+Driver+17+for+SQL+Server"
    "&trusted_connection=yes"    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
