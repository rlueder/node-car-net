import { randomUUID } from "crypto";
import axios from "axios";

import { VW_BASE_URL, VW_CLIENT_ID, VW_OAUTH_CALLBACK } from "../config.js";
import { getCodeChallenge, getCodeVerifier } from "./index.js";

/**
 * @name getAuthentication
 * @param {string} challenge
 * @returns {Promise<any>}
 */

const getAuthentication = (challenge) => {
  return axios
    .get("/oidc/v1/authorize", {
      baseURL: VW_BASE_URL,
      params: {
        client_id: VW_CLIENT_ID,
        code_challenge: challenge,
        code_challenge_method: "S256",
        prompt: "login",
        redirect_uri: VW_OAUTH_CALLBACK,
        response_type: "code",
        scope: "openid",
        state: randomUUID(),
      },
    })
    .then((response) => response)
    .catch((err) => console.log(err));
};

export default getAuthentication;
