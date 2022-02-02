import axios from "axios";

import { VW_IDENTITY_URL, VW_PASSWORD } from "../config.js";

import { followRedirects } from "./index.js";

/**
 * @async
 * @name postPasswordForm
 * @param {Object} form
 * @param {string} cookie
 * @returns {Promise<any>}
 */

const postPasswordForm = async (form, cookie) => {
  const { action, params } = form;
  return await axios
    .post(action, null, {
      baseURL: VW_IDENTITY_URL,
      headers: {
        Cookie: cookie,
      },
      maxRedirects: 0, // disable redirects so we can intercept them
      params: {
        ...params,
        password: VW_PASSWORD,
      },
      validateStatus: (status) => status >= 200 && status < 400,
    })
    .then((response) => followRedirects(response))
    .catch((err) => console.log(err.message));
};

export default postPasswordForm;
