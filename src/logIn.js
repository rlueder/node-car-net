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

  let cookie, form, tokens;

  try {
    // Step 1 - GET Auth parameters
    form = await getAuthentication(challenge).then((response) => {
      const headers = response.headers["set-cookie"][0];
      cookie = headers.split(";")[0];
      return parseFormInputs(response.data);
    });

    // Step 2 - POST email form
    form = await postEmailForm(email, form, cookie).then((response) =>
      parseFormInputs(response)
    );

    // Step 3 - POST password form
    const code = await postPasswordForm(password, form, cookie).then(
      (response) => response?.split("&")[1].split("=")[1]
    );

    // Step 4 - GET tokens
    tokens = await getAuthTokens(code, verifier);

    return tokens;
  } catch (err) {
    console.log(err.message);
  }
};

export default logIn;
