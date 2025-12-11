"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = require("./graphql/resolvers");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create Express server
const app = (0, express_1.default)();
// Create Apollo server
const apolloServer = new server_1.ApolloServer({
    typeDefs: typeDefs_1.typeDefs,
    resolvers: resolvers_1.resolvers
});
// Start Server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        const MONGO_URI = process.env.MONGO_URI;
        yield mongoose_1.default.connect(MONGO_URI, { dbName: 'my_store' });
        console.log("Connected to MongoDB");
        // Apollo Server
        yield apolloServer.start();
        // Unified middleware
        app.use("/graphql", (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(apolloServer));
        // Express Server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}/graphql`);
        });
    }
    catch (err) {
        console.error(err);
        throw new Error("Error starting server");
    }
});
startServer();
