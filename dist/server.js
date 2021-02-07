"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_graphql_1 = __importDefault(require("express-graphql"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = __importDefault(require("./schema/schema"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
const MONGO_URI = "mongodb+srv://sergebasangovs:calvi187439@@cluster0-lknea.mongodb.net/test?retryWrites=true&w=majority";
const app = express_1.default();
// allow CORS cross-origin requests:
app.use(cors_1.default());
const port = process.env.PORT || 4000; // when we deploy on heroku - it sets PORT env variable for us.
mongoose_1.default.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose_1.default.connection.once("open", () => {
    console.log("connected to database.");
});
// run react-app from server in production mode:
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(__dirname, "client/build")));
    //for every/all incoming get requests: serve react app index.html
    app.get("*", (req, res) => {
        res.sendFile(path_1.default.join(__dirname, "client/build", "index.html"));
    });
}
// hookup GraphQL server:
app.use("/graphql", express_graphql_1.default({
    schema: schema_1.default,
    graphiql: true,
}));
// error handling:
app.use((error, req, res) => {
    res.status(500).json({ message: error.message });
});
app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});
