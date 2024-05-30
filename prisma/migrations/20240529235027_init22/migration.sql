/*
  Warnings:

  - You are about to drop the column `followerId` on the `Follows` table. All the data in the column will be lost.
  - Added the required column `followedId` to the `Follows` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Follows" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followedId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    CONSTRAINT "Follows_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Follows" ("followingId", "id") SELECT "followingId", "id" FROM "Follows";
DROP TABLE "Follows";
ALTER TABLE "new_Follows" RENAME TO "Follows";
PRAGMA foreign_key_check("Follows");
PRAGMA foreign_keys=ON;
