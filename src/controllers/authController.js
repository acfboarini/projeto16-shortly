import db from "../database.js";
import { errorFactory } from "../errors/clientError.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  try {
    const user = await db.query(`
      SELECT * FROM "users" WHERE email='${email}'
    `);
    if (user.rowCount !== 0) throw errorFactory({ code: 409 });

    const salt = 10;
    const password_hash = bcrypt.hashSync(password, salt);
    await db.query(`
      INSERT INTO users (name, email, password) VALUES
      ('${name}', '${email}', '${password_hash}')
    `);
    return res.sendStatus(201);

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const data = await db.query(`
      SELECT * from users WHERE email='${email}'
    `);
    if (data.rowCount === 0) throw errorFactory({ code: 404 });
    const user = data.rows[0];
    const passwordValidation = bcrypt.compareSync(password, user.password);
    if (!passwordValidation) throw errorFactory({ code: 401, message: "incorrect password" });

    const token = uuid();
    await db.query(`
      INSERT into sessions ("userId", token) VALUES
      (${user.id}, '${token}')
    `);
    return res.status(200).send({ username: user.name, token });

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function signOut(req, res) {
  const { token } = res.locals;
  try {
    await db.query(`
      DELETE FROM sessions WHERE token='${token}'
    `);
    return res.sendStatus(200);
  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}