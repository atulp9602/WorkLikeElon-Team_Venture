const UserService = require("../service/user-service");
const { STATUS_CODES } = require("../utils/constant");

const userService = new UserService();
module.exports = {
  async signUp(req, res) {
    try {
      const { username, email, contactno } = { ...req.body };
      const user = await userService.createUser({ username, email, contactno });
      return res.status(STATUS_CODES.CREATED).json({
        success: true,
        data: user,
        message: "Check your email address for password",
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        success: false,
        data: {},
        message:error.message,
      });
    }
  },

  async signIn(req, res) {
    try {
      const { email, password } = { ...req.body };
      const response = await userService.signIn({ email, password });

      return res.status(STATUS_CODES.OK).json({
        success: true,
        token: response,
        message: "User loggedIn successfully",
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        success: false,
        data: {},
        message:error.message,
      });
    }
  },

  async updatePassword(req, res) {
    try {
      const userId = req.user.id;
      const { oldpassword, newpassword } = { ...req.body };
      let response;
      if (oldpassword) {
        response = await userService.updatePassword(
          userId,
          newpassword,
          oldpassword
        );
      } else {
        response = await userService.updatePassword(userId, newpassword);
      }
      return res.status(STATUS_CODES.OK).json({
        success: true,
        data: response,
        message: "Password updated successfully",
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        success: false,
        data: {},
        message: error.message,
      });
    }
  },

  async resetPassword(req, res) {
    try {
      const { email } = { ...req.body };
      await userService.resetPassword(email);

      return res.status(STATUS_CODES.OK).json({
        success: true,
        data: {},
        message: "A password reset link was sent to your registered Email",
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        sucess: false,
        data: {},
        message:error.message,
      });
    }
  },

  async updateUserProfile(req, res) {
    try {
      const {username,contactno} = {...req.body};
      const userId = req.user.id;
      const response = await userService.updateUserProfile(userId,{username, contactno});
      return res.status(STATUS_CODES.OK).json({
        success:true,
        data:response,
        message:"Profile Updated Successfully!",
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        status:false,
        data:{},
        message:error.message,
      })
    }
  },

  async userInfo(req, res) {
    try {
      const userId = req.user.id;
      console.log(userId);
      const response = await userService.userInfo(userId);

      return res.status(STATUS_CODES.OK).json({
        sucess: true,
        data: response,
        message: "Successfully fetched user info",
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        sucess: false,
        data: {},
        message:error.message,
      });
    }
  },
};
