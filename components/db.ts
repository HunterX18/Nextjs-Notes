const mongoose = require("mongoose");

const connect = () => {
	if (mongoose.connections[0].readyState) return;
	mongoose
		.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
		})
		.then(() => console.log("connected"))
		.catch((err: any) => console.log(err));
};

export default connect;
