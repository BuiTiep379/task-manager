const Task = require("../models/task");
const asyncWrapper = require('../middleware/async')

const createTask = asyncWrapper(
    (req, res) => {
        const { name, completed } = req.body;
        const task = new Task({
            name, completed
        });
        task.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    msg: "Something went wrong!!!"
                })
            }
            if (data) {
                return res.status(201).json({
                    task: data
                })
            }
        })
    }
)

const getAllTasks = asyncWrapper(
    (req, res) => {
        Task.find()
            .exec((error, data) => {
                if (error) {
                    return res.status(400).json({
                        msg: "Something went wrong!!!"
                    })
                }
                if (data) {
                    const tasksList = data;
                    return res.status(201).json({
                        status: 'success',
                        data: {
                            tasks: tasksList,
                            nbHits: tasksList.length
                        }
                    })
                }
            })
    }
)

const getTask = asyncWrapper(
    (req, res) => {
        const id = req.params.id;
        Task.findOne({ _id: id })
            .exec((error, data) => {
                if (error) {
                    return res.status(400).json({
                        msg: `No task witd id: ${id}`
                    })
                }
                if (data) {
                    return res.status(201).json({
                        task: data
                    })
                }
            })
    }
)
const updateTask = asyncWrapper(
    (req, res) => {
        const id = req.params.id;
        Task.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
            runValidators: true
        })
            .exec((error, data) => {
                if (error) {
                    return res.status(400).json({
                        msg: `No task witd id: ${id}`
                    })
                }
                if (data) {
                    return res.status(201).json({
                        task: data
                    })
                }
            })
    }
)
const deleteTask = asyncWrapper(
    (req, res) => {
        const id = req.params.id;
        Task.findOneAndDelete({ _id: id })
            .exec((error, data) => {
                if (error) {
                    return res.status(400).json({
                        msg: `No task witd id: ${id}`
                    })
                }
                if (data) {
                    return res.status(201).json({
                        task: data
                        // data: null,
                        // status: "success"
                    })
                }
            })
    }
)
module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}