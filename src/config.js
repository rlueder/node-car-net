import "dotenv/config";

/**
 * @name VW_BASE_URL
 * @type {string}
 */

export const VW_BASE_URL = "https://b-h-s.spr.us00.p.con-veh.net/";

/**
 * @name VW_CLIENT_ID
 * @type {string}
 */

export const VW_CLIENT_ID =
  "2dae49f6-830b-4180-9af9-59dd0d060916@apps_vw-dilab_com";

/**
 * @name VW_IDENTITY_URL
 * @type {string}
 */

export const VW_IDENTITY_URL = "https://identity.na.vwgroup.io/";

/**
 * @name VW_OAUTH_CALLBACK
 * @type {string}
 */

export const VW_OAUTH_CALLBACK = "car-net:///oauth-callback";

/**
 * @name VW_EMAIL
 * @summary Your VW email set on .env file
 * @type {string}
 */

export const VW_EMAIL = process.env.VW_EMAIL;

/**
 * @name VW_PASSWORD
 * @summary Your VW password set on .env file
 * @type {string}
 */

export const VW_PASSWORD = process.env.VW_PASSWORD;

/**
 * @name IOS_USER_AGENT
 * @summary IOS User Agent
 * @type {string}
 */

export const IOS_USER_AGENT = "Mozilla/5.0 (iPhone; CPU iPhone OS 15_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1";
