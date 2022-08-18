import Local from "passport-local";
import { findUser, validatePassword } from "./user";

export const localStrategy = new Local.Strategy(
  { usernameField: "nif", passwordField: "password" },
  function (nif, password, done) {
    findUser({ nif })
      .then((user) => {
        if (user.length === 1) {
          if (user && validatePassword(user[0], password)) {
            done(null, user[0]);
          } else {
            done(new Error("Nif e Password não combinam"));
          }
        } else {
          done(new Error("Sem autorização"));
        }
      })
      .catch((error) => {
        done(error);
      });
  }
);
