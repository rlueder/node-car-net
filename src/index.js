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
 * @returns {Promise<any>}
 */

const logIn = () => {
  const { challenge, verifier } = getPKCE();
  let cookie;
  // Step 1 - get Auth parameters
  return getAuthentication(challenge)
    .then((response) => {
      const headers = response.headers["set-cookie"][0];
      cookie = headers.split(";")[0];
      return parseFormInputs(response.data);
    })
    .then((obj) => {
      // Step 2 - POST email form
      return postEmailForm(obj, cookie)
        .then((response) => {
          return parseFormInputs(response.data);
        })
        .then((obj) => {
          // Step 3 - POST password form
          return postPasswordForm(obj, cookie)
            .then((response) => {
              const code = response.split("&")[1].split("=")[1];
              // Step 4 - get tokens
              return getAuthTokens(code, verifier).then(
                (response) => response.data
              );
            })
            .catch((err) => console.log(err.message));
        })
        .catch((err) => console.log(err.message));
    })
    .catch((err) => console.log(err.message));
};

logIn().then((tokens) =>
  getAcctStatus(tokens).then((response) => {
    const accountInfo = response.data.data;
    console.log(JSON.stringify(accountInfo));

    const { vehicleId } = accountInfo?.vehicleEnrollmentStatus[0];
    console.log(vehicleId);

    // getCarStatus(tokens, vehicleId)
    //   .then((response) => console.log(response.data))
    //   .catch((err) => console.log(err));

    // getHealthStatus(tokens, vehicleId)
    //   .then((response) => console.log(response.data))
    //   .catch((err) => console.log(err));
  })
);
