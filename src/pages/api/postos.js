import { pool } from "../../config/mysql2";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      // GET todos os users
      return await getPostos(req, res);
    default:
      break;
  }
}

const getPostos = async (req, res) => {
  try {
    const [postos] = await pool.query("Select * from postos");
    return res.status(200).json(postos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
