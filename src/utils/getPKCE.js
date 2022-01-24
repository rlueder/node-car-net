import { getCodeChallenge, getCodeVerifier } from "./index.js";

/**
 * @name getPKCE
 * @summary The PKCE code verifier.
 * @type {Function}
 * @returns {Object}
 */

const getPKCE = () => {
  const verifier = getCodeVerifier();
  return {
    challenge: `${getCodeChallenge(verifier)}=`,
    verifier,
  };
};

export default getPKCE;
