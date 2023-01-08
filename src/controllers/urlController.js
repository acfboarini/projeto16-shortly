import { faker } from "@faker-js/faker";
import db from "./../database.js";
import { errorFactory } from "../errors/clientError.js";

export async function postUrl(req, res) {
  const { user } = res.locals;
  const { url } = req.body;
  try {
    const { rows } = await db.query(`
      SELECT * FROM urls
      WHERE url='${url}'
    `);
    const [exist_url] = rows;
    if (exist_url) throw errorFactory({ code: 409, message: "essa url ja existe" })

    const shortUrl = faker.random.alphaNumeric(8);
    await db.query(`
      INSERT INTO urls ("userId", "url", "shortUrl")
      VALUES (${user.id}, '${url}', '${shortUrl}')
    `);
    return res.status(201).send({ shortUrl });

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;
  try {
    const { rows } = await db.query(`
      SELECT id, url, "shortUrl"
      FROM urls
      WHERE id=${id}
    `);
    const [url] = rows;
    if (!url) throw errorFactory({ code: 404 });

    return res.send(url);

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function redirectUserToUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const { rows } = await db.query(`
      SELECT *
      FROM urls
      WHERE "shortUrl"='${shortUrl}'
    `);
    const [url] = rows;
    if (!url) throw errorFactory({ code: 404 });

    await db.query(`
      UPDATE urls SET views=${url.views + 1}
      WHERE id=${url.id}
    `);

    return res.redirect(url.url);

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { user } = res.locals;
  try {
    const { rows } = await db.query(`
      SELECT *
      FROM urls
      WHERE id=${id}
    `);
    const [url] = rows;
    if (!url) throw errorFactory({ code: 404 });

    if (url.userId !== user.id) throw errorFactory({ code: 401, message: "esta url não foi criada por voce" });

    await db.query(`
      DELETE FROM urls WHERE id=${url.id}
    `);
    return res.sendStatus(200);

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}