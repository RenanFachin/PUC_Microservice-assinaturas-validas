/*
  Warnings:

  - You are about to alter the column `valor_pago` on the `pagamentos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "pagamentos" ALTER COLUMN "valor_pago" SET DATA TYPE INTEGER;