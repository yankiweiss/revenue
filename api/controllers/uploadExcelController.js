import dataBasePool from "../model/db.js";

const excelFilesToDB = async (req, res) => {
  const { data } = req.body;
  try {
    const insertQuery = `INSERT INTO patients(client, insurance, dob, member_id, worked_date, status, company_name)
        VALUES($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (client, dob)
DO NOTHING;`;

    for (let row of data) {
      const values = [
        row.client,
        row.insurance,
        row.dob,
        row.member_id,
        row.worked_date,
        row.status,
        row.company_name,
      ];
      await dataBasePool.query(insertQuery, values);
    }
  } catch (error) {
    console.error(error);
  }
};

export { excelFilesToDB };
