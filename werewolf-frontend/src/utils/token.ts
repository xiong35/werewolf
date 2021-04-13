import { TokenDef } from "../../shared/ModelDefs";

const KEY = "token_";

export function setToken(ID: string, roomNumber: string) {
  const token: TokenDef = {
    ID,
    datetime: Date.now(),
    roomNumber,
  };
  window.localStorage.setItem(KEY, JSON.stringify(token));
}

export function getToken(): TokenDef | null {
  try {
    const str = window.localStorage.getItem(KEY) ?? "@";
    const token = JSON.parse(str) as TokenDef;
    if (
      typeof token.ID === "string" &&
      typeof token.roomNumber === "string" &&
      typeof token.datetime === "number"
    ) {
      const dtDiff = Date.now() - token.datetime;
      if (dtDiff / 1000 / 3600 / 24 < 1) {
        return token;
      } else {
        // window.localStorage.removeItem(KEY);
        // TODO remove token
      }
    }
  } catch (error) {}
  return null;
}
