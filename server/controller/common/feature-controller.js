import { Feature } from "../../models/Feature.js";

const addFeatureImages = async (req, res) => {
  try {
    const { image } = req.body;

    const featureImage = new Feature({ image });

    await featureImage.save();

    res.status(200).json({
      success: true,
      data: featureImage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error Occurred!",
    });
  }
};

const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error Occurred!",
    });
  }
};

const deleteFeatureImage = async (req, res) => {
  try {
    const { userId } = req.params;

    const deletedUser = await Feature.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: "Could not find User!",
      });
    }

    res.status(200).json({
      success: true,
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some error Occurred!",
    });
  }
};

export { addFeatureImages, getFeatureImages, deleteFeatureImage };
