import clicnicService from "../services/clicnicService"

let createClinic = async (req, res) => {
    try {
        let data = await clicnicService.createClincic(req.body);
        return res.status(200).json(data);
    } catch (e) {
        console.log('get all code error:', e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from sever'
        })
    }
}


module.exports = {
    createClinic: createClinic
}