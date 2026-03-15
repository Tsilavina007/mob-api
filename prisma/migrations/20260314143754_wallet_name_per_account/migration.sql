/*
  Warnings:

  - A unique constraint covering the columns `[accountId,name]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Wallet_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_accountId_name_key" ON "Wallet"("accountId", "name");
