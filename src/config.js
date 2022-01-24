import axios from "axios";

/**
 *
 * @type {string}
 */

export const VW_BASE_URL = "https://b-h-s.spr.us00.p.con-veh.net/";

/**
 *
 * @type {string}
 */
export const VW_IDENTITY_URL = "https://identity.na.vwgroup.io/";

/**
 *
 * @type {string}
 */

export const VW_CLIENT_ID =
  "2dae49f6-830b-4180-9af9-59dd0d060916@apps_vw-dilab_com";

/**
 *
 * @type {string}
 */

export const VW_OAUTH_CALLBACK = "car-net:///oauth-callback";

/**
 * @name client
 */

export const client = axios.create({
  baseURL: VW_BASE_URL,
  headers: {
    // Authorization: `Bearer ${accessToken}`
  },
});
