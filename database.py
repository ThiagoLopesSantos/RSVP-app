from contextlib import contextmanager
import sqlite3

DATABASE_NAME = "casamento.db"

@contextmanager
def obter_conexao():
    conexao = sqlite3.connect(DATABASE_NAME)
    try:
        yield conexao
    finally:
        conexao.close()

def criar_tabelas():
    with obter_conexao() as conexao:
        cursor = conexao.cursor()
        
        # Tabela de Administradores
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS administradores (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                celular TEXT NOT NULL,
                senha TEXT NOT NULL,
                nome_evento TEXT,
                data_evento TEXT
            )
        """)
        
        # Tabela de Convidados com índice único combinando admin_id e celular
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS convidados (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                admin_id INTEGER NOT NULL,
                nome_completo TEXT NOT NULL,
                celular TEXT NOT NULL,
                status_presenca TEXT DEFAULT 'pendente',
                limite_acompanhantes INTEGER DEFAULT 0,
                nome_acompanhante TEXT,
                FOREIGN KEY (admin_id) REFERENCES administradores (id),
                UNIQUE(admin_id, celular)
            )
        """)
        
        # Tabela de Acompanhantes detalhados
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS acompanhantes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                convidado_id INTEGER,
                nome TEXT NOT NULL,
                idade INTEGER NOT NULL,
                FOREIGN KEY (convidado_id) REFERENCES convidados (id) ON DELETE CASCADE
            )
        """)
        
        conexao.commit()