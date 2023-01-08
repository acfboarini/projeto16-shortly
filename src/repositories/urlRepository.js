import db from "../database.js";

async function getUrlByUrl(url) {
  const { rows } = await db.query(`
    SELECT * FROM urls
    WHERE url='${url}'
  `);
  return rows[0];
}

async function insert(userId, url, shortUrl) {
  await db.query(`
    INSERT INTO urls ("userId", "url", "shortUrl")
    VALUES (${userId}, '${url}', '${shortUrl}')
  `);
}

async function getUrlById(urlId, selectAll = null) {
  let select = `id, url, "shortUrl"`;
  if (selectAll) select = "*";

  const { rows } = await db.query(`
    SELECT ${select}
    FROM urls
    WHERE id=${urlId}
  `);
  return rows[0];
}

async function getUrlByShortUrl(shortUrl) {
  const { rows } = await db.query(`
    SELECT *
    FROM urls
    WHERE "shortUrl"='${shortUrl}'
  `);
  return rows[0];
}

async function addViewToUrlById(views, urlId) {
  await db.query(`
    UPDATE urls SET views=${views + 1}
    WHERE id=${urlId}
  `);
}

async function deleteById(urlId) {
  await db.query(`
    DELETE FROM urls WHERE id=${urlId}
  `);
}

async function getRanking() {
  const { rows } = await db.query(`
    SELECT us.id, us.name, COUNT(ur."shortUrl") as "linksCount", SUM(ur.views) as "totalViews"
    FROM users us
    JOIN urls ur
    ON us.id = ur."userId"
    GROUP BY us.id
    ORDER BY "totalViews" desc
    LIMIT 10
  `);
  return rows;
}

const urlRepository = {
  getUrlByUrl, insert, getUrlById,
  getUrlByShortUrl, addViewToUrlById,
  deleteById, getRanking
};

export default urlRepository;