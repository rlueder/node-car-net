import axios from "axios";

import { VW_BASE_URL } from "../config.js";

/**
 * @name getStatus
 * @param {Object} tokens
 * @returns {Promise<any>}
 */

const getStatus = (tokens) => {
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
    .catch((err) => console.log(err));
};

export default getStatus;
