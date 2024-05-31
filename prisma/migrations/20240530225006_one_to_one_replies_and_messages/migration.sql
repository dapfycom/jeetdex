/*
  Warnings:

  - A unique constraint covering the columns `[messageReplyingId]` on the table `MessagesReplies` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MessagesReplies_messageReplyingId_key" ON "MessagesReplies"("messageReplyingId");
