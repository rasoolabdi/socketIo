const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function swaggerConfig(app) {
    const swaggerDcoument = swaggerJSDoc({
        swaggerDefinition: {
            openapi: "3.0.0",
            info: {
                title: "swagger socketIo",
                description: "swagger project socketIo",
                version: "1.0.2"
            },
            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: "http",
                        scheme: "bearer",
                        bearerFormat: "JWT"

                    }
                }
            },
            security: [{ BearerAuth: [] }]
        },
        apis: [process.cwd() + "/app/**/*.swagger.js"]
    });
    const swagger = swaggerUi.setup(swaggerDcoument , {});
    app.use("/swagger" , swaggerUi.serve , swagger);
};

module.exports = swaggerConfig;