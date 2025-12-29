import bcrypt from "bcryptjs";
import dataBasePool from "../model/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();

const handleNewUser = async (req, res) => {
  try {
    const { email, pwd, fullName } = req.body;
    if (!email || !pwd || !fullName)
      return res
        .status(400)
        .json({ message: "Email and Password are required!" });

    const duplicateCheck = await dataBasePool.query(
      "SELECT email FROM users WHERE email = $1",
      [email ]
    );

    if (duplicateCheck.rowCount > 0) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const hashedPwd = await bcrypt.hash(pwd, 10);

    await dataBasePool.query(
      "INSERT INTO users (email , password, fullname, role) VALUES ($1, $2, $3, $4)",
      [email , hashedPwd, fullName, 1000]
    );



    res.status(201).json({ message: `New user ${email } was created` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleSingIns = async (req, res) => {
  try{
  const { email , pwd } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "username and password are REQUIRED" });

  const result = await dataBasePool.query(
    "SELECT email, password FROM users WHERE email = $1",
    [email]
  );

  const foundUser = result.rows[0];

  if (!foundUser){
    return res.status(401).json({ message: "Your Username is not found!" });
  }

  const match = await bcrypt.compare(pwd, foundUser.password);

  if(!match) {
    return res.status(401).json({message: 'Invalid Credentials'})
  }



  
    const accessToken = jwt.sign(
      { email: foundUser.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );

    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    


    await dataBasePool.query(
      'UPDATE users SET access_token = $1 WHERE email = $2',
      [accessToken, foundUser.email]
    )

    //res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24* 60 * 60 * 1000})

    
res.cookie('jwt', refreshToken, {httpOnly: true, maxAge : 24 * 60 *60 *1000})
    res.status(200).json({message : 'Successful Login', accessToken})
  }catch(err){
    console.error('LOGIN ERROR', err)
    return res.status(500).json({message : 'Server error'})

  }
  };

const getAllCurrentUsers = async (req, res) => {
  const result = await dataBasePool.query("SELECT * FROM users");
  

  return res.status(200).res.json(result.rows)
};

export { handleNewUser, handleSingIns, getAllCurrentUsers };
