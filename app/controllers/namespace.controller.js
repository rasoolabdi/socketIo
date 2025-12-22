const Controller = require("../Controller");
const ConversationModel = require("../models/conversation");
const {StatusCodes: HttpStatus} = require("http-status-codes");

class NameSpaceController extends Controller {
    async addNameSpace(req , res , next) {
        try {
            const {title , endpoint} = req.body;
            const conversation = await ConversationModel.create({title , endpoint});
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


}

module.exports = new NameSpaceController();