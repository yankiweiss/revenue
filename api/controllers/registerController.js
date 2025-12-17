import bcrypt from "bcryptjs";
import dataBasePool from "../model/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();

const handleNewUser = async (req, res) => {
  try {
    const { user, pwd } = req.body;
    if (!user || !pwd)
      return res
        .status(400)
        .json({ message: "Username and Password are required!" });

    const duplicateCheck = await dataBasePool.query(
      "SELECT username FROM users WHERE username = $1",
      [user]
    );

    if (duplicateCheck.rowCount > 0) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    await dataBasePool.query(
      "INSERT INTO users (username , password) VALUES ($1, $2)",
      [user, hashedPwd]
    );

    res.status(201).json({ success: `New user ${user} was created` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleSingIns = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are REQUIRED" });

  const result = await dataBasePool.query(
    "SELECT username, password FROM users WHERE username = $1",
    [user]
  );

  const foundUser = result.rows[0];

  if (!foundUser)
    return res.status(401).json({ message: "Your Username is not found!" });

  const match = await bcrypt.compare(pwd, foundUser.password);

  if (match) {
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    if(!match){
      return res.status(401).json({message : 'Invalid Credentials'})
    }


    await dataBasePool.query(
      'UPDATE users SET access_token = $1 WHERE username = $2',
      [accessToken, foundUser.username]
    )

    //res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24* 60 * 60 * 1000})

    res.status(200)
  }
};

const getAllCurrentUsers = async (req, res) => {
  const result = await dataBasePool.query("SELECT * FROM users");
  console.log(result.rows);

  res.json(result.rows);
};

export { handleNewUser, handleSingIns, getAllCurrentUsers };
