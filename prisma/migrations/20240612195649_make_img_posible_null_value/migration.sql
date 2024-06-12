-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Coins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "img" TEXT,
    "ownerId" TEXT NOT NULL,
    "twitter" TEXT,
    "telegram" TEXT,
    "website" TEXT,
    "title" TEXT,
    "description" TEXT,
    CONSTRAINT "Coins_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Coins" ("description", "id", "identifier", "img", "ownerId", "telegram", "title", "twitter", "website") SELECT "description", "id", "identifier", "img", "ownerId", "telegram", "title", "twitter", "website" FROM "Coins";
DROP TABLE "Coins";
ALTER TABLE "new_Coins" RENAME TO "Coins";
CREATE UNIQUE INDEX "Coins_identifier_key" ON "Coins"("identifier");
CREATE UNIQUE INDEX "Coins_img_key" ON "Coins"("img");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
