# Projeto Checkpoint
Este projeto foi pensado como um estudo na área de programação envolvendo tanto o backend como o frontend. O objetivo é ter contato com novas tecnologias, além de expandir meus conhecimentos na construção de aplicações e sistemas.  
Essas são algumas coisas que pude estudar e aprender até agora durante esse processo:
- Autenticação e autorização com OAuth2
- Criptografia de dados 
- Manipulação de rotas no React
- Criação e manipulação de tabelas e banco de dados

## Descrição
O checkpoint consiste em uma aplicação parecida com um "letterboxd" mas voltada para jogos, ou seja, você pode compartilhar suas experiências nas gameplays, contando o que achou do jogo, em quanto tempo finalizou, a sua nota final e etc.

## Funcionalidades
Principais funcionalidades da aplicação.

- Cadastro e login de usuários com JWT
- Proteção de rotas autenticadas
- Alterações de dados por parte dos usuários
- Uso de uma API externa para construção da biblioteca de jogos

## Tecnologias Utilizadas
Essas são as tecnologias/ferramentas usadas nesse projeto.

**Backend**
- Python
- FastAPI
- SQLAlchemy
- Poetry
- Alembic
- Docker

**Frontend**
- React
- Node.js
- Axios
- Vite

**Banco de Dados**
- Mysql

## Versões necessárias
Listagem da versão das principais ferramentas utilizadas no projeto.  
- Docker: 26.1.3
- Python: 3.12.3
- Node.js: 20.9.0
- Mysql: 8.0.41
- Poetry: 2.1.1

## Configurações do projeto
Essa aplicação possui dois arquivos `.env` que precisam ser configurados antes de iniciá-lo. Um está localizado dentro da pasta `/backend` e o outro fica na raiz do projeto. 

**Backend**  
Configure o arquivo com as seguintes variáveis:

| Variáveis     | Observação    |
|-------------|--------------|
| DATABASE_URL="mysql+mysqlconnector://user:senha@nome_serviço_db:porta/nome_database"   | "nome_serviço_db" é o nome do serviço do db no docker-compose.    |
| SECRET_KEY = 'sua-chave-secreta'    | Gere sua própria chave com o algoritmo listado abaixo.    |
| ALGORITHM = 'HS256'   | ---     |
| ACCESS_TOKEN_EXPIRE_MINUTES = tempo_expiração_do_token      | Tempo em minutos (Ex: 20, 30, 40)     |
| RAWG_API_KEY = "chave-api"    | Essa aplicação usa a API da RAWG para buscar as informações dos jogos. É necessário que você crie uma conta gratuitamente no site deles para gerar uma API KEY. Depois, só inserir nesse campo.     |

Acesse o [site da RAWG](https://rawg.io/) para gerar sua chave da API.  

**Raiz do projeto**  
Nesse arquivo você precisa configurar as variáveis de ambiente do MySQL e a URL do Vite para comunicação no Docker com o Backend da aplicação:

| Variáveis    | Observações     |
|-------------|--------------|
| DATABASE_URL="mysql+mysqlconnector://user:senha@nome_serviço_db:porta/nome_database"     | Mesma configurada no arquivo anterior.      |
| MYSQL_ROOT_PASSWORD='senha_do_root'     | Aqui você insere uma senha Root.      |
| MYSQL_DATABASE='nome_database'     | Nome do banco de dados, o mesmo da URL.      |
| MYSQL_USER='usuario'     | Usuário do MySQL      |
| MYSQL_PASSWORD='senha_usuario'     | Senha do usuário MySQL      |
| VITE_API_URL="http://backend:8000" | Aqui você vai colocar o nome do serviço do seu backend que foi cadastrado no docker-compose. No meu caso ele chama "backend" e atua na porta 8000 (Se você mudar, precisa alterar aqui também)  |

## Como rodar a aplicação
Como o projeto está totalmente dockerizado, após realizar o clone do repositório, basta configurar os arquivos `.env` e fazer o build dos containers.  
```
docker compose up --build
```

**Observações**   
- Caso necessário, quando subir os containers, acesse o do backend e rode as migrações com o Alembic para que seja gerado o banco de dados corretamente: `alembic upgrade head`.  
- Não esqueça de fornecer as permissões corretas ao seu usuário MySQL.

## Próximos Passos
Essa aplicação ainda está em desenvolvimento. Abaixo estão algumas das funcionalidades planejadas:  
- [x] Melhorias visuais  
- [X] Implementação das rotas e banco de dados para a biblioteca de jogos dos usuários  
- [X] Integração com uma API externa para fornecer informações sobre os jogos
- [X] Dockerização completa do projeto  
- [ ] Funcionalidade de envio de e-mails (recuperação de senha, confirmação de cadastro) **[_POSTERIORMENTE_]**
