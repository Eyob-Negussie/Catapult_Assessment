const axios = require("axios");
const config = require("config");
const http = require("../service/httpService");

describe("/Delete Dictionary", () => {
  beforeAll(() => {
    if (!config.get("auth")) {
      console.log(
        'FATAL ERROR: auth is not defned. please set "catapult_health_authorization" to your environment variable'
      );
      throw new Error(
        'FATAL ERROR: auth is not defned. please set "catapult_health_authorization" to your environment variable'
      );
      process.exit(1);
    }
  });

  it("should return 401 if Autorization header is not passed", async () => {
    delete axios.defaults.headers.common["Authorization"];
    try {
      await http.delete(`/id`);
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(401);
      expect(statusText).toBe("Unauthorized");
    }
    axios.defaults.headers.common["Authorization"] = config.get("auth");
  });

  it("should return 404 if id is not passed", async () => {
    try {
      await http.delete(`/''`);
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(404);
      expect(statusText).toBe("Not Found");
    }
  });

  it("should return 404 if invalid id is passed", async () => {
    try {
      await http.delete("/123456");
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(404);
      expect(statusText).toBe("Not Found");
    }
  });

  it("should return 204 if correct id is passed", async () => {
    const response = await http.delete("/14649658-86ff-4118-afe2-7a0a8a4d77e3");

    const { status, statusText } = response;
    expect(status).toBe(204);
    expect(statusText).toBe("No Content");
  });
});
