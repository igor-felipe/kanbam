import { sign } from "jsonwebtoken";
import { expressjwt } from "express-jwt";

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;

const getToken = (payload: { id: string }) =>
  sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

const configuration = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
});

export { getToken, configuration };
