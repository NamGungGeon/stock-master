import auth from "../observables/auth";
import { applySession } from "next-session";
import { getAxiosResult, refreshToken, verifyToken } from "../http";
import { isError } from "./index";

export default async ({ req, res }) => {
  await applySession(req, res);
  console.log("current session", req.session);

  if (!req.session.auth) return;

  const { access, refresh } = req.session.auth;
  auth.set(access, refresh);

  if (access && refresh) {
    //verify
    const validation = await getAxiosResult(verifyToken());
    if (isError(validation)) {
      //invalidated
      //do refresh
      const refreshedAccessToken = await getAxiosResult(refreshToken());
      if (isError(refreshedAccessToken)) {
        //refresh fail
        auth.set(null, null);
        req.session.destroy();
      } else {
        //refresh success
        auth.set(refreshedAccessToken, refresh);
      }
    }
  }

  console.log("auth initialized");
};
