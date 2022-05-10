import {
  getAuthentication,
  getAuthTokens,
  postEmailForm,
  postPasswordForm,
} from "./api/index.js";

import { getPKCE, parseFormInputs } from "./utils/index.js";

/**
 * @name logIn
 * @summary Starts the log in flow.
 * @param {Object} response - the user email and password
 * @returns {Object} tokens
 */

const logIn = async (response) => {
  const { email, password } = response;
  const { challenge, verifier } = getPKCE();

  let cookie, form1, form2, tokens;

  try {
    // Step 1 - GET Auth parameters
    form1 = await getAuthentication(challenge).then((response) => {
      const headers = response.headers["set-cookie"][0];
      cookie = headers.split(";")[0];
      return parseFormInputs(response.data, 1);
    });
    // Step 2 - POST email form
    form2 = await postEmailForm(email, form1, cookie).then((response) => {
      return parseFormInputs(response, 2)
    });

    // Step 3 - POST password form
    const code = await postPasswordForm(email, password, form2, cookie).then(
      (response) => response?.split("&")[1].split("=")[1]
    );
    console.log("Code 3:" + code)

    // Step 4 - GET tokens
    tokens = await getAuthTokens(code, verifier);
    console.log("Tokens 4:" + form2)

    return tokens;
  } catch (err) {
    console.log(err.message);
  }
};

export default logIn;
