import Local from "passport-local";
import { findUser, validatePassword } from "./user";

export const localStrategy = new Local.Strategy(
  { usernameField: "nif", passwordField: "password" },
  function (nif, password, done) {
    findUser({ nif })
      .then((user) => {
        if (user && validatePassword(user[0], password)) {
          done(null, user[0]);
        } else {
          done(new Error("Invalid nif and password combination"));
        }
      })
      .catch((error) => {
        done(error);
      });
  }
);
