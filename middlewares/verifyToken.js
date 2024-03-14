import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Token is required");
  }

  const [tokenType, token] = authHeader.split(" ");

  if (tokenType !== "Bearer") {
    return res.status(403).send("Invalid Token");
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY);

    req.user = user;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
}
