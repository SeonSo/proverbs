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
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const port = 3000;

app.get("/proverbs", async (req, res) => {
  const [row] = await pool.query(
    `
  SELECT * 
  FROM proverbs
  `
  );

  res.json(row);
});

app.get("/proverbs/rand", async (req, res) => {
  const [[proverbsRow]] = await pool.query(
    `
    SELECT * 
    FROM 
    proverbs 
    ORDER BY RAND() 
    LIMIT 1
    `
  );

  if (proverbsRow === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "404 not found",
    });
    return;
  }

  await pool.query(
    `
    UPDATE proverbs
    SET hit = hit + 1
    WHERE id = ?
    `,
    [proverbsRow.id]
  );

  proverbsRow.hit++;

  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: proverbsRow,
  });
});

app.patch("/proverbs/:id", async (req, res) => {
  const { id } = req.params;
  const [[proverbsRow]] = await pool.query(
    `
    SELECT *
    FROM proverbs
    WHERE id = ?
    `,
    [id]
  );

  if (proverbsRow === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "404 not found",
    });
    return;
  }

  const {
    body = proverbsRow.body,
    author = proverbsRow.author,
    likeIt = proverbsRow.likeIt,
    hateIt = proverbsRow.hateIt,
  } = req.body;

  await pool.query(
    `UPDATE proverbs
     SET body = ?,
     author = ?,
     likeIt = ?,
     hateIt = ?
     WHERE id = ?`,
    [body, author, likeIt, hateIt, id]
  );

  const [[justModifiedProverbsRow]] = await pool.query(
    `
    SELECT *
    FROM proverbs
    WHERE id = ?
    `,
    [id]
  );

  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: justModifiedProverbsRow,
  });
});

app.listen(port, () => {
  console.log(`proverbs app listening on port ${port}`);
});
