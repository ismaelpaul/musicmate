-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "spotify_id" TEXT NOT NULL,
    "full_name" TEXT,
    "email" TEXT,
    "image" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
