import db from "../database.js";

export async function getUserWithUrls(req, res) {
  const { user } = res.locals;
  try {
    const { rows } = await db.query(`
      SELECT us.id as "userId", us.name, ur.id as "urlId", ur.url, ur."shortUrl", ur.views
      FROM users us
      JOIN urls ur
      ON us.id = ur."userId"
      WHERE us.id=${user.id}
      ORDER BY ur.id
    `);
    const user_info = formatData(rows);
    return res.send(user_info);

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}

function formatData(rows) {
  const shortnedUrls = [];
  let totalViews = 0;

  for (let data of rows) {
    const { urlId, shortUrl, url, views } = data;
    const url_info = {
      id: urlId,
      shortUrl,
      url,
      views
    };
    totalViews += views;
    shortnedUrls.push(url_info);
  }

  return {
    id: rows[0].userId,
    name: rows[0].name,
    totalViews,
    shortnedUrls,
  }
}