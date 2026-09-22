/*
  Warnings:

  - Added the required column `duracionMin` to the `clases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clases` ADD COLUMN `duracionMin` INTEGER NOT NULL;
