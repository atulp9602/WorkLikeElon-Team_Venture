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
        message:error.message,
        error,
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
        message:error.message,
        error
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
        message: error.message,
        error,
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
        message:error.message,
        error
      });
    }
  },

  async updateUserProfile(req, res) {
    try {
      const {username,contactno} = {...req.body};
      const userId = req.user.id;
      const response = await userService.updateUserProfile(userId,{username, contactno});
      return res.status(200).json({
        success:true,
        data:response,
        message:"Profile Updated Successfully!",
        error:{},
      });
    } catch (error) {
      return res.status(500).json({
        status:false,
        data:{},
        message:error.message,
        error:error,
      })
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
        message:error.message,
        error,
      });
    }
  },
};
