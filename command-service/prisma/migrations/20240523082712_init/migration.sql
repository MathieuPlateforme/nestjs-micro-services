/*
  Warnings:

  - Added the required column `idUser` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` ADD COLUMN `idUser` INTEGER NOT NULL;
