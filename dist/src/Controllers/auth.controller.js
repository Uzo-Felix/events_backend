"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitterAuthCallback = exports.callback = exports.logout = exports.twitterAuth = exports.googleAuth = void 0;
const client_1 = require("@prisma/client");
const google_config_1 = require("../config/google.config");
const utils_1 = require("../utils");
const passport_1 = __importDefault(require("passport"));
const prisma = new client_1.PrismaClient();
const googleAuth = (req, res) => {
    res.redirect(google_config_1.authUrl);
};
exports.googleAuth = googleAuth;
const callback = async (req, res) => {
    const code = req.query.code;
    // console.log('Authorization Code:', code);
    try {
        const { tokens } = await google_config_1.oauth2Client.getToken(code);
        google_config_1.oauth2Client.setCredentials(tokens);
        const oauth2 = google_config_1.google.oauth2({ version: 'v2', auth: google_config_1.oauth2Client });
        const { data } = await oauth2.userinfo.get();
        const userExists = await prisma.user.findFirst({
            where: {
                auth_id: data.id,
            },
        });
        if (!userExists) {
            const newUser = await prisma.user.create({
                data: {
                    auth_method: 'google',
                    auth_id: data.id,
                    email: data.email ? data.email : null,
                    username: data.name,
                    avatar: data.picture,
                },
            });
            // generate accessToken
            const token = (0, utils_1.generateToken)(newUser.id);
            // return token
            res.status(201).json({
                statusCode: 201,
                message: 'Account created successfully',
                token,
                user: {
                    id: newUser.id,
                    email: newUser.email,
                    username: newUser.username,
                    avatar: newUser.avatar,
                },
            });
        }
        else {
            // generate access token
            const token = (0, utils_1.generateToken)(userExists.id);
            // return token
            res.status(200).json({
                statusCode: 200,
                message: 'Login successful',
                token,
                user: {
                    id: userExists.id,
                    email: userExists.email,
                    username: userExists.username,
                    avatar: userExists.avatar,
                },
            });
        }
    }
    catch (error) {
        console.error('Authentication error:', error);
        res.status(500).send('Invalid credentials');
    }
    finally {
        // Close the Prisma client at the end of the function
        prisma.$disconnect();
    }
};
exports.callback = callback;
const twitterAuth = (req, res) => {
    // start the twitter authentication flow
    passport_1.default.authenticate('twitter');
};
exports.twitterAuth = twitterAuth;
// controller function to handle the twitter callback
const twitterAuthCallback = (req, res) => {
    passport_1.default.authenticate('twitter', (err, user) => {
        if (err) {
            // Handle authentication errors
            return res.status(500).json({ error: 'Authentication error' });
        }
        if (!user) {
            // Authentication failed
            return res.status(401).json({ error: 'Authentication failed' });
        }
        // Authentication succeeded
        const accessToken = (0, utils_1.generateToken)(user.id);
        res.status(200).json({ user, accessToken });
    })(req, res);
};
exports.twitterAuthCallback = twitterAuthCallback;
const logout = (req, res) => {
    // req.logout();
    res.status(200).json({});
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map