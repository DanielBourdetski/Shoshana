import { Opt, OptNoErr, optErrNon, optOk } from "./optionals"
import { MongoClient, ServerApiVersion } from "mongodb"

export type AdminUser = {
    id: string,
    username: string,
    password: string
}

let client : MongoClient;

export async function loadDB(url: string) : Promise<void> {

    console.log("connecting to mongoDB");

    client = new MongoClient(url);

    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export function getAdminByUsername(username: string) : OptNoErr<AdminUser> {

    return optErrNon();
    
}