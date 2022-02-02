import axios from "axios";

import { VW_BASE_URL, VW_CLIENT_ID, VW_OAUTH_CALLBACK } from "../config.js";

/**
 * @async
 * @name getAuthTokens
 * @param {string} code
 * @param {string} verifier
 * @returns {Promise<any>}
 */

const getAuthTokens = async (code, verifier) => {
  return await axios
    .post("/oidc/v1/token", null, {
      baseURL: VW_BASE_URL,
      params: {
        client_id: VW_CLIENT_ID,
        code: code,
        code_verifier: verifier,
        grant_type: "authorization_code",
        redirect_uri: VW_OAUTH_CALLBACK,
      },
    })
    .then((response) => response.data)
    .catch((err) => {
      console.log(err.message);
    });
};

export default getAuthTokens;
