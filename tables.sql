CREATE TABLE "users" (
	"id" INTEGER PRIMARY KEY,
	"name" TEXT UNIQUE NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
	"password" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITHOUT TIMEZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
	"id" INTEGER PRIMARY KEY,
	"userId" INT UNIQUE NOT NULL REFERENCES "users"("id"),
  "token" TEXT UNIQUE NOT NULL,
  "createdAt" TIMESTAMP WITHOUT TIMEZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "urls" (
	"id" INTEGER PRIMARY KEY,
  "url" TEXT NOT NULL,
  "createdAt" TIMESTAMP WITHOUT TIMEZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "users_urls" (
	"id" INTEGER PRIMARY KEY,
  "urlId" INT UNIQUE NOT NULL REFERENCES "urls"("id"),
  "userId" INT UNIQUE NOT NULL REFERENCES "users"("id"),
  "createdAt" TIMESTAMP WITHOUT TIMEZONE NOT NULL DEFAULT NOW()
);