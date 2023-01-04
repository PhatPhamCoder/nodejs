import db from "../models/index";
import bcrypt from 'bcryptjs';
import allcode from "../models/allcode";
import { where } from "sequelize";
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);

let postBookAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters'
                })
            } else {
                //upsert patient
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    default: {
                        email: data.email,
                        RoleId: 'R3'
                    },
                });
                console.log('check user', user[0])
                //create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType
                        }

                    })
                }

                resolve({
                    errCode: 0,
                    errMessage: 'Save infor doctor succeed!'
                })
            }

        } catch (e) {
            reject(e)
            return res.status(200).json({
                errCode: -1,
                errMessage: 'Error from the sever...'
            })
        }
    })
}

module.exports = {
    postBookAppointment: postBookAppointment
}