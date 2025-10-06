import { Response, Request, NextFunction } from "express";
import Logger from "../util/logger";
import User from "../models/User";
import UserRepository from "../repos/UserRepository";

export default class UserController {
    async getAllUsers(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Retrieving Users: " + response.locals.userAuth);
            const userRepo: UserRepository = new UserRepository();
            const users: Array<User> = await userRepo.getAllUsers();
            Logger.info("Number of Users retrieved successfully: " + users.length);
            response.status(200).json(JSON.stringify(users));
        } catch (error) {
            Logger.error("Error retrieving users " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async getUserById(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Retrieving user: " + response.locals.userAuth);
            const userRepo: UserRepository = new UserRepository();
            const userId: string = request.params.userId;
            const user = await userRepo.getUserById(userId);
            Logger.info("User retrieved successfully: " + JSON.stringify(user));
            response.status(200).json(JSON.stringify(user));
        } catch (error) {
            Logger.error("Error retrieving user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async saveUser(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Saving User: " + response.locals.userAuth);
            Logger.info("Users: " + JSON.stringify(request.body));
            const userRepo: UserRepository = new UserRepository();
            const user: User = request.body;
            await userRepo.saveUser(user);
            Logger.info("Successfully added Users");
            response.status(200).send('Success');
        } catch (error) {
            Logger.error("Error adding Users " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async deleteUser(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Deleting Users: " + response.locals.userAuth);
            Logger.info("Users: " + JSON.stringify(request.body));
            const userRepo: UserRepository = new UserRepository();
            const user: User = request.body;
            await userRepo.deleteUser(user);
            Logger.info("Successfully deleted user");
            response.status(200).send("Success");
        } catch (error) {
            Logger.error("Error deleting users " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
}