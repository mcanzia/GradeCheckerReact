import { Response, Request, NextFunction } from "express";
import Logger from "../util/logger";
import Role from "../models/Role";
import RoleRepository from "../repos/RoleRepository";

export default class RoleController {
    async getAllRoles(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Retrieving roles: " + response.locals.userAuth);
            const roleRepo = new RoleRepository();
            const roles: Role[] = await roleRepo.getAllRoles();

            Logger.info("Number of roles retrieved successfully: " + roles.length);
            response.status(200).json(roles);
        } catch (error) {
            Logger.error(
                "Error retrieving roles " + response.locals.userAuth + ": " + error
            );
            response.status(500).send(error);
        }
    }

    async getRoleById(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Retrieving role: " + response.locals.userAuth);
            const roleRepo = new RoleRepository();
            const roleId: string = request.params.roleId;
            const role = await roleRepo.getRoleById(roleId);

            if (!role) {
                response.status(404).send("Role not found");
                return;
            }

            Logger.info("Role retrieved successfully: " + JSON.stringify(role));
            response.status(200).json(role);
        } catch (error) {
            Logger.error(
                "Error retrieving role " + response.locals.userAuth + ": " + error
            );
            response.status(500).send(error);
        }
    }

    async saveRole(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Saving role: " + response.locals.userAuth);
            Logger.info("Request body: " + JSON.stringify(request.body));

            const roleRepo = new RoleRepository();
            const { name } = request.body; // expect { "name": "Admin" }
            const role = await roleRepo.saveRole(name);

            Logger.info("Successfully created role: " + JSON.stringify(role));
            response.status(201).json(role);
        } catch (error) {
            Logger.error(
                "Error saving role " + response.locals.userAuth + ": " + error
            );
            response.status(500).send(error);
        }
    }

    async deleteRole(request: Request, response: Response, next: NextFunction) {
        try {
            Logger.info("Deleting role: " + response.locals.userAuth);
            const roleRepo = new RoleRepository();
            const roleId: string = request.params.roleId;

            await roleRepo.deleteRole(roleId);
            Logger.info("Successfully deleted role: " + roleId);
            response.status(200).send("Success");
        } catch (error) {
            Logger.error(
                "Error deleting role " + response.locals.userAuth + ": " + error
            );
            response.status(500).send(error);
        }
    }
}
