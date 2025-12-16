import dataBasePool from "../model/db.js";

const excelFilesToDB = async (req, res) => {
    const { data } = req.body;
    try {
        const insertQuery = `INSERT INTO patients(client, insurance, dob, member_id, worked_date, status)
        VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT (client, dob)
DO NOTHING;`;

        for (let row of data) {
            const values = [
                row.client,
                row.insurance,
                row.dob,
                row.member_id,
                row.worked_date,
                row.status,
            ];
            await dataBasePool.query(insertQuery, values);
        }
    } catch (error) {
        console.error(error);
    }
};

export { excelFilesToDB };
