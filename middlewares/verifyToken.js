import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isTokenRevoked } from "./blacklist.js";

dotenv.config();

export async function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Token is required");
  }

  const [tokenType, token] = authHeader.split(" ");

  if (tokenType !== "Bearer") {
    return res.status(403).send("Not Bearer Token");
  }
  try {
    if (isTokenRevoked(token)) {
      return res
        .status(401)
        .json({ error: true, message: "Token has been revoked" });
    }
    const user = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = user;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
}
