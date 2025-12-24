const createHttpError = require("http-errors");
const Controller = require("../Controller");
const ConversationModel = require("../models/conversation");
const {StatusCodes: HttpStatus} = require("http-status-codes")
const path = require("path");

class RoomController extends Controller {

    async addNewRoom(req , res , next) {
        try {
            const {name , description , filename , fileUploadPath , namespace} = req.body;
            await this.findRoomWithName(name);
            await this.findConversationWithEndpoint(namespace);
            const image = path.join(fileUploadPath , filename).replace(/\\/g , "/");
            const room = {
                name,
                description,
                image
            }
            const conversation = await ConversationModel.updateOne({endpoint: namespace} , {
                $push: {rooms: room}
            });
            if(!conversation) {
                throw createHttpError.BadRequest("گروه ایجاد نشد")
            }
            return res.status(HttpStatus.CREATED).json({
                statusCode: HttpStatus.CREATED,
                data: {
                    message: "گروه با موفقیت ایجاد شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    };

    async getAllRoom(req , res , next) {
        try {
            const rooms = await ConversationModel.find({} , {rooms: 1});
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

    async findRoomWithName(name) {
        const conversation = await ConversationModel.findOne({"rooms.name": name});
        if(conversation) {
            throw createHttpError.BadRequest("این اسم برای room قبلا ثبت شده است")
        }
    }

    async findConversationWithEndpoint(endpoint) {
        const conversation = await ConversationModel.findOne({endpoint});
        if(!conversation) {
            throw createHttpError.NotFound("فضای مکالمه ایی یافت نشد")
        };
        return conversation;
    }
};

module.exports = new RoomController();