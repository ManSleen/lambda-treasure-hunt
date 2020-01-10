const axios = require("axios");

const axiosWithAuth = () => {
  return axios.create({
    headers: {
      Authorization: "Token e5d7abe25f73d4753b3c7e52dc06e05ae2b5c26b",
      "Content-Type": "text/json"
    },
    baseURL: "https://lambda-treasure-hunt.herokuapp.com/api/"
  });
};

module.exports = axiosWithAuth;
