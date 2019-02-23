const express = require('express');
const bodyParser = require('body-parser');
const routes = require("./routes");
const config = require("./config.json");
const db = require("./services/db");

async function run() {
    const app = express();

    app.use(bodyParser.json());
    app.set("api config", config);

    routes.bind(app);
    await db.create(app);

    app.listen(config.server.port, () => {
        console.log(`Service "api" listening on port: ${config.server.port}`);
    });
}

run().catch(err => console.error(err));
