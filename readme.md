Sunshine Events - RSVP
Um sistema profissional, multi-usuário e de alta performance voltado para a gestão de eventos (com foco inicial em casamentos), desenvolvido sob medida para garantir isolamento de dados, elegância visual e facilidade de comunicação com os convidados.

📖 A História do Projeto: Do Zero ao SaaS Profissional
A ideia de criar o Sunshine Events - RSVP nasceu da necessidade de construir uma ferramenta moderna, modular e extremamente confiável para o gerenciamento de listas de presença e confirmação (RSVP). O objetivo principal desde o início era fugir de soluções engessadas e monolíticas, priorizando um código limpo, separação clara de responsabilidades (zero CSS inline) e uma experiência de usuário impecável.

O desenvolvimento foi construído passo a passo, através de uma jornada colaborativa de engenharia de software dividida em marcos fundamentais:

1. Arquitetura Base e Modularidade
Backend: Construído com FastAPI, garantindo alto desempenho, rotas assíncronas documentadas automaticamente e validações rigorosas de dados via Pydantic.

Banco de Dados: Utilização do SQLite com gerenciadores de contexto otimizados para conexões seguras.

Frontend Estilizado: Estrutura organizada com páginas dedicadas (index.html, dashboard.html, convite.html) acompanhadas estritamente por seus respectivos arquivos de estilo independentes (index.css, style.css, convite.css), mantendo a manutenibilidade limpa e profissional.

2. Autenticação e Segurança (Admin)
Implementação de cadastro, login e redefinição de senha seguros para administradores utilizando criptografia de ponta (Bcrypt) e tokens de sessão (JWT).

Blindagem contra cadastros duplicados (validação prévia de e-mail e celular no backend) e exigência de regras mínimas de segurança nas senhas.

3. Portal do Convidado e Experiência de Usuário (UX)
Um fluxo interativo onde o convidado localiza seu convite informando apenas o número de celular.

Tratamento dinâmico para acompanhantes e contagem inteligente de vagas (com regras específicas, como isenção para crianças menores de 7 anos).

Feedback visual travado por temporizador estratégico de 6 segundos na tela de conclusão para garantir que a mensagem de sucesso seja lida confortavelmente antes do recarregamento da página.

4. Evolução para Multi-Tenancy (Multi-Usuário) e Isolamento de Dados
O Desafio: Permitir que múltiplos administradores gerenciassem seus próprios eventos sem que houvesse conflitos caso um convidado possuísse o mesmo número de telefone cadastrado em festas diferentes.

A Solução: Implementação de uma chave única composta no banco de dados (admin_id + celular). Isso permitiu que o isolamento de dados entre os noivos/organizadores fosse total, garantindo que cada painel exiba estritamente a sua própria lista.

Links Dinâmicos e WhatsApp: Geração automática de links personalizados de RSVP por administrador (convite.html?evento=ID), acompanhados de botões de disparo direto via WhatsApp para convites oficiais e lembretes de confirmação.

🛠️ Tecnologias Utilizadas
Python / FastAPI (API Backend & Rotas Protegidas)

SQLite (Armazenamento de Dados Relacional)

Pydantic & Bcrypt / Jose (Validação de Schemas e Segurança JWT)

HTML5, CSS3 & JavaScript (ES6+) (Frontend Modular com Design Glassmorphism / Clean)

SheetJS (xlsx) (Exportação de relatórios gerenciais em planilhas do Excel)

🚀 Como Executar o Projeto Localmente
Clone o repositório ou abra a pasta do projeto.

Inicie o Ambiente e o Servidor FastAPI (Backend):

Bash
uvicorn main:app --reload
Abra o Frontend:

Acesse as páginas diretamente pelo navegador ou utilize uma extensão de live server (como o Live Server do VS Code) apontando para a pasta frontend/.

Projeto desenvolvido com dedicação, foco em arquitetura limpa e alta engenharia de software.