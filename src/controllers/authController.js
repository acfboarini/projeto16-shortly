import userRepository from "../repositories/userRepository.js";
import userService from "../services/userService.js";

export async function signUp(req, res) {
  try {
    await userService.signUp(req.body);
    return res.sendStatus(201);

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  try {
    const sessionData = await userService.signIn(req.body);
    return res.status(200).send(sessionData);

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}

export async function signOut(req, res) {
  const { token } = res.locals;
  try {
    await userRepository.deleteSession(token);
    return res.sendStatus(200);

  } catch (error) {
    if (error.type) return res.status(error.code).send(error);
    console.log(error);
    return res.sendStatus(500);
  }
}