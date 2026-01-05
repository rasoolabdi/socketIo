const cookieParser = require("cookie-parser");
const Controller = require("../Controller");
const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");
const UserModel = require("../models/user.model");
const {randomInt} = require("crypto");
const {StatusCodes: HttpStatus} = require("http-status-codes");

class ChatController extends Controller {
    constructor() {
        super();
    }

    renderChatRoom(req , res , next) {
        try {
            return res.render("chat.ejs");
        }
        catch(error) {
            next(error);
        }
    }

    loginForm(req , res , next) {
        try {
            return res.render("login.ejs" , {
                error: undefined,
                data: undefined
            });
        }
        catch(error) {
            next(error);
        }
    }

    async login(req , res , next) {
        try {
            const {mobile} = req.body;
            const user = await UserModel.findOne({mobile});
            const now = new Date().getTime();
            const otp = {
                code : randomInt(100000 , 999999),
                expiresIn: now + (1000 * 60 * 2)
            }
            
            if(user?.otp?.expiresIn > now) {
                throw createHttpError.BadRequest("otp code not expired")
            }
            if(!user) {
                await UserModel.create({
                    mobile,
                    otp
                });
                return res.render("login.ejs" , {
                    data: "ثبت نام کاربر با موفقیت انجام شد"
                })
            }
            
            
            const {accessToken , refreshToken} = await this.generateToken({userId: user._id});
            const cookieOptions = {
                httpOnly: true,
                signed: true,
                sameSite: "lax",
                domain: process.env.DOMAIN
            }
            
            res.cookie("accessTokenSocketIo" , accessToken , cookieOptions);
            res.cookie("refreshTokenSocketIo" , refreshToken , cookieOptions);
            
            user.otp = otp;
            await user.save();

            return res.render("login.ejs" , {
                data: "کد تایید ارسال شد"
            })
        }
        catch(error) {
            console.log(error);
            next(error);
        }
    }

    async generateToken(payload) {
        const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
        const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

        const accessToken = JWT.sign(payload , ACCESS_TOKEN_SECRET_KEY , {
            expiresIn: "1d"
        });
        const refreshToken = JWT.sign(payload , REFRESH_TOKEN_SECRET_KEY , {
            expiresIn: "30d"
        });
        return {accessToken , refreshToken};
    };

    async verifyRefreshToken(req , res , next) {
        try {
            const refreshToken = req.signedCookies["refreshTokenSocketIo"];
            const token = cookieParser.signedCookie(refreshToken , process.env.REFRESH_TOKEN_SECRET_KEY);
            if(!token) {
                throw createHttpError.BadRequest("لطفا وارد حساب کاربری خود شوید")
            }
            const verified = JWT.verify(token , process.env.REFRESH_TOKEN_SECRET_KEY);
            if(verified?.userId) {
                const user = await UserModel.findById(verified?.userId);
                if(!user) {
                    throw createHttpError.BadRequest("کاربری یافت نشد")
                };
                const {accessToken , refreshToken} = await this.generateToken({userId: user._id});
                return res.json({
                    accessToken,
                    refreshToken
                })
            }
        }
        catch(error) {
            next(error);
        }
    }
};

module.exports = new ChatController();