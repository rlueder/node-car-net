/**
 * @name base64Urlencode
 * @summary URL-safe Base64 encoding.
 * @see {@link https://www.oauth.com/oauth2-servers/pkce/authorization-request/}
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Base64}
 * @param {string} str
 * @returns {string} Base64-URL-encoded string
 */

const base64Urlencode = (str) =>
  btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

export default base64Urlencode;
