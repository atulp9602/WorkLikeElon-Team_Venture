const UserService = require("../service/user-service");

const userService = new UserService();
module.exports = {
  async signUp(req, res) {
    try {
      const { username, email, contactno } = { ...req.body };
      console.log(username, email, contactno);
      const user = await userService.createUser({ username, email, contactno });
      return res.status(201).json({
        success: true,
        data: user,
        message: "Check your email address for password",
        error: {},
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: {},
        message: "There is an error for creating the user",
        error: error.message,
      });
    }
  },

  async signIn(req, res) {
    try {
      const { email, password } = { ...req.body };
      const response = await userService.signIn({ email, password });

      return res.status(200).json({
        success: true,
        token: response,
        message: "User loggedIn successfully",
        error: {},
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: {},
        message: "There is an error in user signin",
        error: error.message,
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
      return res.status(200).json({
        success: true,
        data: response,
        message: "Password updated successfully",
        error: {},
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        data: {},
        message: "An error occurred while updating the password",
        error: error.message,
      });
    }
  },

  async resetPassword(req, res) {
    try {
      const { email } = { ...req.body };
      await userService.resetPassword(email);

      return res.status(200).json({
        success: true,
        data: {},
        message: "A password reset link was sent to your registered Email",
        error: {},
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        data: {},
        message: "An error occurred while resetting your password",
        errors: error.message,
      });
    }
  },

  async userInfo(req, res) {
    try {
      const userId = req.user.id;
      console.log(userId);
      const response = await userService.userInfo(userId);

      return res.status(200).json({
        sucess: true,
        data: response,
        message: "Successfully fetched user info",
        error: {},
      });
    } catch (error) {
      return res.status(500).json({
        sucess: false,
        data: {},
        message: "Error while fetching user information",
        error: error.message,
      });
    }
  },
};
