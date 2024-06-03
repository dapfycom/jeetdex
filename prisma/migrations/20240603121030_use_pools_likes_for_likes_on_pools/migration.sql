/*
  Warnings:

  - You are about to drop the `_PoolsToUserSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PoolsToUserSettings";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PoolsLikes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userSettingId" TEXT NOT NULL,
    "poolId" TEXT NOT NULL,
    CONSTRAINT "PoolsLikes_userSettingId_fkey" FOREIGN KEY ("userSettingId") REFERENCES "UserSettings" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PoolsLikes_poolId_fkey" FOREIGN KEY ("poolId") REFERENCES "Pools" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
