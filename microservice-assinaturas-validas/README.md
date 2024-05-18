# Microservice de Assinaturas Válidas

Microserviço criado e responsável por armazenar informações da validade de uma assinatura em cache para rápida visualização dos dados.

## Instalação

1. Instale as dependências

```bash
npm install
```

2. Configurações das variáveis de ambiente

```bash
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_DB=0
```

3. Rodar o container docker
```bash
docker compose up -d
```

4. Executando o projeto
```bash
npm run start:dev
```
**O servidor será iniciado na porta 3001**
**OBS: O serviço princiapl deve estar rodando de maneira conjuta com o microserviço para que funcione corretamente**

## Endpoints
Verificar validade da assinatura

#### Descrição
Verifica se uma assinatura é válida ou cancelada

#### URL
**GET** /assinaturasvalidas/:codass

#### Parâmetros
codass (string): Código da assinatura
