-- CreateTable
CREATE TABLE "UserSettings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slippage" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pools" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lpIdentifier" TEXT NOT NULL,
    "token1" TEXT NOT NULL,
    "token2" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PoolsToUserSettings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_PoolsToUserSettings_A_fkey" FOREIGN KEY ("A") REFERENCES "Pools" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PoolsToUserSettings_B_fkey" FOREIGN KEY ("B") REFERENCES "UserSettings" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSettings_userId_key" ON "UserSettings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Pools_lpIdentifier_key" ON "Pools"("lpIdentifier");

-- CreateIndex
CREATE UNIQUE INDEX "_PoolsToUserSettings_AB_unique" ON "_PoolsToUserSettings"("A", "B");

-- CreateIndex
CREATE INDEX "_PoolsToUserSettings_B_index" ON "_PoolsToUserSettings"("B");
