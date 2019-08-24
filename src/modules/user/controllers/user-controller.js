const userRequest = require('../db/user-db');

exports.getUserById = async (req, res) => {
  try {
    let user = await userRequest.getUserById(req.body.userId);
    delete user.userId;
    delete user.password;
    delete user.refreshToken;
    res.send(user);
  } catch (err) {
    console.log(err)
    res.status(500).send({ err });
  }
};