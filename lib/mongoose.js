import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri =
      "mongodb+srv://personalemail8000:SirUPUcchBtIu3wM@skyshow.yqgndns.mongodb.net/ECOMERCE-Admin";
    return mongoose.connect(uri);
  }
}
