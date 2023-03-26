-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SeloPostal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "origin_place" TEXT NOT NULL DEFAULT 'null',
    "tax" REAL NOT NULL,
    "post_card_id" INTEGER NOT NULL,
    CONSTRAINT "SeloPostal_post_card_id_fkey" FOREIGN KEY ("post_card_id") REFERENCES "PostCard" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_SeloPostal" ("id", "origin_place", "post_card_id", "tax", "title") SELECT "id", "origin_place", "post_card_id", "tax", "title" FROM "SeloPostal";
DROP TABLE "SeloPostal";
ALTER TABLE "new_SeloPostal" RENAME TO "SeloPostal";
CREATE TABLE "new_PostCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image_url" TEXT NOT NULL DEFAULT 'https://avatars.githubusercontent.com/u/103438009?v=4',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_PostCard" ("created_at", "description", "id", "image_url", "title") SELECT "created_at", "description", "id", "image_url", "title" FROM "PostCard";
DROP TABLE "PostCard";
ALTER TABLE "new_PostCard" RENAME TO "PostCard";
CREATE UNIQUE INDEX "PostCard_title_key" ON "PostCard"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
