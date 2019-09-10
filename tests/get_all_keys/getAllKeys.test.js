const axios = require("axios");
const config = require("config");
const http = require("../service/httpService");

describe("/Get All Keys", () => {
  const id = "32820dae-6b06-488f-b977-abca97aa9f84";

  it("should return 401 if Autorization header is not passed", async () => {
    delete axios.defaults.headers.common["Authorization"];
    try {
      await http.get(`/${id}/keys`);
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(401);
      expect(statusText).toBe("Unauthorized");
    }
    axios.defaults.headers.common["Authorization"] = config.get("auth");
  });

  it("should return 404 if id is not passed", async () => {
    try {
      await http.get(`/''/keys`);
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(404);
      expect(statusText).toBe("Not Found");
    }
  });

  it("should return 404 if invalid id is passed", async () => {
    try {
      await http.get(`/1234567890/keys`);
    } catch (error) {
      const { status, statusText } = error;
      expect(status).toBe(404);
      expect(statusText).toBe("Not Found");
    }
  });

  it("should return 200 if correct id and key is passed", async () => {
    await http.post(`/${id}/keys/key1`, { value: "test1" });
    await http.post(`/${id}/keys/key2`, { value: "test2" });

    const response = await http.get(`/${id}/keys`);
    const { status, statusText, data } = response;

    expect(status).toBe(200);
    expect(statusText).toBe("OK");
    expect(Object.keys(data)).toEqual(
      expect.arrayContaining(["key2", "key1", "id"])
    );
    expect(data).toHaveProperty("key1", "test1");
  });
});
