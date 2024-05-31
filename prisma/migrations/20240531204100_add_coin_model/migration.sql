-- CreateTable
CREATE TABLE "Coins" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "Coins_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Coins_identifier_key" ON "Coins"("identifier");
