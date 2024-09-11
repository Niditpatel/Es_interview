const { validateUser } = require("../Models/User.model");

const bcrypt = require("bcryptjs");
const { FindByEmail, CreateUser } = require("../Services/User.service");

exports.encryptValue = async (value) => {
  const salt = await bcrypt.genSalt(10);
  const hashValue = await bcrypt.hash(value, salt);
  return hashValue;
};

exports.registerUser = async (req, res) => {
  validateUser(req.body)
    .then(async (value) => {
      try {
        console.log(value)
        const user = await FindByEmail(value.email);
        console.log(user);
        if (user) {
          return res.status(200).json({
            success: 0,
            message: "User already exists.",
          });
        } else {
          const userPassword = await encryptValue(value.password);
          user = await CreateUser({ ...value, password: userPassword });
          const verficationToken = await user.generateVarificationToken();

          res.status(200).json({
            success: 1,
            message: "you have registered successfully.",
            token: verficationToken,
          });
        }
      } catch (e) {
        res.status(400).json({ success: 0, message: e.message });
      }
    })
    .catch((e) => {
      res.status(400).json({ success: 0, message: e.message });
    });
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await FindByEmail(email);

    if (user) {
      const passMatch = await bcrypt.compare(password, user.password);
      if (passMatch) {
        const verficationToken = await user.generateVarificationToken();
        res.status(200).json({
          success: 1,
          message: "you have loged in successfully.",
          token: verficationToken,
        });
      } else {
        res.status(400).json({
          success: 0,
          message: "invalid username or password.",
        });
      }
    } else {
      res.status(400).json({
        success: 0,
        message: "invalid username or password.",
      });
    }
  } catch (e) {
    res.status(400).json({
      success: 0,
      message: e.message,
    });
  }
};
