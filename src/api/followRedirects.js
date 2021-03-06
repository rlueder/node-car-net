import axios from "axios";

/**
 * @async
 * @name followRedirects
 * @param {Object} response
 * @returns {Promise<any>}
 */

const followRedirects = async (response) => {
  if (response.status === 302) {
    const redirectUrl = response.headers.location;
    // check if last redirect and return
    if (redirectUrl.includes("car-net:///oauth-callback")) {
      return redirectUrl;
    } else {
      // keep following redirects until last one is reached
      return await axios
        .get(redirectUrl, {
          maxRedirects: 0,
          validateStatus: (status) => status === 302,
        })
        .then((response) => followRedirects(response))
        .catch((err) => console.log(err));
    }
  }
};

export default followRedirects;
