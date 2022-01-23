import axios from "axios";
import "dotenv/config";

import { VW_IDENTITY_URL } from "../config.js";

const { VW_PASSWORD } = process.env;

/**
 *
 * @param response
 * @returns {Promise<any>}
 */

const followRedirects = (response) => {
  if (response.status === 302) {
    const redirectUrl = response.headers.location;
    // check if last redirect and return
    if (redirectUrl.includes("car-net:///oauth-callback?")) {
      return redirectUrl;
    } else {
      // keep following redirects until last one is reached
      return axios
        .get(redirectUrl, {
          maxRedirects: 0,
          validateStatus: (status) => status >= 200 && status < 400,
        })
        .then((response) => followRedirects(response))
        .catch((err) => console.log(err));
    }
  }
};

/**
 * @name postPasswordForm
 * @param {Object} form
 * @param {string} cookie
 * @returns {Promise<any>}
 */

const postPasswordForm = async (form, cookie) => {
  const { action, params } = form;
  return axios
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
    .catch((err) => console.log(err));
};

export default postPasswordForm;
