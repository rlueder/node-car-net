import axios from "axios";
import curlirize from "axios-curlirize";

curlirize(axios);
import {VW_IDENTITY_URL, IOS_USER_AGENT} from "../config.js";

import {followRedirects} from "./index.js";

/**
 * @async
 * @name postPasswordForm
 * @param {string} email
 * @param {string} password
 * @param {string} cookie
 * @param {Object} form
 * @returns {Promise<any>}
 */

const postPasswordForm = async (email, password, form, cookie) => {
  const {action, params} = form;

  return await axios
    .post(action, null, {
      baseURL: VW_IDENTITY_URL, headers: {
        Cookie: cookie,
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": IOS_USER_AGENT,
        Referer: "https://identity.na.vwgroup.io/signin-service/v1/b680e751-7e1f-4008-8ec1-3a528183d215@apps_vw-dilab_com/login/authenticate?relayState=" + params.relayState,
        Origin: "identity.na.vwgroup.io",
        Host: "identity.na.vwgroup.io",
        Connection: "keep-alive",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"

      }, maxRedirects: 0, // disable redirects so we can intercept them
      params: {
        ...params, email, password,
      }, validateStatus: (status) => status >= 200 && status < 401,
    })
    .then((response) => followRedirects(response))
    .catch((err) => console.log(JSON.stringify(err)));
};

export default postPasswordForm;
