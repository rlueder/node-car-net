import { createHash } from "crypto";
import base64Urlencode from "./base64UrlEncode.js";

/**
 * @name getCodeChallenge
 * @see {@link https://nodejs.org/api/crypto.html#cryptocreatehashalgorithm-options}
 * @param {string} verifier
 * @returns {string} - the PKCE code challenge
 */

const getCodeChallenge = (verifier) =>
  base64Urlencode(createHash("sha256").update(verifier).digest());

export default getCodeChallenge;
