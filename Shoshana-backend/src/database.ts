import { Option, none, some, ResolvedPromise } from "topkek-utils";
import {
  Document,
  MongoClient,
  ObjectId,
  ServerApiVersion,
  WithId,
} from "mongodb";
import { UserType } from "./types";

export type User = WithId<{
  username: string;
  password: string;
  userType: UserType
}>;

let dbName = "test";
let collectionUsers = "users";

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

export async function getUserByUsername(
  username: string
): ResolvedPromise<Option<User>> {
  let res = await (client
    .db(dbName)
    .collection(collectionUsers)
    .findOne({ username }) as Promise<User | null>);
  return res ? some(res) : none(undefined);
}

export async function registerUser(
  username: string,
  password: string,
  userType: UserType
): ResolvedPromise<Option<ObjectId>> {
  //cheching if user with same username already exists
  let existingUser = await getUserByUsername(username);

  if (existingUser.ok) {
    return none(undefined);
  }

  // inserting new user
  let res = await client
    .db(dbName)
    .collection(collectionUsers)
    .insertOne({ username, password, userType });

  return some(res.insertedId);
}
