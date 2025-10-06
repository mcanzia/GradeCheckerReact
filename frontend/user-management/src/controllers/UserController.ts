import { User } from "@/types/User";
import { RequestUtil } from "@/controllers/RequestUtil";
import { BaseController } from "@/controllers/BaseController";

const endpointBase = `${RequestUtil.getAPIUrl()}/api/user/`;

export class UserController extends BaseController<User> {

    constructor() {
        super(endpointBase);
    }

}
