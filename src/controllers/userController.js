import userService from "../services/userService.js";

export async function getUserWithUrls(req, res) {
  const { user } = res.locals;
  try {
    const user_info = await userService.getUserWithUrls(user.id);
    return res.send(user_info);

  } catch (error) {
    if (error.type) return res.status(error.code).send(error.message);
    return res.sendStatus(500);
  }
}