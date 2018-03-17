CREATE TABLE similarListings (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  price INT NOT NULL,
  numRatings INT NOT NULL,
  avgStars REAL NOT NULL,
  thumbnailImage TEXT NOT NULL
);