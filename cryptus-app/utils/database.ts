import {connect, MongoClient} from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function connect_to_db() {
    if(!client.isConnected()) await client.connect();
    const db = client.db("leads");
    return {db, client};
}

export {connect_to_db};