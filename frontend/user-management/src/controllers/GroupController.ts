import { Group } from "@/types/Group";
import { RequestUtil } from "@/controllers/RequestUtil";
import { BaseController } from "@/controllers/BaseController";

const endpointBase = `${RequestUtil.getAPIUrl()}/api/group/`;

export class GroupController extends BaseController<Group> {

    constructor() {
        super(endpointBase);
    }

}
