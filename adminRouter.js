import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import adminSchema from './adminSchema.js';
import reportSchema from './reportSchema.js';
import userSchema from './userSchema.js';

const router = express.Router();
router.post('/adminregister', async (req, res) => {
  try {
    const nameExist = await adminSchema.findOne({ Email: req.body.Email });

    if (nameExist) {
      return res.status(400).json({ status: 'error', message: 'User with the same email already exists' });
    }

    const hash = await bcrypt.hash(req.body.Password, 10);
    const admin = new adminSchema({
      Name: req.body.Name,
      Dept: req.body.Dept,
      Email: req.body.Email,
      Password: hash,
    });

    const data = await admin.save();
    console.log(data);
    res.status(200).json({ status: 'success', data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});


// router.post('/logincheck', async (req, res) => {
//   try {
//     const nameExist = await adminSchema.findOne({ Name: req.body.Name });

//     if (!nameExist) {
//       return res.status(400).json({ status: 'error', message: 'Name not found' });
//     }
//     const password={Password:req.body.Password}

//     const validPassword = bcrypt.compare(password, nameExist.Password);

//     if (!validPassword) {
//       return res.status(400).json({ status: 'error', message: 'Invalid password' });
//     }

//     const userToken = jwt.sign({ Name: nameExist.Name }, 'rest in peace');
//     res.header('auth', userToken).json({ status: 'success', token: userToken });
//     console.log(token)
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ status: 'error', message: 'Internal Server Error' });
//   }
// });



router.post('/loginmatch', async (req, res) => {
  const { Name, Password } = req.body;
  try {
    const nameExist = await adminSchema.findOne({ Name});

    if (!nameExist) {
      return res.status(400).json({ status: 'error', message: 'Name not found' });
    }
    // const password={Password:req.body.Password}

    const validPassword = await bcrypt.compare(Password, nameExist.Password);

    if (!validPassword) {
      return res.status(400).json({ status: 'error', message: 'Invalid password' });
    }

    const userToken = jwt.sign({ Name: nameExist.Name }, 'rest in peace');

    // Save the token in the registration database
    await adminSchema.updateOne({ Name: req.body.Name }, { $set: { Token: userToken } });

    res.header('auth', userToken).json({ status: 'success', token: userToken });
    console.log(userToken);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

//  Who is login and get the thats login details


router.post("/admintoken", async (req, res) => {
  try {
    // const  name = req.body.name;

    // First, validate the user's credentials (you would typically do this for authentication)
    const user = await adminSchema.findOne({ Name: req.body.Name});

    if (!user) {
      return res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }

    res.status(200).json({ status: 'success', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});


//....json toke available or not verify......


const validUser = (req, res, next) => {
  const token = req.header('auth');

  if (!token) {
    return res.status(403).json({ status: 'error', message: 'Forbidden: Token not provided' });
  }

  try {
    const decoded = jwt.verify(token, 'rest in peace');
    req.token = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ status: 'error', message: 'Forbidden: Invalid token' });
  }
};

router.post('/thisweeklist',validUser, async (req, res) => {
  try {

    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const users = await userSchema.find({ Created_at: { $gte: startOfWeek } });

    if (users.length === 0) {
      return res.status(404).json({ status: 'success', message: 'No users found this week' });
    }

    const reports = await reportSchema.find({ Created_at: { $gte: startOfWeek } });

    if (reports.length > 0) {
      res.status(200).json({ status: 'success', users: users, reports: reports });
    } else {
      res.status(404).json({ status: 'success', users: users, message: 'No reports found for the users this week' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
});

export default router