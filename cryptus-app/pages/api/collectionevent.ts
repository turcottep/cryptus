import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import notification from "./notification";
import webPush from 'web-push';

webPush.setVapidDetails(
  "mailto:val@karpov.io",
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.WEB_PUSH_PRIVATE_KEY
);

// Go trough 'day' table, if someone higher than 100 ETH call POST to notifs backend.
const boredapecontract_table = 'xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d_day'

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();
    let users;
      users = await prisma.user.findMany({
        where: {
          NOT : [{subscription: undefined}],
        },
        select : {subscription:true, username:true}
      });
    if (users){
      users.forEach(elem => {
        if (elem.subscription!=""){
          console.log("trynna send a notif to this man :", elem);
          
          const parsed_sub = JSON.parse(elem.subscription) 
          webPush
          .sendNotification(
            parsed_sub,
            JSON.stringify({
              title: "Bored Ape went Crazy!!! :o",
              message: "Your web push notification is here!",
            })
          )
        }
      });
    }


    console.log("this man trying to be :", users);
      
    // console.log("Collection backend", collection);

    res.status(201);
    res.json(users);
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to find collection" });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
