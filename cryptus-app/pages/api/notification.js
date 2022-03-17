const webPush = require("web-push");

webPush.setVapidDetails(
  "mailto:val@karpov.io",
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

export default (req, res) => {
  console.log("yo im trying");
  if (req.method == "POST") {
    const { subscription } = req.body;
    console.log("subscription", subscription);
    webPush
      .sendNotification(
        subscription,
        JSON.stringify({
          title: "Hello Web Push",
          message: "Your web push notification is here!",
        })
      )
      .then((response) => {
        console.log("yo im trying then writeHead ");
        res.writeHead(response.statusCode, response.headers).end(response.body);
      })
      .catch((err) => {
        if ("statusCode" in err) {
          console.log("yo im trying statusCode writeHead ");
          res.writeHead(err.statusCode, err.headers).end(err.body);
        } else {
          console.error(err);
          console.log("yo error ");
          res.statusCode = 500;
          res.end();
        }
      });
  } else {
    res.statusCode = 405;
    res.end();
  }
};
