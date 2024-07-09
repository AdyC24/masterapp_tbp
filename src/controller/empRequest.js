const RequestModel = require('../models/request');

const getAllRequests = async (req, res) => {
    try {
        const [data] = await RequestModel.getAllRequests();
        res.json({
            message: "Get all requests succeed",
            data: data,
        })
    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error,
        })
    }
}

const createNewRequest = (req, res) => {

}

const editRequest = (req, res) => {

}

const deleteRequest = (req, res) => {

}


module.exports = {
    getAllRequests,
    createNewRequest,
    editRequest,
    deleteRequest
}
