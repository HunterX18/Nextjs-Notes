const mongoose = require("mongoose");
const { MONGO_URI } = require("../keys");

const connect = () => {
	if (mongoose.connections[0].readyState) return;
	mongoose
		.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
		})
		.then(() => console.log("connected"))
		.catch((err: any) => console.log(err));
};

export default connect;
