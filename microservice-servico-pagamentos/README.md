# Microservice de Pagamentos

Microserviço responsável pelo armazenamento de registros de todos pagamentos que forem efetuados.
O microserviço possui um banco de dados próprio, independente do serviço principal da aplicação.

## Instalação

1. Instale as dependências

```bash
npm install
```

2. Rodar o container docker
```bash
docker compose up -d
```

3. Copiar o arquivo com os dados de conexão e demais variáveis ambiente

```bash
cp .env.example .env
```

4. Criar as tabelas do banco de dados (em desenvolvimento)

```bash
npx prisma migrate dev
```

5. Executando o projeto
```bash
npm run start:dev
```
**O servidor será iniciado na porta 3002**
**OBS: O serviço principal deve estar rodando de maneira conjuta com o microserviço para que funcione corretamente**
