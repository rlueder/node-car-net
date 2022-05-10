import axios from "axios";

import {VW_IDENTITY_URL} from "../config.js";

/**
 * @async
 * @name postEmailForm
 * @param {string} email
 * @param {Object} form
 * @param {string} cookie
 * @returns {Promise<any>}
 */

const getAuthPage = async (email, form, cookie) => {
  const {action, params} = form;
  return await axios
    .post(action, null, {
      baseURL: VW_IDENTITY_URL,
      headers: {
        Cookie: cookie,
      },
      params: {
        ...params,
        email,
      },
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export default postEmailForm;
