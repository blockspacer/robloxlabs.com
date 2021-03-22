"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const UserModelBuildersClubMembershipTypeEnum_1 = require("./UserModelBuildersClubMembershipTypeEnum");
class User {
    static GetByUserId(Id) {
        const user = new User();
        user.Id = Id;
        user.Name = 'Test';
        user.DisplayName = 'Test';
        user.MembershipType = UserModelBuildersClubMembershipTypeEnum_1.UserModelBuildersClubMembershipTypeEnum.None;
        return user;
    }
}
exports.User = User;
