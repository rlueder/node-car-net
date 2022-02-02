import axios from "axios";
import "dotenv/config";

import { VW_IDENTITY_URL } from "../config.js";

const { VW_EMAIL } = process.env;

/**
 * @async
 * @name postEmailForm
 * @param {Object} form
 * @param {string} cookie
 * @returns {Promise<any>}
 */

const postEmailForm = async (form, cookie) => {
  const { action, params } = form;
  return await axios
    .post(action, null, {
      baseURL: VW_IDENTITY_URL,
      headers: {
        Cookie: cookie,
      },
      params: {
        ...params,
        email: VW_EMAIL,
      },
    })
    .then((response) => response)
    .catch((err) => {
      console.log(err.message);
    });
};

export default postEmailForm;
