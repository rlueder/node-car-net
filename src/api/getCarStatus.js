import axios from "axios";

import { VW_BASE_URL } from "../config.js";

/**
 * @name getCarStatus
 * @param {Object} tokens
 * @param {string} vehicleId
 * @returns {Promise<any>}
 */

const getCarStatus = (tokens, vehicleId) => {
  const { access_token } = tokens;
  return axios
    .get(`/rvs/v1/vehicle/${vehicleId}`, {
      baseURL: VW_BASE_URL,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => response)
    .catch((err) => console.log(err.message));
};

export default getCarStatus;
