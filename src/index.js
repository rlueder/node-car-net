import { getAcctStatus, getCarStatus, getHealthStatus } from "./api/index.js";
import logIn from "./logIn.js";

(async () => {
  const tokens = await logIn();
  // console.log(tokens);

  const accountInfo = await getAcctStatus(tokens);
  console.log({ accountInfo });

  const vehicleId = accountInfo.vehicleEnrollmentStatus[0].vehicleId;
  console.log({ vehicleId });

  // const cartStatus = await getCarStatus(tokens, vehicleId);
  // console.log({ cartStatus });

  // const healthStatus = await getHealthStatus(tokens, vehicleId);
  // console.log({ healthStatus });
})();
