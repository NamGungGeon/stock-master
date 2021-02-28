import auth from "../observables/auth";
import { applySession } from "next-session";
import ApiRequest, { refreshToken, verifyToken } from "../http";
import { isError } from "./index";

export const SessionAuth = function(access, refresh) {
  this.access = access;
  this.refresh = refresh;
  this.rebuildApiRequester(access, refresh);
};
SessionAuth.prototype.toJSON = function() {
  return {
    access: this.access,
    refresh: this.refresh
  };
};
SessionAuth.prototype.rebuildApiRequester = function(access, refresh) {
  this.apiRequest = new ApiRequest({ access, refresh });
};
SessionAuth.prototype.request = function() {
  return this.apiRequest;
};
SessionAuth.prototype.filled = function() {
  return this.access && this.refresh;
};
SessionAuth.prototype.verify = function() {
  return verifyToken(this.access)
    .then(res => res)
    .catch(e => e);
};
SessionAuth.prototype.refreshToken = function() {
  return refreshToken(this.refresh)
    .then(res => {
      const access = (this.access = res.data);
      this.rebuildApiRequester(access, this.refresh);
    })
    .catch(e => e);
};

export const loadAuth = async ({ req, res }) => {
  await applySession(req, res);

  const { access, refresh } = req.session?.auth ?? { access: "", refresh: "" };
  const sessionAuth = new SessionAuth(access, refresh);
  if (sessionAuth.filled()) {
    const validation = await sessionAuth.verify();
    if (isError(validation, "token verify")) {
      //access token is invalidated
      await sessionAuth.refreshToken().catch(e => {
        console.error("refresh fail", e);
        req.session?.destroy();
      });
    }
  }
  req.session.auth = sessionAuth;

  console.log("auth initialized");
};
