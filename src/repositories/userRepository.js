import db from "../database.js";

async function getUseryEmail(email) {
  const { rows } = await db.query(`
    SELECT * FROM users WHERE email='${email}'
  `);
  return rows[0];
}

async function insertUser({ name, email, password_hash }) {
  await db.query(`
    INSERT INTO users (name, email, password) VALUES
    ('${name}', '${email}', '${password_hash}')
  `);
}

async function createSession(userId, token) {
  await db.query(`
    INSERT INTO sessions ("userId", token) VALUES
    (${userId}, '${token}')
  `);
}

async function deleteSession(token) {
  await db.query(`
    DELETE FROM sessions WHERE token='${token}'
  `);
}

async function getUserJoinUrls(userId) {
  const { rows } = await db.query(`
    SELECT us.id as "userId", us.name, ur.id as "urlId", ur.url, ur."shortUrl", ur.views
    FROM users us
    JOIN urls ur
    ON us.id = ur."userId"
    WHERE us.id=${userId}
    ORDER BY ur.id
  `);
  return rows;
}

const userRepository = {
  getUseryEmail, insertUser, createSession, deleteSession, getUserJoinUrls
}

export default userRepository;