/**
 * One-time migration: prices used to be stored in shekels (e.g. 17.7),
 * now they are stored as whole agorot (1770). Run once per database:
 *
 *   node scripts/migrate-prices-to-agorot.js
 *
 * It records that it ran (collection "migrations"), so running it again does nothing.
 */
require("dotenv").config();
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/budget-tracker";
const NAME = "prices-to-agorot";

(async () => {
    await mongoose.connect(MONGODB_URI);
    const db = mongoose.connection.db;
    if (await db.collection("migrations").findOne({ name: NAME })) {
        console.log("Already migrated.");
    } else {
        const result = await db
            .collection("expenses")
            .updateMany({}, [{ $set: { price: { $round: [{ $multiply: ["$price", 100] }, 0] } } }]);
        await db.collection("migrations").insertOne({ name: NAME, ranAt: new Date() });
        console.log(`Converted ${result.modifiedCount} expenses to agorot.`);
    }
    await mongoose.disconnect();
})().catch((err) => {
    console.error(err);
    process.exit(1);
});
