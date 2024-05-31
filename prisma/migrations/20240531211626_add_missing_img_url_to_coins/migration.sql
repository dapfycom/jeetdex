/*
  Warnings:

  - Added the required column `img` to the `Coins` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Coins_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coins" ("id", "identifier", "ownerId") SELECT "id", "identifier", "ownerId" FROM "Coins";
DROP TABLE "Coins";
ALTER TABLE "new_Coins" RENAME TO "Coins";
CREATE UNIQUE INDEX "Coins_identifier_key" ON "Coins"("identifier");
CREATE UNIQUE INDEX "Coins_img_key" ON "Coins"("img");
PRAGMA foreign_key_check("Coins");
PRAGMA foreign_keys=ON;
