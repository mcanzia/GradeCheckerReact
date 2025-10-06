import { Response, Request, NextFunction } from "express";
import Logger from "../util/logger";
import Group from "../models/Group";
import GroupRepository from "../repos/GroupRepository";

export default class GroupController {
    async getAllGroups(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Retrieving groups: " + response.locals.userAuth);
            const groupRepo = new GroupRepository();
            const groups: Group[] = await groupRepo.getAllGroups();
            Logger.info("Number of groups retrieved successfully: " + groups.length);
            response.status(200).json(groups);
        } catch (error) {
            Logger.error(
                "Error retrieving groups " + response.locals.userAuth + ": " + error
            );
            response.status(500).send(error);
        }
    }

    async getGroupById(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Retrieving group: " + response.locals.userAuth);
            const groupRepo = new GroupRepository();
            const groupId: string = request.params.groupId;
            const group = await groupRepo.getGroupById(groupId);

            if (!group) {
                response.status(404).send("Group not found");
                return;
            }

            Logger.info("Group retrieved successfully: " + JSON.stringify(group));
            response.status(200).json(group);
        } catch (error) {
            Logger.error(
                "Error retrieving group " + response.locals.userAuth + ": " + error
            );
            response.status(500).send(error);
        }
    }

    async saveGroup(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Saving group: " + response.locals.userAuth);
            Logger.info("Request body: " + JSON.stringify(request.body));

            const groupRepo = new GroupRepository();
            const { name } = request.body;
            const group = await groupRepo.saveGroup(name);

            Logger.info("Successfully created group: " + JSON.stringify(group));
            response.status(201).json(group);
        } catch (error) {
            Logger.error(
                "Error saving group " + response.locals.userAuth + ": " + error
            );
            response.status(500).send(error);
        }
    }

    async deleteGroup(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Deleting group: " + response.locals.userAuth);
            const groupRepo = new GroupRepository();
            const groupId: string = request.params.groupId;

            await groupRepo.deleteGroup(groupId);
            Logger.info("Successfully deleted group: " + groupId);
            response.status(200).send("Success");
        } catch (error) {
            Logger.error(
                "Error deleting group " + response.locals.userAuth + ": " + error
            );
            response.status(500).send(error);
        }
    }

    async addUserToGroup(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Adding user to group: " + response.locals.userAuth);
            const groupRepo = new GroupRepository();
            const { groupId, userId } = request.body;

            await groupRepo.addUserToGroup(groupId, userId);
            Logger.info(`Successfully added user ${userId} to group ${groupId}`);
            response.status(200).send("Success");
        } catch (error) {
            Logger.error(
                "Error adding user to group " + response.locals.userAuth + ": " + error
            );
            response.status(500).send(error);
        }
    }

    async removeUserFromGroup(
        request: Request,
        response: Response,
        next: NextFunction
    ) {
        try {
            Logger.info("Removing user from group: " + response.locals.userAuth);
            const groupRepo = new GroupRepository();
            const { userId } = request.body;

            await groupRepo.removeUserFromGroup(userId);
            Logger.info(`Successfully removed user ${userId} from group`);
            response.status(200).send("Success");
        } catch (error) {
            Logger.error(
                "Error removing user from group " +
                response.locals.userAuth +
                ": " +
                error
            );
            response.status(500).send(error);
        }
    }
}
