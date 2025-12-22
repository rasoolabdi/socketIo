const createHttpError = require("http-errors");
const Controller = require("../Controller");
const ConversationModel = require("../models/conversation");
const {StatusCodes: HttpStatus} = require("http-status-codes")

class RoomController extends Controller {

    async addNewRoom(req , res , next) {
        try {
            const {title , endpoint} = req.body;
            const rooms = await ConversationModel.create({title , endpoint});
            if(!rooms) {
                throw createHttpError.BadRequest("محل گفتگو ایجاد نشد")
            }
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "محل گفتکو با موفقیت ایجاد شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    };

    async getAllRoom(req , res , next) {
        try {
            const rooms = await ConversationModel.find({});
            if(!rooms) {
                throw createHttpError.NotFound("هیچ گفتگویی یافت نشد")
            };
            return res.status(HttpStatus.OK).json({
                statusCode: HttpStatus.OK,
                data: {
                    rooms
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

};

module.exports = new RoomController();