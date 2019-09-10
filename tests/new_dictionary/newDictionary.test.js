const axios = require("axios");
const config = require("config");
const http = require("../service/httpService");

describe("/New Dictionary", () => {
  beforeAll(() => {
    if (!config.get("auth")) {
      throw new Error(
        'FATAL ERROR: auth is not defned. please set "catapult_health_authorization" to your environment variable'
      );
      process.exit(1);
    }
  });

  afterEach(() => {
    axios.defaults.headers.common["Authorization"] = config.get("auth");
  });

  it("should return 401 if Autorization header is not passed", async () => {
    delete axios.defaults.headers.common["Authorization"];
    try {
      await http.post();
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(401);
      expect(statusText).toBe("Unauthorized");
    }
    axios.defaults.headers.common["Authorization"];
  });

  it("should return 400 if an empty Autorization header is passed", async () => {
    axios.defaults.headers.common["Authorization"] = "";

    try {
      await http.post();
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(400);
      expect(statusText).toBe("Bad Request");
    }
  });

  it("should return 400 if a wrong Autorization header is passed", async () => {
    axios.defaults.headers.common["Authorization"] = "test";

    try {
      await http.post();
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(400);
      expect(statusText).toBe("Bad Request");
    }
  });

  it("should return 200 and dictionary id when correct Autorization header is passed", async () => {
    const respose = await http.post();
    expect(respose.status).toBe(201);
    expect(respose.data).toHaveProperty("id");
  });
});
