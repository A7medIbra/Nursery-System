const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Mini Blog API",
            description:
                "API endpoints for a mini blog services documented on swagger",
            contact: {
                name: "Desmond Obisi",
                email: "info@miniblog.com",
                url: "https://github.com/DesmondSanctity/node-js-swagger",
            },
            version: "1.0.0",
        },
    },
    apis: ["./Route/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = (app, port) => {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
};