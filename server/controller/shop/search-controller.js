import { Product } from "../../models/Product.js";


const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword || typeof keyword !== "string") {
      res.status(400).json({
        success: false,
        message: "Keyword is Required and be in String Format!",
      });
    }

    const RegEx = new RegExp(keyword, "i");

    const createSearchQuery = {
      $or: [
        {
          title: RegEx,
        },
        { description: RegEx },
        { category: RegEx },
        { brand: RegEx },
      ],
    };

    const searchResults = await Product.find(createSearchQuery);

    res.status(200).json({
      success: true,
      data: searchResults,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Some Error Occurred!",
    });
  }
};

export default searchProducts;
