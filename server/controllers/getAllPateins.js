import dataBasePool from "../model/db.js";
import { Client } from "pg";


const getAllPatients = async (req, res) => {
    try {
        const getAllData = `
        SELECT 
        id,
        client,
        insurance,
        status,
        company_name,
        member_id,
        TO_CHAR(worked_date, 'MM/DD/YYYY') AS worked_date,
        TO_CHAR(dob, 'MM/DD/YYYY') AS dob
         FROM patients`;

        const results = await dataBasePool.query(getAllData);

        return res.status(200).json({
            data: results.rows
        })
    } catch (error) {
        console.error(error)
    }
}

export { getAllPatients };



