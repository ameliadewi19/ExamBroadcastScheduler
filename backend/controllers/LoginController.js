const Admin = require("../models/LoginModel.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getAdmin = async(req, res) =>{
    try {
        const response = await Admin.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const login = async (req, res) => {
  console.log("Username yang dicari:", req.body.username);
//   try {
      const admin = await Admin.findOne({
          where: {
              username: req.body.username
          }
      });
      const match = await bcrypt.compare(req.body.password, admin.password);
      if (!match) return res.status(400).json({ msg: "Password salah" });
      const adminID = admin.id;
      const username = admin.username;
      const accessToken = jwt.sign({ adminID, username }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '20s'
      });

      const refreshToken = jwt.sign({ adminID, username }, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '1d'
      });

      await Admin.update({ refresh_token: refreshToken }, {
          where: {
              id: adminID
          }
      });

      res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
      });

      res.json({ accessToken });
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
}

const logout = async (req, res) => {
    console.log("Logout");
    const refreshToken = req.cookies.refreshToken;

    console.log("refreshToken:", refreshToken);

    if (!refreshToken) return res.sendStatus(204);

    // Mencari admin berdasarkan refreshToken
    const admin = await Admin.findOne({
        where: {
            refresh_token: refreshToken
        }
    });

    if (!admin) return res.sendStatus(204);

    const adminId = admin.id;

    // Hapus refreshToken dari admin
    await Admin.update({ refresh_token: null }, {
        where: {
            id: adminId
        }
    });

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

module.exports={
    getAdmin,
    login,
    logout
}

