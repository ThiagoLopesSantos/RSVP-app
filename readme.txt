================================================================================
RELATÓRIO DE DESENVOLVIMENTO & ANÁLISE DE PROGRESSO - SISTEMA RSVP CASAMENTO API
================================================================================

1. VISÃO GERAL DO PROJETO
--------------------------------------------------------------------------------
- Objetivo: Transformar um protótipo inicial de API para confirmação de presença 
  em eventos (RSVP) em um sistema profissional, modular, seguro e resiliente.
- Stack Tecnológica: Python 3.13, FastAPI, SQLite, PyJWT e Bcrypt.
- Entregável Final: API RESTful completa com CRUD de convidados, autenticação 
  administrativa via JWT (protegida por Bearer Token) e Portal de Confirmação 
  de Presença para os convidados.


2. LINHA DO TEMPO E AÇÕES (TIMELINE)
--------------------------------------------------------------------------------
[Início] Conceituação & Leitura do Protótipo
  │
  ├──► Refatoração da Arquitetura (Modularização em Arquivos)
  │
  ├──► Ajuste de Segurança (Migração para Bcrypt direto & JWT)
  │
  ├──► Tratamento de Concorrência SQLite (Implementação do Context Manager)
  │
  ├──► Resolução de Erros de Execução & Importações
  │
  ├──► Otimização da Experiência no Swagger UI (HTTPBearer)
  │
  └──► [Conclusão] Implementação Final do CRUD & Validação End-to-End

Ações executadas:
1. Estruturação da Arquitetura Modular: Separação do arquivo único inicial em 
   módulos especializados (database.py, schemas.py, auth.py, main.py e pasta routers/).
2. Atualização da Camada de Criptografia: Substituição da biblioteca legado passlib 
   por chamadas diretas ao bcrypt com limitação explícita de 72 bytes.
3. Mecanismo de Conexão com Banco de Dados: Substituição de conexões abertas 
   manualmente (conectar_banco()) por gerenciador de contexto (with obter_conexao()).
4. Alinhamento do Fluxo de Login e Tokens: Ajuste nos retornos da rota de 
   autenticação e no mecanismo de injeção de dependência do FastAPI.
5. Ajuste na Interface do Swagger UI: Ajuste de OAuth2PasswordBearer para HTTPBearer 
   facilitando a inserção manual e direta do token no cabeçalho da requisição.
6. Complementação das Funcionalidades Admin: Finalização das rotas de edição 
   (PUT /admin/convidado/{id}) e deleção (DELETE /admin/convidado/{id}).


3. ANÁLISE DA POSTURA ANALÍTICA E PROCESSO DE PENSAMENTO
--------------------------------------------------------------------------------
- Orientação à Causa Raiz: Em vez de aceitar correções rápidas, busca por entender 
  o motivo exato de cada erro (ex.: concorrência no SQLite e ciclo de vida do 'with').
- Atenção aos Detalhes de Sintaxe e Importação: Identificação rápida de divergências 
  de nomes de funções e imports gerados durante refatorações.
- Foco na Experiência do Desenvolvedor (DX): Substituição de fluxos complexos no 
  Swagger UI por uma abordagem limpa e direta com HTTPBearer.
- Postura de Validação Passo a Passo: Testes isolados a cada alteração, garantindo 
  que uma camada estivesse 100% estável antes de avançar.


4. PRINCIPAIS ERROS ENCONTRADOS E SUAS SOLUÇÕES
--------------------------------------------------------------------------------
- Compatibilidade no Python 3.13 (passlib):
  * Causa: Incompatibilidade com versões recentes do bcrypt/Python.
  * Solução: Migração para uso direto do 'bcrypt' com encode UTF-8 e limite de 72 bytes.

- sqlite3.OperationalError: database is locked:
  * Causa: Conexões abertas manualmente não fechadas em exceções/retornos antecipados.
  * Solução: Gerador de contexto (@contextmanager) usando 'with obter_conexao()'.

- NameError: name 'router' is not defined:
  * Causa: Chamada do decorador @router antes da criação da instância do APIRouter.
  * Solução: Reordenação das definições no topo do arquivo routers/admin.py.

- ImportError: cannot import name 'contextmananger':
  * Causa: Erro de digitação (typo) na importação de contextlib.
  * Solução: Correção ortográfica para 'contextmanager'.

- ImportError: cannot import name 'conectar_banco':
  * Causa: Import mantido da função antiga após renomeação para 'obter_conexao'.
  * Solução: Atualização dos imports em auth.py para 'obter_conexao'.

- HTTP 401 Unauthorized ao cadastrar convidados:
  * Causa: Requisição feita sem o token JWT no cabeçalho Authorization.
  * Solução: Autenticação efetuada no Swagger UI inserindo o token obtido no login.

- Campos confusos no Swagger (client_id, client_secret):
  * Causa: Exigência do esquema OAuth2 padrão.
  * Solução: Migração para HTTPBearer(), disponibilizando um campo simples para o token.


5. ESTADO ATUAL DO SISTEMA
--------------------------------------------------------------------------------
┌─────────────────────────────────────────────────────────┐
│                   Swagger UI / Client                   │
└────────────────────────────┬────────────────────────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌───────────────────────┐         ┌───────────────────────┐
│   routers/admin.py    │         │ routers/convidados.py │
│ (Cadastrar, Login,    │         │ (Buscar por celular,  │
│  Editar, Deletar)     │         │  Confirmar RSVP)      │
└───────────┬───────────┘         └───────────┬───────────┘
            │                                 │
            └────────────────┬────────────────┘
                             ▼
                 ┌───────────────────────┐
                 │        auth.py        │
                 │ (Bcrypt / JWT Bearer) │
                 └───────────┬───────────┘
                             ▼
                 ┌───────────────────────┐
                 │      database.py      │
                 │   (Context Manager)   │
                 └───────────┬───────────┘
                             ▼
                 ┌───────────────────────┐
                 │     casamento.db      │
                 └───────────────────────┘
================================================================================