const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

async function main() {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: "*",
      methods: ["GET", "POST"],
    })
  );

  // const connection = await mysql.createConnection({
  //   host: "banco",
  //   port: 3306,
  //   user: "root",
  //   password: "root",
  //   database: "trabalho_aws",
  // });

  const connection = await mysql.createConnection({
    host: "trabalho-rds.ce5plmgnoipi.us-west-2.rds.amazonaws.com",
    port: 3306,
    user: "admin",
    password: "bancoadmin",
    database: "trabalho_banco",
  });

  app.post("/user", async (req, res) => {
    const { nome, data, cpf, telefone, email, senha } = req.body;

    await connection.query(
      "INSERT INTO user (nome, data_nascimento, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?, ?)",
      [nome, data, cpf, telefone, email, senha]
    );

    return res.status(200).json("Usuário criado.");
  });

  app.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    const [rows] = await connection.query(
      "SELECT email, senha FROM user WHERE email = ? and senha = ?",
      [email, senha]
    );

    if (rows.length > 0) {
      return res.status(200).json("Logado.");
    }

    return res.status(422).json("Email ou senha estão incorretos.");
  });

  app.get("/", async (req, res) => {
    const [rows] = await connection.query("SELECT * FROM user");

    return res
      .status(200)
      .json({ message: "Respeita o pae. 😎", usuarios: rows });
  });

  app.listen(8000, () => {
    console.log("Aplicação no ar, porta " + 8000);
  });
}

(async () => {
  await main();
})();
