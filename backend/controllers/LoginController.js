const Admin = require("../models/LoginModel.js");
const bcrypt = require('bcrypt');


const getAdmin = async(req, res) =>{
    try {
        const response = await Admin.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

const login = async (req, res) => {
    try {
      const admin = await Admin.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(req.body.password, admin.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials password' });
      }
  
      // If username and password are correct, you can generate and send a token here.
      
      res.status(200).json(admin); // You can customize the response as needed.
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

module.exports={
    getAdmin,
    login
}

