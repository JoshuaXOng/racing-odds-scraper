import { MongoClient } from "mongodb";
// import "dotenv/config";

const mdbConnectionString = process.env.INTEGRATION_MONGODB_CONNECTION_URL;
const mdbPrimaryDbName = process.env.INTEGRATION_MONGODB_PRIMARY_DB_NAME;
if (!mdbConnectionString || !mdbPrimaryDbName) {
  throw new Error("Cannot load MongoDB configuration file as some settings are missing.");
}

export const mdbClient = new MongoClient(mdbConnectionString);

(async () => {
  await mdbClient.connect();
})();

