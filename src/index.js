import {
  getAuthentication,
  getAuthTokens,
  getAcctStatus,
  getCarStatus,
  getHealthStatus,
  postEmailForm,
  postPasswordForm,
} from "./api/index.js";

import { getPKCE, parseFormInputs } from "./utils/index.js";

/**
 * @name logIn
 * @summary Starts the log in flow.
 * @returns {Object} tokens
 */

const logIn = async () => {
  const { challenge, verifier } = getPKCE();

  let cookie, form, tokens;

  try {
    // Step 1 - get Auth parameters
    form = await getAuthentication(challenge).then((response) => {
      const headers = response.headers["set-cookie"][0];
      cookie = headers.split(";")[0];
      return parseFormInputs(response.data);
    });

    // Step 2 - POST email form
    form = await postEmailForm(form, cookie).then((response) =>
      parseFormInputs(response.data)
    );

    // Step 3 - POST password form
    tokens = await postPasswordForm(form, cookie).then((response) => {
      const code = response?.split("&")[1].split("=")[1];
      // Step 4 - get tokens
      return getAuthTokens(code, verifier).then((response) => response.data);
    });

    return tokens;
  } catch (err) {
    console.log(err.message);
  }
};

(async () => {
  const tokens = await logIn();

  if (tokens) {
    const vehicleId = await getAcctStatus(tokens).then((response) => {
      const accountInfo = response.data.data;
      // console.log(JSON.stringify(accountInfo));
      return accountInfo.vehicleEnrollmentStatus[0].vehicleId;
    });

    if (vehicleId) {
      console.log({ vehicleId });

      // getCarStatus(tokens, vehicleId).then((response) =>
      //   console.log(response.data)
      // );

      // getHealthStatus(tokens, vehicleId).then((response) =>
      //   console.log(response.data)
      // );
    }
  }
})();
