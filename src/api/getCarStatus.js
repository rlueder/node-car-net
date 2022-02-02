import axios from "axios";

import { VW_BASE_URL } from "../config.js";

/**
 * @async
 * @name getCarStatus
 * @param {Object} tokens
 * @param {string} vehicleId
 * @returns {Promise<any>}
 */

const getCarStatus = async (tokens, vehicleId) => {
  const { access_token } = tokens;
  return await axios
    .get(`/rvs/v1/vehicle/${vehicleId}`, {
      baseURL: VW_BASE_URL,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((response) => response.data)
    .catch((err) => console.log(err.message));
};

export default getCarStatus;
