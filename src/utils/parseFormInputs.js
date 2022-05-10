import jsdom from "jsdom";

/**
 * @parseFormInputs
 * @summary Parses form action and hidden inputs for params needed for OAuth
 * requests.
 * @param {Object} data
 * @param {Number} formNum
 * @returns {Object}
 */

const parseFormInputs = (data, formNum) => {
  const dom = new jsdom.JSDOM(data);
  const params = {};
  let action;
  let inputs;
  if (formNum === 1) {
    // get the form action attribute
    action = dom.window.document.querySelector("form").action;
    // filter input elements for values needed for next request
    inputs = [...dom.window.document.querySelectorAll("input")];
    inputs
      .filter((input) => input.type === "hidden")
      .map((input) => {
        const {name, value} = input;
        params[name] = value;
      });
  } else if (formNum === 2) {
    // build 9th script and strip a bunch of characters to build a json of info. yes, this seems brittle.
    const scriptJson = JSON.parse(dom.window.document.scripts.item(9).text
      .replace(/\s+/g, '')
      .replace("window._IDK={templateModel:", "")
      .split(",currentLocale")[0])
    // set the form action attribute
    action = "/signin-service/v1/b680e751-7e1f-4008-8cc1-3a528183d215@apps_vw-dilab_com/login/authenticate";
    // define elements for values needed for next request
    params["_csrf"] = dom.window.document.scripts.item(9).text
      .replace(/\s+/g, '')
      .split("csrf_token:'")[1]
      .split("'")[0]
    params["relayState"] = scriptJson.relayState
    params["hmac"] = scriptJson.hmac
  } else {
    throw new Error("Form Number not recognized. Must be Form 1 or 2.")
  }
  if (!action || !params) {
    throw new Error("Action / params empty. Action: " + action + " . Params: " + JSON.stringify(params))
  }
  return {
    action,
    params,
  };
};

export default parseFormInputs;
