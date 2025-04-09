import RestaurantModel from "../models/restaurant.model.js";
export const createRestaurant = async (req, res) => {
  try {
    const restaurant = new RestaurantModel(req.body);

    await restaurant.save();
    res.json({
      success: true,
      message: "New Restaurant Added Successfully!",
      restaurant,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.find();
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found!",
      });
    }
    res.json({
      success: true,
      totalCount: restaurant.length,
      restaurant,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantModel.findById(id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found!",
      });
    }
    res.json({
      success: true,
      restaurant,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantModel.findByIdAndDelete(id);
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant Not Found!",
      });
    }
    res.json({
      success: true,
      message: "Restaurant Deleted Successfully!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const uploadRestaurantImage = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No Image File Uploaded!",
        });
      }
  
      const normalizePath = req.file.path.replace(/\\/g, '/');
  
      const restaurant = await RestaurantModel.findByIdAndUpdate(
        id,
        { imageUrl: normalizePath },
        { new: true }
      );
  
      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found",
        });
      }
  
      res.json({
        success: true,
        message: 'Image Updated Successfully!',
        restaurant,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
  
