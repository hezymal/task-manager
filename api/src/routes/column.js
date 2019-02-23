const ObjectID = require("mongodb").ObjectID;
const { dbKey } = require("../constants/appKeys");
const { columnsKey } = require("../constants/documentsKeys");

async function add(req, res) {
    const db = req.app.get(dbKey);
    const columns = db.collection(columnsKey);
    const column = req.body;
    
    const { insertedId } = await columns.insertOne(column);
    const payload = { ...column, id: insertedId };

    res.json({
        payload, 
        error: false,
    });
}

async function modify(req, res) {
    const db = req.app.get(dbKey);
    const columns = db.collection(columnsKey);
    const column = req.body;
    const columnId = ObjectID(column._id);
    
    await columns.updateOne(
        { _id: columnId }, 
        { $set: { ...column, _id: columnId } }
    );
    
    res.json({
        payload: column, 
        error: false,
    });
}

async function list(req, res) {
    const db = req.app.get(dbKey);
    const columns = db.collection(columnsKey);
    
    const payload = await columns.find({}).toArray();

    res.json({
        payload, 
        error: false,
    });
}

async function remove(req, res) {
    const columnId = req.params.id;
    const db = req.app.get(dbKey);
    const columns = db.collection(columnsKey);

    await columns.deleteOne(
        { _id: ObjectID(columnId) }
    );
    
    res.json({
        payload: columnId,
        error: false,
    });
}

exports.add = add;
exports.modify = modify;
exports.list = list;
exports.remove = remove;
