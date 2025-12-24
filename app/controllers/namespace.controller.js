const createHttpError = require("http-errors");
const Controller = require("../Controller");
const ConversationModel = require("../models/conversation");
const {StatusCodes: HttpStatus} = require("http-status-codes");

class NameSpaceController extends Controller {
    async addNameSpace(req , res , next) {
        try {
            const {title , endpoint} = req.body;
            await this.existsNamespaceWithEndpoint(endpoint);
            await ConversationModel.create({title , endpoint});
            return res.status(HttpStatus.CREATED).json({
                statuCodes: HttpStatus.CREATED,
                data: {
                    message: "فضای مکالمه با موفقیت ایجاد شد"
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async getListOfNameSpaces(req ,res , next) {
        try {
            const namespaces = await ConversationModel.find({} , {rooms: 0});
            if(!namespaces) {
                throw createHttpError.NotFound("فضای مکالمه ایی پیدا نشد")
            };

            return res.status(HttpStatus.OK).json({
                statuCodes: HttpStatus.OK,
                data: {
                    namespaces
                }
            })
        }
        catch(error) {
            next(error);
        }
    }

    async existsNamespaceWithEndpoint(endpoint) {
        const conversation = await ConversationModel.findOne({endpoint});
        if(conversation) {
            throw createHttpError.BadRequest("این اسم قبلا انتخاب شده است")
        }
    }

}

module.exports = new NameSpaceController();