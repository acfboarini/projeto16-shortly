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

const userRepository = {
  getUseryEmail, insertUser, createSession, deleteSession
}

export default userRepository;