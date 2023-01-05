import db from "../database.js";

export async function signUp(req, res) {
  const { name, email, password } = req.body;
  try {
    await db.query(`
      INSERT INTO users (name, email, password) VALUES
      (${name}, ${email}, ${password})
    `);
    return res.sendStatus(201);

  } catch (error) {
    if (error.code) console.log(error);
    return res.status(error.code).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    
  } catch (error) {
    if (error.code) console.log(error);
    return res.status(error.code).send(error.message);
  }
}

export async function signOut(req, res) {
  try {

  } catch (error) {
    if (error.code) console.log(error);
    return res.status(error.code).send(error.message);
  }
}