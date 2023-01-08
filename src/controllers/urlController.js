import urlService from "../services/urlService.js";

export async function postUrl(req, res) {
  const { user } = res.locals;
  const { url } = req.body;
  try {
    const shortUrl = await urlService.postUrl(user, url);
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
    const url = await urlService.getUrlById(id);
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
    const url = await urlService.redirectUserToUrl(shortUrl);
    return res.redirect(url);

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
    await urlService.deleteUrl(id, user);
    return res.sendStatus(200);

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const ranking = await urlService.getRanking();
    return res.send(ranking);

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}