import db from "../models/index";
import allcode from "../models/allcode";

let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name
                || !data.imageBase64
                || !data.descriptionMardown
                || !data.descriptionHTML
            ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMardown: data.descriptionMardown
                })
                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty
}