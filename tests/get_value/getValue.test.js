const axios = require("axios");
const config = require("config");
const http = require("../service/httpService");

describe("/Get a Value", () => {
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

  const id = "32820dae-6b06-488f-b977-abca97aa9f84";
  const key_value = { value: "test1" };

  it("should return 401 if Autorization header is not passed", async () => {
    delete axios.defaults.headers.common["Authorization"];
    try {
      await http.get(`/${id}/keys/key1`);
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(401);
      expect(statusText).toBe("Unauthorized");
    }
    axios.defaults.headers.common["Authorization"] = config.get("auth");
  });

  it("should return 404 if id is not passed", async () => {
    try {
      await http.get(`/''/keys/key1`);
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(404);
      expect(statusText).toBe("Not Found");
    }
  });

  it("should return 404 if invalid id is passed", async () => {
    try {
      await http.get("/1234567890/keys/key1");
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(404);
      expect(statusText).toBe("Not Found");
    }
  });

  it("should return 404 if key is not passed", async () => {
    try {
      await http.get("/1234567890/keys/");
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(404);
      expect(statusText).toBe("Not Found");
    }
  });

  it("should return 200 if correct id and key is passed", async () => {
    await http.post(`/${id}/keys/key1`, { value: "test1" });
    const response = await http.get(`/${id}/keys/key1`);
    const { status, statusText, data } = response;

    expect(status).toBe(200);
    expect(statusText).toBe("OK");
    expect(data).toHaveProperty("value", "test1");
  });
});
