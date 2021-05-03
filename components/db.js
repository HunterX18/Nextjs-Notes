const mongoose = require("mongoose");

// const connect = () => {
// 	if (mongoose.connection.readyState == 1) return;
// 	mongoose
// 		.connect(
// 			"mongodb+srv://me:me@cluster0.jskqd.mongodb.net/NOTES?retryWrites=true&w=majority",
// 			{ useNewUrlParser: true, useUnifiedTopology: true }
// 		)
// 		.then((result) => {
// 			console.log("connected to db");
// 			return { connected: result };
// 		})
// 		.catch((err) => {
// 			return { error: err };
// 		});
// };

const connection = {};

const connect = async () => {
	if (connection.isConnected) return;
	const db = await mongoose.connect(
		"mongodb+srv://me:me@cluster0.jskqd.mongodb.net/NOTES?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	);
	connection.isConnected = db.connection.readyState;
	console.log("connected");
};

export default connect;
