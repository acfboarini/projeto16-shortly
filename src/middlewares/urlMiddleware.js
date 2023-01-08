import { errorFactory } from "../errors/clientError.js";


export function validateUrl(req, res, next) {
  let error;

  const { url } = req.body;
  if (!url) {
    error = errorFactory({ code: 404, message: "insira a url" });
    return res.status(error.code).send(error.message);
  }

  const regex = /^((http)|(https)|(ftp)):\/\/*/;
  const validation = regex.test(url);
  if (!validation) {
    error = errorFactory({ code: 422, message: "insira uma url valida" });
    return res.status(error.code).send(error.message);
  }

  next();
}