const axios = require("axios");
const config = require("config");
const http = require("../service/httpService");

describe("/Create or Modify key-value Pairs", () => {
  const id = "32820dae-6b06-488f-b977-abca97aa9f84";
  const key_value = { value: "test1" };

  it("should return 401 if Autorization header is not passed", async () => {
    delete axios.defaults.headers.common["Authorization"];
    try {
      await http.post(`/${id}/keys/key1`, key_value);
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(401);
      expect(statusText).toBe("Unauthorized");
    }
    axios.defaults.headers.common["Authorization"] = config.get("auth");
  });

  it("should return 404 if id is not passed", async () => {
    try {
      await http.post(`/''/keys/key1`, key_value);
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(404);
      expect(statusText).toBe("Not Found");
    }
  });

  it("should return 404 if invalid id is passed", async () => {
    try {
      await http.post("/1234567890/keys/key1", key_value);
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(404);
      expect(statusText).toBe("Not Found");
    }
  });

  it("should return 404 if key is not passed", async () => {
    try {
      await http.post("/1234567890/keys/", key_value);
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(404);
      expect(statusText).toBe("Not Found");
    }
  });

  it("should return 200 if correct id and key is passed", async () => {
    const response = await http.post(`/${id}/keys/key1`, key_value);
    const { status, statusText } = response;

    expect(status).toBe(200);
    expect(statusText).toBe("OK");
  });
});
