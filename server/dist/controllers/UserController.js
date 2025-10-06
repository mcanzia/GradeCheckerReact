"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../util/logger"));
const UserRepository_1 = __importDefault(require("../repos/UserRepository"));
class UserController {
    async getAllUsers(request, response, next) {
        try {
            logger_1.default.info("Retrieving Users: " + response.locals.userAuth);
            const userRepo = new UserRepository_1.default();
            const userAuth = response.locals.userAuth;
            const users = await userRepo.getAllUsers();
            logger_1.default.info("Number of Users retrieved successfully: " + users.length);
            response.status(200).json(JSON.stringify(users));
        }
        catch (error) {
            logger_1.default.error("Error retrieving users " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async getUserById(request, response, next) {
        try {
            logger_1.default.info("Retrieving user: " + response.locals.userAuth);
            const userRepo = new UserRepository_1.default();
            const userAuth = response.locals.userAuth;
            const userId = request.params.userId;
            const user = await userRepo.getUserById(userId);
            logger_1.default.info("User retrieved successfully: " + JSON.stringify(user));
            response.status(200).json(JSON.stringify(user));
        }
        catch (error) {
            logger_1.default.error("Error retrieving user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async saveUsers(request, response, next) {
        try {
            logger_1.default.info("Saving User: " + response.locals.userAuth);
            logger_1.default.info("Users: " + JSON.stringify(request.body));
            const userRepo = new UserRepository_1.default();
            const userAuth = response.locals.userAuth;
            const user = request.body;
            await userRepo.addUser(user);
            logger_1.default.info("Successfully added Users");
            response.status(200).send('Success');
        }
        catch (error) {
            logger_1.default.error("Error adding Users " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async deleteUser(request, response, next) {
        try {
            logger_1.default.info("Deleting Users: " + response.locals.userAuth);
            logger_1.default.info("Users: " + JSON.stringify(request.body));
            const userRepo = new UserRepository_1.default();
            const userAuth = response.locals.userAuth;
            const user = request.body;
            await userRepo.deleteUser(user);
            logger_1.default.info("Successfully deleted user");
            response.status(200).send("Success");
        }
        catch (error) {
            logger_1.default.error("Error deleting users " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
}
exports.default = UserController;
