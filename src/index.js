import {
  getAuthentication,
  getAuthTokens,
  getCodeChallenge,
  getCodeVerifier,
  parseFormInputs,
  postEmailForm,
  postPasswordForm,
} from "./utils/index.js";

/**
 * @name cookie
 * @summary The session cookie.
 * @type {string}
 */

let cookie = "";

/**
 * @name tokens
 * @summary The auth tokens.
 * @type {Object}
 */

export let tokens;

/**
 * @name verifier
 * @summary The PKCE code verifier.
 * @type {string}
 */

const verifier = getCodeVerifier();

/**
 * @name challenge
 * @summary The PKCE code challenge
 * @type {string}
 */

const challenge = `${getCodeChallenge(verifier)}=`;

// Step 1 - get Auth parameters
getAuthentication(challenge)
  .then((response) => {
    const headers = response.headers["set-cookie"][0];
    cookie = headers.split(";")[0];
    return parseFormInputs(response.data);
  })
  .then((obj) => {
    // Step 2 - POST email form
    postEmailForm(obj, cookie)
      .then((response) => {
        return parseFormInputs(response.data);
      })
      .then((obj) => {
        // Step 3 - POST password form
        postPasswordForm(obj, cookie)
          .then((response) => {
            const code = response.split("&")[1].split("=")[1];
            // Step 4 - get tokens
            getAuthTokens(code, verifier).then((response) => {
              tokens = response.data;
              console.log(tokens);
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
