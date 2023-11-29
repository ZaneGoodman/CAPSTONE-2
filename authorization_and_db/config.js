const SECRET_KEY = process.env.SECRET_KEY || "secret_development";

const PORT = +process.env.PORT || 3001;

// picking the correct db
function getDatabaseUri() {
  return process.env.NODE_ENV === "test"
    ? "postgresql:///prayer_room_test"
    : process.env.DATABASE_URL || "postgresql:///prayer_room";
}

//Define bcrypt work factor for testing a development/production
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
