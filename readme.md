Markdown
<div align="center">

# ☀️ Sunshine Events - RSVP
### Sistema Profissional de Gestão de Eventos e Confirmação de Presença (SaaS)

[![Python](https://img.shields.io/badge/Python-3.11%2B-blue?style=flat-square&logo=python)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100%2B-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Database-003B57?style=flat-square&logo=sqlite)](https://www.sqlite.org/)
[![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-success?style=flat-square)]()

*Uma solução moderna, modular e de alta performance para gerenciar listas de presença, convidados e acompanhantes com isolamento total de dados entre eventos.*

---

</div>

## 📖 Sobre o Projeto

O **Sunshine Events - RSVP** nasceu com o propósito de transformar a experiência de organização e confirmação de presença em eventos (com foco inicial em casamentos). O projeto foi construído do absoluto zero com um forte rigor de engenharia de software, priorizando:
* **Arquitetura Limpa:** Separação estrita de responsabilidades entre backend modular e frontend com arquivos dedicados (zero CSS inline).
* **Segurança de Nível Comercial:** Autenticação via JWT, criptografia robusta de senhas com Bcrypt e isolamento multi-tenant (`multi-tenancy`) para múltiplos administradores.
* **Experiência do Usuário (UX):** Interfaces limpas com design *Glassmorphism/Clean*, tipografia sofisticada (*Playfair Display* & *Montserrat*) e links personalizados para disparos via WhatsApp.

---

## 🛠️ Arquitetura e Tecnologias

O sistema é dividido em uma API robusta em Python e um frontend moderno baseado em páginas estáticas estruturadas:

* **Backend:** [FastAPI](https://fastapi.tiangolo.com/) estruturado em rotas modulares (`admin.py`, `convidados.py`) com validação estrita de dados via **Pydantic**.
* **Banco de Dados:** [SQLite](https://www.sqlite.org/) otimizado com gerenciadores de contexto (`contextmanager`) e índices únicos compostos para evitar conflitos de dados.
* **Segurança:** Autenticação baseada em tokens **JWT (JSON Web Tokens)** e hash de senhas com **Bcrypt**.
* **Frontend:** HTML5, CSS3 modular (um arquivo por página: `index.css`, `style.css`, `convite.css`) e JavaScript puro (ES6+).
* **Exportação:** Integração com **SheetJS (xlsx)** para download de relatórios gerenciais diretamente em planilhas do Excel.

---

## ✨ Funcionalidades Principais

* 🔐 **Painel Administrativo Seguro:** Cadastro, login e redefinição de senha com validações rigorosas de e-mail duplicado e força de senha.
* 👥 **Isolamento de Dados (Multi-Tenancy):** Cada administrador possui sua própria base de convidados isolada por `admin_id`. O mesmo número de telefone pode ser cadastrado em eventos diferentes sem gerar conflitos no banco de dados.
* 📱 **Portal do Convidado Personalizado:** O convidado acessa o link exclusivo do evento (ex: `convite.html?evento=ID`), visualiza o nome do casamento em destaque, busca pelo celular e gerencia sua confirmação e acompanhantes.
* 👶 **Controle Inteligente de Acompanhantes:** Definição de limites por convidado e regras customizadas (como isenção de contagem para crianças menores de 7 anos).
* 📲 **Disparos Rápidos via WhatsApp:** Geração automática de links de convite e lembretes amigáveis direto na tabela de gerenciamento da dashboard.
* 📊 **Exportação Executiva:** Geração de lista sequencial limpa em formato `.xlsx` focada na portaria do evento.

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o ambiente de desenvolvimento na sua máquina:

### 1. Clonar e Acessar o Repositório
```bash
git clone <url-do-seu-repositorio>
cd sistema-rsvp
2. Configurar o Backend (FastAPI)
Recomenda-se o uso de um ambiente virtual Python:

Bash
# Criar e ativar o ambiente virtual
python -m venv venv
# No Windows:
venv\Scripts\activate

# Instalar as dependências necessárias
pip install fastapi uvicorn pydantic bcrypt python-jose python-multipart
3. Iniciar o Servidor da API
Bash
uvicorn main:app --reload
A API estará rodando em http://127.0.0.1:8000 (com documentação interativa em /docs).

4. Executar o Frontend
Abra os arquivos HTML localmente (por exemplo, utilizando a extensão Live Server do VS Code) a partir da pasta frontend/.

📜 Histórico de Desenvolvimento
O projeto evoluiu de um script básico monolítico para uma aplicação SaaS corporativa através de uma série de iterações estruturadas:

MVP Funcional: Criação das rotas iniciais em FastAPI e banco SQLite global.

Refinamento de UX: Adição de feedback visual temporizado no portal do convidado e validações frontend de segurança.

Modularização de Estilos: Separação completa do CSS por página para garantir escalabilidade e limpeza de código.

Arquitetura Multi-Tenant: Implementação de chaves compostas no banco (admin_id + celular), rotas protegidas por JWT e links dinâmicos por evento com integração nativa ao WhatsApp.