const mongoose = require('mongoose');
const connectDB = async (MONGO_URL) => {
try {
await mongoose.connect(MONGO_URL, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
console.log('MongoDB connected');
} catch (err) {
console.error(err.message);
process.exit(1);
}
};
module.exports = connectDB;
// manjusivaa6634_db_user
// 0A7T4hvJadUqBMJg
// mongodb+srv://manjusivaa6634_db_user:0A7T4hvJadUqBMJg@billing.fpvq6cl.mongodb.net/?appName=billing