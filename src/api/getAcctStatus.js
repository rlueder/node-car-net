import axios from "axios";

import { VW_BASE_URL } from "../config.js";

/**
 * @async
 * @name getAcctStatus
 * @param {Object} tokens
 * @returns {Promise<any>}
 */

const getAcctStatus = async (tokens) => {
  const { access_token, id_token } = tokens;
  return await axios
    .get("/account/v1/enrollment/status", {
      baseURL: VW_BASE_URL,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        idToken: id_token,
      },
    })
    .then((response) => response.data.data)
    .catch((err) => console.log(err.message));
};

export default getAcctStatus;
