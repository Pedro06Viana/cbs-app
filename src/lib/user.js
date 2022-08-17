import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/mysql2";

export async function createUser({ nome, posto, nib, nif, roles, password }) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  const user = {
    uid: uuidv4(),
    nome,
    posto,
    nib,
    nif,
    avatar: null,
    roles,
    hash,
    salt,
    createdAt: new Date(),
  };
  try {
    const insertedId = await pool.query(
      "INSERT INTO users SET ? ",
      user,
      function (error, results, fields) {
        if (error) throw error;
        return results.insertId;
      }
    );
  } catch (error) {
    console.log(`Erro ao inserir -> ${error}`);
    res.status(500).end(error.message);
  }
  return { nif, createdAt: new Date() };
}

// Here you should lookup for the user in your DB
export async function findUser({ nif }) {
  const [user] = await pool.query(
    "SELECT * FROM users WHERE nif=?",
    [nif],
    function (error, results, fields) {
      if (error) console.log(`Error Find User -> ${error}`);
      return results;
    }
  );
  return user;
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}
