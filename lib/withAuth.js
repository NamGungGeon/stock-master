import auth from "../observables/auth";
import { applySession } from "next-session";

export default async ({ req, res }) => {
  await applySession(req, res);

  const { access, refresh } = req.session.auth;
  auth.set(access, refresh);

  console.log("auth initialized");
};
