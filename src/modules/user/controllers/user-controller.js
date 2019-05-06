const userRequest = require('../db/user-db');

exports.getUserById = async (req, res) => {
  try {
    let user = await userRequest.getUserById(req.body.userId);
    delete user.user_id;
    delete user.password;
    delete user.refresh_token;
    res.send(user);
  } catch (err) {
    res.status(500).send({ err });
  }
};