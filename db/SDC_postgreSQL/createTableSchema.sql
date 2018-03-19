CREATE TABLE similarlistings (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  numbeds INT NOT NULL,
  price INT NOT NULL,
  numratings INT NOT NULL,
  avgstars REAL NOT NULL,
  thumbnailimage TEXT NOT NULL
);