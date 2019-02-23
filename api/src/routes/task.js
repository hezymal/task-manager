const ObjectID = require("mongodb").ObjectID;
const { dbKey } = require("../constants/appKeys");
const { tasksKey } = require("../constants/documentsKeys");

async function add(req, res) {
    const db = req.app.get(dbKey);
    const tasks = db.collection(tasksKey);
    const newTask = req.body;
    
    const { insertedId } = await tasks.insertOne(newTask);
    const payload = { ...newTask, id: insertedId };

    res.json({
        payload, 
        error: false,
    });
}

async function modify(req, res) {
    const db = req.app.get(dbKey);
    const tasks = db.collection(tasksKey);
    const task = req.body;
    const taskId = ObjectID(task._id);
    
    await tasks.updateOne(
        { _id: taskId }, 
        { $set: { ...task, _id: taskId } }
    );
    
    res.json({
        payload: task, 
        error: false,
    });
}

async function list(req, res) {
    const db = req.app.get(dbKey);
    const tasks = db.collection(tasksKey);
    
    const payload = await tasks.find({}).toArray();

    res.json({
        payload, 
        error: false,
    });
}

async function remove(req, res) {
    const taskId = req.params.id;
    const db = req.app.get(dbKey);
    const tasks = db.collection(tasksKey);

    await tasks.deleteOne({ _id: ObjectID(taskId) });
    
    res.json({
        payload: taskId,
        error: false,
    });
}

exports.add = add;
exports.modify = modify;
exports.list = list;
exports.remove = remove;
