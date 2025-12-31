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
     return res.status(200).json({message: 'Excel file was successfully Uploaded.', rowsInserted: data.length})
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Failed to upload Excel file",})
  }
};

export { excelFilesToDB };
