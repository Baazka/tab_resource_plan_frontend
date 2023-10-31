const axios = require("axios");

export async function DataRequest(param) {
  return await axios({
    method: param.method, //put
    url: param.url,
    timeout: 1000 * 60 * 2,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },

    data: param.data,
  });
}
