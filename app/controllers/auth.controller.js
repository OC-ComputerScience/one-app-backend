const db = require("../models");
const { authenticateRoute } = require("../authentication/authentication");
const User = db.user;
const Session = db.session;
const Op = db.Sequelize.Op;
const { encrypt } = require("../authentication/crypto");

exports.login = async (req, res) => {
  let { userId } = await authenticate(req, res, "credentials");

  if (userId !== undefined) {
    let user = {};
    await User.findByPk(userId).then((data) => {
      user = data;
    });

    let expireTime = new Date();
    expireTime.setDate(expireTime.getDate() + 1);

    const session = {
      email: user.email,
      userId: userId,
      expirationDate: expireTime,
    };
    await Session.create(session).then(async (data) => {
      let sessionId = data.id;
      let token = await encrypt(sessionId);
      let userInfo = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        streetAddress : user.streetAddress,
        phone: user.phone,
        zip: user.zip,
        city: user.city,
        state: user.state,
        hsgradyear: user.hsgradyear,
        roleId: user.roleId,
        id: user.id,
        token: token,
        status: user.status,
      };
      res.send(userInfo);
    });
  }
};

exports.logout = async (req, res) => {
  let auth = req.get("authorization");
  console.log(auth);
  if (
    auth != null &&
    auth.startsWith("Bearer ") &&
    (typeof require !== "string" || require === "token")
  ) {
    let token = auth.slice(7);
    let sessionId = await decrypt(token);
    if (sessionId == null) return;
    await Session.destroy({ where: { id: sessionId } }).catch(
      (error) => {
        console.log(error);
        res.status(500).send({
          message:
            error.message || "Some error occurred while logging out.",
        });
      }
    );
    res.send({ message: "Logged out successfully." });
  }
};
