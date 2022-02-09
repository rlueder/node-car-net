import prompts from "prompts";

import { getAcctStatus, getCarStatus, getHealthStatus } from "./api/index.js";
import { questions, spinner } from "./utils/index.js";
import logIn from "./logIn.js";

(async () => {
  const response = await prompts(questions).then((res) => {
    spinner.start("Logging in to VW car-net...");
    return res;
  });

  const tokens = await logIn(response);
  // console.log(tokens);

  const accountInfo = await getAcctStatus(tokens).then((res) => {
    spinner.stop();
    return res;
  });
  console.log({ accountInfo });

  const vehicleId = accountInfo.vehicleEnrollmentStatus[0].vehicleId;
  console.log({ vehicleId });

  // const carStatus = await getCarStatus(tokens, vehicleId);
  // console.log({ carStatus });

  // const healthStatus = await getHealthStatus(tokens, vehicleId);
  // console.log({ healthStatus });
})();
