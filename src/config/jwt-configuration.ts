import { sign } from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { GetOneDbOutput } from "../validators/user_validator";

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env;

const getToken = (user: GetOneDbOutput) => {
  const payload = {
    id: user.id,
    role: user.role,
  };
  const token = sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME,
  });

  return token;
};

const configuration = expressjwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
});

export { getToken, configuration };
