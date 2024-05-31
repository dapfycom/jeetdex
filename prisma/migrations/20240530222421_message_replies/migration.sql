-- CreateTable
CREATE TABLE "MessagesReplies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "messageRepleidId" INTEGER NOT NULL,
    "messageReplyingId" INTEGER NOT NULL,
    CONSTRAINT "MessagesReplies_messageRepleidId_fkey" FOREIGN KEY ("messageRepleidId") REFERENCES "Messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "MessagesReplies_messageReplyingId_fkey" FOREIGN KEY ("messageReplyingId") REFERENCES "Messages" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
