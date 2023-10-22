# Comunidade - NextJS

> Comunidade para fazer postagem de conteúdo.

### Finalidade

> O projeto tem a finalidade de usuário fazer postagem e podendo escolher em qual página irá publicar (React: videos longos que seria o Youtube) e Feed que seria postagem de video normal upados.

### Detalhes
- Login: O login será feito através do Oauth da twitch.

- Geral: O usuário poderão ver suas postagens na rota /posts que poderão ver se está pendente ou se já foi aceito pelo moderador.

- Usuários: Existem 3 tipos de usuário: (Usuário comum: Precisa de aprovação do moderador), (Usuário vip: o post é publicado automaticamente) e Moderador: post aceito automático e tem permissão para validar ou dar permissão de usuário

- Posts: eles tem interação podendo abrir como um Modal para comentar estilo (SHORTS do YT) e podendo curtir a publicação, mostrando a quantidade de likes e comentários feito na publicação.


### BACK-END:

- Linguagem em (Typescript).
- Banco de dados MySQL (Mysql2).
- Middleware para proteger cada end-point.
- Criação de RESTAPI com Node Express.
- Validação de token.
- Refresh token.
- Validação de usuário para realizar a ação.

### FRONT-END:

- Front end criado em (NextJs).
- Autenticação Oauth através do (NextAuth).
- Proteção com rotas privadas.
- Renderização de componente baseado na permissão de usuário.
- Consumido APIREST através do end-point fornecido pelo back-end.
- Notificações de Erros.

#### TELAS:

- Login automático (Publica).
- Tela de postagem (Publica).
- Tela de React (Publica).
- Tela de Posts ( componentes privados baseado na permissão ).
- Tela de Moderação(Privada).
- Tela de perfil (Publica).

## Como rodar o Projeto:
```bash
git clone https://github.com/matiash26/Community.git
# ou baixe manualmente

#FrontEnd
cd Frontend

#crie um arquivo chamado .env.local na raiz do frontend
NEXTAUTH_CLIENT_ID=
NEXT_PUBLIC_URL_API=
NEXT_PUBLIC_URL_FILE=
NEXTAUTH_SECRET=

npm run i
npm run build
npm run start

#BackEnd
npm run i
npm run build

#crie um arquivo chamado .env na raiz do backend contendo
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=yourUser
MYSQL_PASSWORD=yourPassword
MYSQL_DATABASE=YourDatabase 

npm run migration #se estiver no linux crie uma pasta /public no dist/ que será criado
npm run start
```