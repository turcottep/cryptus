import { NextApiRequest, NextApiResponse } from "next";
import { connect_to_db } from "../../../utils/database";

export default async function (req:NextApiRequest, res:NextApiResponse){
    try {
        const {db} = await connect_to_db();
        const leads = await db.collection("leads").find().toArray();
        console.log(leads);
        res.json({leads})
    } catch (error) {
        res.status(500);
        res.json({error:"unable to fetch leads"})
    }
} 