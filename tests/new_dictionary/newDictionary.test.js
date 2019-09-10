const axios = require("axios");
const config = require("config");
const http = require("../service/httpService");

describe("/New Dictionary", () => {
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
    const { status, data } = await http.post();
    expect(status).toBe(201);
    expect(data).toHaveProperty("id");
    expect(data.id).toMatch(
      /[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/
    );
  });
});
