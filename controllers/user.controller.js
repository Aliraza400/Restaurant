import UserModel from "../models/user.model.js";

export const getUser = async (req, res) => {
  try {
    console.log(req.user);
    const user = await UserModel.findById({ _id: req.user }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }
    //user.password = undefined
    res.json({
      success: true,
      message: "User Fetched Successfully!",
      user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.user });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found!",
      });
    }

    const { id } = req.params;

    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      message: "User Field Updated Successfully!",
      updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteUser = async (req, res) => {
    try {
        const { id }= req.params
        const user = await UserModel.findByIdAndDelete(id)
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!'
            })
        }

        res.json({
            success: true,
            message: 'User Deleted Successfully!'
        })
    }
    catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}