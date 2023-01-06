import { faker } from "@faker-js/faker";
import db from "./../database.js";
import { errorFactory } from "../errors/clientError.js"

export async function postUrl(req, res) {
  const { user } = res.locals;
  const { url } = req.body;
  if (!url) return errorFactory({ code: 404, message: "insira a url" });
  try {
    const regex = '/(^http(s):///';
    const validation = regex.test(url);
    if (!validation) return errorFactory({ code: 422, message: "insira uma url valida" });

    const shortUrl = faker.random.alphaNumeric(8);
    const url = await db.query(`
      INSERT INTO urls (url) VALUES ('${url})
    `);
    await db.query(`
      INSERT INTO users_urls ("userId", "urlId")
      VALUES (${user.id}, ${url.id})
    `);
    return res.status(201).send({ shortUrl });

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getUrlById(req, res) {
  try {

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}