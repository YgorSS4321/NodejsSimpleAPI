-- CreateTable
CREATE TABLE "PostCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "SeloPostal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "origin_place" TEXT NOT NULL,
    "tax" REAL NOT NULL,
    "post_card_id" INTEGER NOT NULL,
    CONSTRAINT "SeloPostal_post_card_id_fkey" FOREIGN KEY ("post_card_id") REFERENCES "PostCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "PostCard_title_key" ON "PostCard"("title");
