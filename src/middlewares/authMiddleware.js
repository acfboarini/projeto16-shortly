import db from "../database.js";
import { signInSchema, signUpSchema } from "../schemas/authSchema.js";

export function validateSignUpSchema(req, res, next) {
  const validation = signUpSchema.validate(req.body);
  if (validation.error) return res.status(422).send({ error: validation.error.message });

  next();
}

export function validateSignInSchema(req, res, next) {
  const validation = signInSchema.validate(req.body);
  if (validation.error) return res.status(422).send({ error: validation.error.message });

  next();
}

export async function authorization(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer", "").trim();
  if (!token) return res.status(401).send("token not to be null");

  const data = await db.query(`
    SELECT users.*
    FROM users
    JOIN sessions ON users.id = sessions."userId"
    WHERE sessions.token='${token}'
  `);
  if (data.rowCount === 0) return res.status(401).send("invalid token");

  res.locals.token = token;
  res.locals.user = data.rows[0];
  next();
}