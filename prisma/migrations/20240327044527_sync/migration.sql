/*
  Warnings:

  - Added the required column `combo` to the `RouletteCard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RouletteCard" ADD COLUMN     "combo" BOOLEAN NOT NULL;
