const config = require("config");

module.exports = async function() {
  if (!config.get("auth")) {
    console.log(
      'FATAL ERROR: auth is not defned. please set "catapult_health_authorization" to your environment variable'
    );
    throw new Error(
      'FATAL ERROR: auth is not defned. please set "catapult_health_authorization" to your environment variable'
    );
    process.exit(1);
  }
};
