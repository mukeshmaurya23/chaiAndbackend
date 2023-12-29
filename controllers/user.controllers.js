const userController = async (req, res) => {
  return res.status(200).json({
    statusCode: 200,
    message: "User Controller",
  });
};

export default userController;
