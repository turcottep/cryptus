import { connect } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connect_to_db } from "../../../utils/database";

export default async function (req:NextApiRequest, res: NextApiResponse){
    try{
        const {db} = await connect_to_db()
        const result = await db.collection("leads").insertOne({
            email: req.body.email,
            createdAt: new Date(),
        });
        // console.log(result.ops[0]);
        res.status(201);
        res.json({});
    } catch(e){
        res.status(500);
        res.json({error: "Unable to add lead"})
    }

} 