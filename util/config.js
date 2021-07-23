import { config } from "dotenv";
config();

const SECRETS = {
  jwt: process.env.JWT_SECRET,
  jwtExp: "100d",
  node_env: process.env.NODE_ENV,
  spacesEndpoint: process.env.DO_SPACES_ENDPOINT,
  spacesAcessKey: process.env.DO_SPACES_ACCESS_KEY,
  spacesSecretKey: process.env.DO_SPACES_SECRET_KEY
};

export { SECRETS};
