-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Follows" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followedId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Follows_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follows_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Follows" ("followedId", "followingId", "id") SELECT "followedId", "followingId", "id" FROM "Follows";
DROP TABLE "Follows";
ALTER TABLE "new_Follows" RENAME TO "Follows";
PRAGMA foreign_key_check("Follows");
PRAGMA foreign_keys=ON;
