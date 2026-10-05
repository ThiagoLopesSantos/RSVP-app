# 💍 Sistema RSVP para Casamento

Sistema completo de Confirmação de Presença (RSVP) desenvolvido sob medida para gerenciamento de casamentos, contando com um painel administrativo seguro, multi-tenant (isolado por administrador) e um portal público interativo para os convidados.

## 🚀 Tecnologias Utilizadas

* **Backend:** FastAPI (Python) com SQLite
* **Autenticação:** JWT (JSON Web Tokens) e Criptografia de Senhas com Bcrypt
* **Frontend:** HTML5, CSS3 e JavaScript Vanilla (Modularizado)

## ✨ Principais Funcionalidades

### 👑 Painel Administrativo (`Dashboard`)
* **Autenticação Segura:** Login e cadastro de administradores protegidos por token JWT.
* **Isolamento de Dados (`Multi-tenant`):** Cada administrador gerencia exclusivamente a sua própria lista de convidados (`admin_id`).
* **Gestão de Convidados:** Cadastro, edição e exclusão de convidados e seus respectivos limites de acompanhantes.
* **Cards de Estatísticas Inteligentes:** 
  * Total de convidados.
  * Contagem inteligente de pessoas confirmadas (contabilizando o titular e acompanhantes maiores de 7 anos, aplicando a isenção automática para crianças menores de 7 anos).
  * Convidados pendentes e recusados.
* **Filtros e Busca:** Ferramenta de busca por nome e filtro rápido por status de presença.
* **Exportação CSV Avançada:** Exportação detalhada da lista em formato de planilha dividida em linhas (Titular e Acompanhantes).
* **Integração com WhatsApp:** Botão de disparo rápido de mensagens de cobrança/lembrete personalizadas para o WhatsApp do convidado.

### 🌐 Portal do Convidado
* **Identificação por Celular:** O convidado acessa sua área restrita digitando apenas o número de celular cadastrado.
* **Adição de Acompanhantes:** Interface dinâmica para preenchimento de nome e idade dos acompanhantes até o limite estipulado pelos noivos.
* **Validação de Idade Infantil:** Alerta visual automático para crianças menores de 7 anos.
* **Revisão e Confirmação:** Etapa de resumo antes do envio definitivo e tela estática de agradecimento/feedback.

---

## 🛠️ Como Executar o Projeto Localmente

### 1. Clonar o repositório ou abrir a pasta
Abra o terminal na pasta raiz do projeto.

### 2. Configurar o Ambiente Python e Instalar Dependências
Certifique-se de ter o Python instalado. Instale os pacotes necessários executando:
```bash
pip install fastapi uvicorn bcrypt python-jose

3. Iniciar a API (Backend)
Na raiz do projeto, execute o Uvicorn para subir o servidor:

Bash
uvicorn main:app --reload
A API estará rodando em http://127.0.0.1:8000. Você pode acessar a documentação interativa em http://127.0.0.1:8000/docs.

4. Abrir o Frontend
Basta abrir os arquivos HTML da pasta frontend/ diretamente no seu navegador (ou utilizando a extensão Live Server do VS Code):

Área do Admin: frontend/index.html

Portal do Convidado: frontend/convidados/convite.html