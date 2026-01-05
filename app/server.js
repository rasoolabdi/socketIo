const { default: mongoose } = require("mongoose");
const express = require("express");
const { config } = require("dotenv");
config();
const cors = require("cors");
const ExpressEjsLayout = require("express-ejs-layouts");
const { MainRouterApi } = require("./router/MainRouters");
const createHttpError = require("http-errors");
const path = require("path");
const swaggerConfig = require("./config/swagger.config");
const http = require("http");
const { initialSocket } = require("./utils/initSocket");
const { socketHandler } = require("./TCP/socket.io");
const cookieParser = require("cookie-parser");


class Application {
    #app = express();

    constructor() {
        this.configApplication();
        this.initTemplateEngin();
        this.configMongoose();
        this.configRouter();
        this.createServer();
        this.ErrorHandling();
    }

    configApplication() {
        this.#app.use(cors());
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname , ".." , "public")));
        this.#app.use(cookieParser(process.env.COOKIE_PARSER_SECRET_KEY));
        swaggerConfig(this.#app);
    }

    configMongoose() {
        mongoose.connect(process.env.MongooseURI).then(() => {
            console.log("Connected To DB")
        }).catch((error) => {
            console.log("Can Not Connect To DB" , error)
        })
    }

    initTemplateEngin() {
        this.#app.use(ExpressEjsLayout);
        this.#app.set("view engine" , "ejs");
        this.#app.set("views" , "resource/views");
        this.#app.set("layout extractStyles" , true);
        this.#app.set("layout extractScripts" , true);
        this.#app.set("layout" , "./layouts/master");
    }

    configRouter() {
        this.#app.use(MainRouterApi)
    }

    ErrorHandling() {
        this.#app.use((req , res , next) => {
            next(createHttpError.NotFound("صفحه مورد نظر شما یافت نشد"))
        });


        this.#app.use((error , req , res , next) => {
            const serverError = createHttpError.InternalServerError("خطای سمت سرور رخ داده است");
            const StatusError = error.status || 500;
            const MessageError = error.message || serverError;

            return res.status(StatusError).json({
                StatusError,
                MessageError
            })
        })
    }

    createServer() {
        const PORT = process.env.PORT;
        const server = http.createServer(this.#app);
        const io = initialSocket(server);
        socketHandler(io);
        server.listen(PORT , () => {
            console.log(`Application Running on http://localhost:${PORT}`)
        })
    }

}

module.exports = Application;