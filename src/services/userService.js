import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { errorFactory } from "../errors/clientError.js";
import userRepository from "../repositories/userRepository.js";

async function signUp(data) {
  const { name, email, password } = data;

  const user = await userRepository.getUseryEmail(email);
  if (user) throw errorFactory({ code: 409 });

  const salt = 10;
  const password_hash = bcrypt.hashSync(password, salt);
  await userRepository.insertUser({ name, email, password_hash });
}

async function signIn(data) {
  const { email, password } = data;

  const user = await userRepository.getUseryEmail(email);
  if (!user) throw errorFactory({ code: 404 });

  const passwordValidation = bcrypt.compareSync(password, user.password);
  if (!passwordValidation) throw errorFactory({ code: 401, message: "incorrect password" });

  const token = uuid();
  await userRepository.createSession(user.id, token);
  return { username: user.name, token };
}

async function getUserWithUrls(userId) {
  const rows = await userRepository.getUserJoinUrls(userId);
  const { totalViews, shortnedUrls } = assembleUrlData(rows);
  return {
    id: rows[0].userId,
    name: rows[0].name,
    totalViews,
    shortnedUrls,
  };
}

function assembleUrlData(rows) {
  const shortnedUrls = [];
  let totalViews = 0;

  for (let data of rows) {
    const { urlId, shortUrl, url, views } = data;
    totalViews += views;

    const url_info = {
      id: urlId,
      shortUrl,
      url,
      views
    };
    shortnedUrls.push(url_info);
  }

  return {
    totalViews,
    shortnedUrls,
  }
}

const userService = {
  signUp, signIn, getUserWithUrls
};

export default userService;