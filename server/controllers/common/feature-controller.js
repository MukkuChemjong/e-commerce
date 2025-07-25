import { Feature } from "../../models/Feature.js";

const addFeatureImage = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image, "image");

    const featureImages = new Feature({
      image,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
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
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
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
export { addFeatureImage, getFeatureImages, deleteFeatureImage };