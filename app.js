import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";

const pool = mysql.createPool({
  host: "localhost",
  user: "sbsst",
  password: "sbs123414",
  database: "a1",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "https://cdpn.io",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

const port = 3000;

/*app.get("/proverbs/:id", async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM proverbs WHERE id = ?", [id]);

  if (rows.length == 0) {
    res.status(404).json({
      msg: "not found",
    });
    return;
  }

  res.json(rows[0]);
});*/

app.get("/proverbs/rand", async (req, res) => {
  const [[row]] = await pool.query(
    "SELECT * FROM proverbs ORDER BY RAND() LIMIT 1"
  );

  await pool.query("UPDATE proverbs SET hit = hit + 1 WHERE id = ?", [row.id]);

  row.hit++;

  res.json(row);
});

app.patch("/proverbs/rand", async (req, res) => {
  const [[like_row]] = await pool.query(
    "UPDATE proverbs SET likeIt = likeIt + 1 WHERE id = ?",
    [like_row.id]
  );

  like_row.likeIt++;

  res.json(like_row);
});

app.patch("/proverbs/rand", async (req, res) => {
  const [[hate_row]] = await pool.query(
    "UPDATE proverbs SET hateIt = hateIt + 1 WHERE id = ?",
    [hate_row.id]
  );

  hate_row.hateIt++;

  res.json(hate_row);
});

app.get("/proverbs", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM proverbs ORDER BY id DESC");

  res.json(rows);
});

app.listen(port);
