const express = require("express");
const graphqlHTTP = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const cors = require("cors");
const MONGO_URI =
	"mongodb+srv://sergebasangovs:calvi187439@@cluster0-lknea.mongodb.net/test?retryWrites=true&w=majority";
const app = express();

// allow CORS cross-origin requests:
app.use(cors());

mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
	console.log("connected to database.");
});

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(4000, () => {
	console.log("Server listening on http://localhost:4000");
});
