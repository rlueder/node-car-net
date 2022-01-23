import jsdom from "jsdom";

/**
 * @parseFormInputs
 * @summary Parses form action and hidden inputs for params needed for OAuth
 * requests.
 * @param {Object} data
 * @returns {Object}
 */

const parseFormInputs = (data) => {
  const dom = new jsdom.JSDOM(data);
  const params = {};
  // get the form action attribute
  const action = dom.window.document.querySelector("form").action;
  // filter input elements for values needed for next request
  const inputs = [...dom.window.document.querySelectorAll("input")];
  inputs
    .filter((input) => input.type === "hidden")
    .map((input) => {
      const { name, value } = input;
      params[name] = value;
    });
  return {
    action,
    params
  };
};

export default parseFormInputs;
