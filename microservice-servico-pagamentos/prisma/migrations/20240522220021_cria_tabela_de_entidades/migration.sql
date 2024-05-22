-- CreateTable
CREATE TABLE "pagamentos" (
    "id" TEXT NOT NULL,
    "cod_assinatura" TEXT NOT NULL,
    "valor_pago" DOUBLE PRECISION NOT NULL,
    "data_pagamento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);
