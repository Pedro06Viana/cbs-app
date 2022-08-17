import { createUser, findUser } from "../../lib/user";

export default async function signup(req, res) {
  try {
    const user = await findUser(req.body);
    if (user.length === 0) {
      await createUser(req.body);
      res.status(200).send({ done: true });
    } else {
      res.status(409).json({ message: "User exist." });
    }
  } catch (error) {
    res.status(500).end(error.message);
  }
}
