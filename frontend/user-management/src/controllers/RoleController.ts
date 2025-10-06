import { Role } from "@/types/Role";
import { RequestUtil } from "@/controllers/RequestUtil";
import { BaseController } from "@/controllers/BaseController";

const endpointBase = `${RequestUtil.getAPIUrl()}/api/role/`;

export class RoleController extends BaseController<Role> {

    constructor() {
        super(endpointBase);
    }

}
