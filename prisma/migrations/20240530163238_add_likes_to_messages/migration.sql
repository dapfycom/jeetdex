/*
  Warnings:

  - You are about to drop the column `content` on the `Likes` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Likes` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Likes` table. All the data in the column will be lost.
  - Added the required column `messageId` to the `Likes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "likedById" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageId" TEXT NOT NULL,
    CONSTRAINT "Likes_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Likes_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "Messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Likes" ("id", "likedById", "userId") SELECT "id", "likedById", "userId" FROM "Likes";
DROP TABLE "Likes";
ALTER TABLE "new_Likes" RENAME TO "Likes";
PRAGMA foreign_key_check("Likes");
PRAGMA foreign_keys=ON;
