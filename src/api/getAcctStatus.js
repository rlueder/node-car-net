import axios from "axios";

import { VW_BASE_URL } from "../config.js";

/**
 * @name getAcctStatus
 * @param {Object} tokens
 * @returns {Promise<any>}
 */

const getAcctStatus = (tokens) => {
  const { access_token, id_token } = tokens;
  return axios
    .get("/account/v1/enrollment/status", {
      baseURL: VW_BASE_URL,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        idToken: id_token,
      },
    })
    .then((response) => response)
    .catch((err) => console.log(err.message));
};

export default getAcctStatus;
