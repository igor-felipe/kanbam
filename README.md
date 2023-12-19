# Backend do Projeto KanbanBoard, disciplina de Metodologia Ágil

## Instalação

Usaremos o Postman para testar essa API. [Visualize online](https://www.postman.com/hovet-api/workspace/kanbam/request/15002403-7bcf34d0-a9b7-476d-9740-24f185b1e101)

- Instale o NodeJs
- Instale o Visual Studio Code. Recomendado. Este projeto já inclui as configurações necessárias para funcionar bem nele.
- Crie um arquivo .env na pasta raiz do projeto baseado no arquivo .env.example
- Pode ser necessário instalar alguns pacotes de forma global usando npm

```terminal
npm install -g yarn nodemon ts-node
```

- Instalar as dependências. Daqui em diante, use o ``yarn``

```terminal
yarn
```

O banco de dados utilizado é o SQLite, fornecido pelo ORM Prisma.

- Inicializar o ORM Prisma. Esse comando deve ser usado sempre que o esquema Prisma mudar e quando inicializar o projeto pela primeira vez.

```terminal
yarn prisma db push
```

- Iniciar o servidor http no modo de desenvolvimento

```terminal
yarn dev
```

- O modo debugger já está configurado e pode ser iniciado com f5 ou clicando no botão do vscode.

Veja os outros comandos configurados no arquivo package.json.
