import prompts from "prompts";

import { getAcctStatus, getCarStatus, getHealthStatus } from "./api/index.js";
import { questions } from "./utils/index.js";
import logIn from "./logIn.js";

(async () => {
  const response = await prompts(questions);

  const tokens = await logIn(response);
  // console.log(tokens);

  const accountInfo = await getAcctStatus(tokens);
  console.log({ accountInfo });

  const vehicleId = accountInfo.vehicleEnrollmentStatus[0].vehicleId;
  console.log({ vehicleId });

  // const carStatus = await getCarStatus(tokens, vehicleId);
  // console.log({ carStatus });

  // const healthStatus = await getHealthStatus(tokens, vehicleId);
  // console.log({ healthStatus });
})();
