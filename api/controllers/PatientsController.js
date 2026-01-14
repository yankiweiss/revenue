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
        TO_CHAR(dob, 'MM/DD/YYYY') AS dob,
        notes
         FROM patients`;

    const results = await dataBasePool.query(getAllData);

    return res.status(200).json({
      data: results.rows,
    });
  } catch (error) {
    console.error(error);
  }
};

const updateFieldInPatients = async (req, res) => {
  const { id, field, newValue } = req.body;

  const allowedFields = [
    "client",
    "insurance",
    "status",
    "company_name",
    "member_id",
    "worked_date",
    "dob",
    "notes",
  ];

  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: "Invalid field" });
  }

  try {
    const query = `
        UPDATE patients
        SET ${field} = $1
        WHERE id = $2
        RETURNING *`;

    const result = await dataBasePool.query(query, [newValue, id]);

    res.json({ message: "Updated Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Database error" });
  }
};

const getPatientByID = async (req, res) => {
  const { id } = req.params;

  try {
    const query = `
        SELECT 
        id,
  client,
  insurance,
  member_id,
  status,
  notes,
  TO_CHAR(worked_date, 'MM/DD/YYYY') AS worked_date,
  TO_CHAR(dob, 'MM/DD/YYYY') AS dob
        FROM patients
        WHERE id = $1

 `;

    const result = await dataBasePool.query(query, [id]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).res.json({ message: "Database error" });
  }
};

const duplicateDOB = async (req, res) => {
  try {
    const query = `
      SELECT 
      id,
      client,
        insurance,
        status,
        company_name,
        member_id,
        TO_CHAR(worked_date, 'MM/DD/YYYY') AS worked_date,
        TO_CHAR(dob, 'MM/DD/YYYY') AS dob,
        notes
      FROM patients
      WHERE client IS NOT NULL
      AND client IN (
        SELECT client
        FROM patients
        WHERE client IS NOT NULL
        GROUP BY client
        HAVING COUNT(*) > 1
      )
      ORDER BY client;
    `;

    const { rows } = await dataBasePool.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export { getAllPatients, updateFieldInPatients, getPatientByID, duplicateDOB };
