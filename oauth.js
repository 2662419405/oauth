const code = require("koa-router")();
const axios = require("axios");
const clientID = "f4f827cfbebe51a858b8";
const clientSecret = "886840688d944d5afd0da2e7be5b5f1d0758b1b2";

code.get("/github", async ctx => {
  const requestToken = ctx.request.query.code;
  const tokenResponse = await axios({
    method: "post",
    url:
      "https://github.com/login/oauth/access_token?" +
      `client_id=${clientID}&` +
      `client_secret=${clientSecret}&` +
      `code=${requestToken}`,
    headers: {
      accept: "application/json"
    }
  });

  const accessToken = tokenResponse.data.access_token;
  const result = await axios({
    method: "get",
    url: `https://api.github.com/user`,
    headers: {
      accept: "application/json",
      Authorization: `token ${accessToken}`
    }
  });
  ctx.response.redirect(
    `http://taro.shtodream.cn/pages/my/index?name=${result.data.name}&avatar=${result.data.avatar_url}&token=${accessToken}`
  );
});

module.exports = code.routes();
