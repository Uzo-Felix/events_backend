"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const user_controller_1 = require("../Controllers/user.controller");
const router = (0, express_1.Router)();
/*@GET /user/
 * This route should
 */
router.get('/settings', auth_middleware_1.default, user_controller_1.getUserPreference);
/*@POST /groups
 * This route should
 */
router.post('/settings', auth_middleware_1.default, user_controller_1.updateUserPreference);
exports.default = router;
//# sourceMappingURL=user.routes.js.map