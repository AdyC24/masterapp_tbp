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
            errMessage: error.message,
        })
    }
}

const createNewRequest = async (req, res) => {
    try {
        const {body} = req
        if (!body) {
            return res.status(400).json({
                errMessage: 'Form should be filled completely'
            })
        }

        await RequestModel.createNewRequest(body);
        res.json({
            message: "Request new request succeed",
        })

    } catch (error) {
        res.status(500).json({
            message: "Server is error",
            errMessage: error.message,
        })
        
    }
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
