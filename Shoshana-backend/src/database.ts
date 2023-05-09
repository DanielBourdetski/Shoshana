import { Option, none, some, ResolvedPromise } from "topkek-utils";
import { MongoClient, ObjectId, WithoutId } from "mongodb";
import { Appointment, Business, User, UserType } from "./types";

let dbName = "test";
let collectionUsers = "users";
let collectionBusinesses = "businesses";
let collectionImages = "images";

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

	if (existingUser.ok) return none(undefined);

	// inserting new user
	let res = await client
		.db(dbName)
		.collection(collectionUsers)
		.insertOne({ username, password, userType });

	return some(res.insertedId);
}

export async function deleteUser(userId: ObjectId): ResolvedPromise<boolean> {
	let res = await client
		.db(dbName)
		.collection(collectionUsers)
		.deleteOne({ _id: userId });

	return res.acknowledged && res.deletedCount === 1;
}

export async function getBussinessByOwnerId(
	id: ObjectId
): ResolvedPromise<Option<Business>> {
	let res = await client
		.db(dbName)
		.collection(collectionBusinesses)
		.findOne({ ownerId: id }, { projection: { appointments: 0 } });

	if (res != null) {
		return some(res as Business);
	} else {
		return none(undefined);
	}
}

export async function createBusiness(
	business: WithoutId<Business>
): ResolvedPromise<Option<ObjectId>> {
	let res = await client
		.db(dbName)
		.collection(collectionBusinesses)
		.insertOne(business);

	if (res.acknowledged) {
		return some(res.insertedId);
	} else {
		return none(undefined);
	}
}

export async function createImage(
	imageData: Uint8Array
): ResolvedPromise<Option<ObjectId>> {
	let res = await client
		.db(dbName)
		.collection(collectionImages)
		.insertOne({ data: imageData });

	if (res.acknowledged) {
		return some(res.insertedId);
	} else {
		return none(undefined);
	}
}

export async function deleteImage(imageId: ObjectId): ResolvedPromise<boolean> {
	let res = await client
		.db(dbName)
		.collection(collectionImages)
		.deleteOne({ _id: imageId });

	return res.acknowledged && res.deletedCount === 1;
}

// export async function createAppointment(businessId : ObjectId, appointment : WithoutId<Appointment>) : ResolvedPromise<Option<ObjectId>>
// {

//   let field = appointment.date.year + "_" + appointment.date.month;

//   let res = await client.db(dbName).collection(collectionBusinesses)
//   .updateOne({_id: businessId}, { appointments : { $push : { field: appointment }  } });

//   return some(res.upsertedId);
// }
