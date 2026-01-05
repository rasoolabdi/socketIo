const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const { config } = require("dotenv");
config();

async function AuthGuard(req , res , next) {
    try {
        const authorization = req?.headers?.authorization ?? undefined;
        if(!authorization) {
            throw createHttpError.Unauthorized("کوکی شما نامعتبر می باشد")
        }
        const [Bearer , token] = authorization.split(" ");
        if(!Bearer || Bearer !== "Bearer") {
            throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
        };
        const verified = JWT.verify(token , process.env.ACCESS_TOKEN_SECRET_KEY);
        if(verified?.userId) {
           const user = await UserModel.findById(verified?.userId) ;
           if(!user) {
            throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
           };
           req.user = user;
           next();
        }
    }
    catch(error) {
        next(error);
    }
};
module.exports = {
    AuthGuard
}