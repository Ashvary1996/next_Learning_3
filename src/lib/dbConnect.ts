import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already Connected to database");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");

    connection.isConnected = db.connections[0].readyState;

    console.log("connection", connection);
    console.log("DB Connected Successfully");
  } catch (error) {
    console.log("DB Connection Failed", error);
    process.exit(1);
  }
}
export default dbConnect;
