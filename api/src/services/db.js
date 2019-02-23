const MongoClient = require('mongodb').MongoClient;
const { dbClientKey, dbKey, configKey } = require("../constants/appKeys");

async function create(app) {
    const config = app.get(configKey);
    const client = await MongoClient.connect(config.db.url);
    const db = client.db(config.db.name);

    app.set(dbClientKey, client);
    app.set(dbKey, db);
}

exports.create = create;
