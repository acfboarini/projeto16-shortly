import { faker } from "@faker-js/faker";
import urlRepository from "../repositories/urlRepository.js";
import { errorFactory } from "../errors/clientError.js";

async function postUrl(user, url) {
  const exist_url = await urlRepository.getUrlByUrl(url);
  if (exist_url) throw errorFactory({ code: 409, message: "essa url ja existe" })

  const shortUrl = faker.random.alphaNumeric(8);
  await urlRepository.insert(user.id, url, shortUrl);
  return shortUrl;
}

async function getUrlById(urlId) {
  const url = await urlRepository.getUrlById(urlId);
  if (!url) throw errorFactory({ code: 404 });

  return url;
}

async function redirectUserToUrl(shortUrl) {
  const url = await urlRepository.getUrlByShortUrl(shortUrl);
  if (!url) throw errorFactory({ code: 404 });

  await urlRepository.addViewToUrlById(url.views, url.id);

  return url.url;
}

async function deleteUrl(urlId, user) {

  const url = await urlRepository.getUrlById(urlId, "select all");
  if (!url) throw errorFactory({ code: 404 });

  if (url.userId !== user.id) throw errorFactory({ code: 401, message: "esta url não foi criada por voce" });

  await urlRepository.deleteById(url.id);
}

async function getRanking() {
  return await urlRepository.getRanking();
}

const urlService = {
  postUrl, getUrlById, redirectUserToUrl, deleteUrl, getRanking
};

export default urlService;