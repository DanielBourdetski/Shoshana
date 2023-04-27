import { Option, none, some, ResolvedPromise } from "topkek-utils";
import {
  Document,
  MongoClient,
  ObjectId,
  ServerApiVersion,
  WithId,
} from "mongodb";

export type AdminUser = WithId<{
  username: string;
  password: string;
}>;

let dbName = "test";
let collectionAdmins = "admins";

let client: MongoClient;

export async function loadDB(url: string): Promise<void> {
  //console.log("connecting to mongoDB");

  client = new MongoClient(url);

  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}

export async function getAdminByUsername(
  username: string
): ResolvedPromise<Option<AdminUser>> {
  let res = await (client
    .db(dbName)
    .collection(collectionAdmins)
    .findOne({ username }) as Promise<AdminUser | null>);
  return res ? some(res) : none(undefined);
}

export async function registerAdmin(
  username: string,
  password: string
): ResolvedPromise<Option<ObjectId>> {
  //cheching if user with same username already exists
  let existingUser = await getAdminByUsername(username);

  if (existingUser.ok) {
    return none(undefined);
  }

  // inserting new user
  let res = await client
    .db(dbName)
    .collection(collectionAdmins)
    .insertOne({ username, password });

  return some(res.insertedId);
}
