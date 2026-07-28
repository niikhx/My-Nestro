import ProductModel from "../models/product.model.js";
import CategoryModel from "../models/category.model.js";
import RoomModel from "../models/room.model.js";
import { sendCreated, sendConflict, sendNotFound, sendServerError, sendSuccess, sendBadRequest } from "../utils/response.js";

const create = async (req, res) => {
  try {
    const image_url = req.file.path
    console.log(req.body)
    const product = await ProductModel.findOne({ name: req.body.name });
    if (product) return sendConflict(res)
    await ProductModel.create({
      ...req.body,
      thumbnail: image_url
    });

    return sendCreated(res)

  } catch (error) {
    console.log(error)
    return sendServerError(res)
  }
}

const read = async (req, res) => {
  try {
    const query = req.query;
    const pages = query.page || 1;
    const limit = query.limit ? parseInt(req.query.limit) : 4;
    const skip = limit * (pages - 1);
    const filter = {};
    const sortFilter = {};
    if (query.sort) {
      if (query.sort === "asc") {
        sortFilter.salePrice = 1;
      } else if (query.sort === "desc") {
        sortFilter.salePrice = -1;
      } else if (query.sort === "newest") {
        sortFilter.createdAt = -1;
      } else if (query.sort === "featured") {
        sortFilter.featured = -1;
      }
    }
    if (query.status) filter.status = query.status === "true";
    if (query.best_seller) filter.bestSeller = query.bestSeller === "true";
    if (query.featured) filter.featured = query.featured === "true";
    if (query.newArrival) filter.newArrival = query.newArrival === "true";
    if (query.stock) filter.stock = query.stock === "inStock";
    if (query.category) {
      const categories = await CategoryModel.find({ slug: { $in: query.category.split(',') } }).select("_id");
      const categoryIds = categories.map(cat => cat._id)
      filter.categoryId = { $in: categoryIds }
    }
    if (query.room) {
      const rooms = await RoomModel.find({ slug: { $in: query.room.split(',') } }).select("_id");
      const roomIds = rooms.map(rm => rm._id)
      filter.roomId = { $in: roomIds }
    }
    if (query.min && query.max) {
      filter.salePrice = { $gte: parseInt(query.min), $lte: parseInt(query.max) }
    }

    const products = await ProductModel.find(filter).populate([
      {
        select: "_id name slug",
        path: "categoryId"
      },
      {
        select: "_id name slug",
        path: "roomId"
      }
    ]).limit(limit).skip(skip).sort(sortFilter);
    const tota_product_count = await ProductModel.find().countDocuments();

    return res.status(200).json({
      message: "Product data find",
      success: true,
      products: products,
      total: tota_product_count,
      pages: Math.ceil(tota_product_count / limit)
    })


  } catch (error) {
    return sendServerError(res)
  }
}



const readById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById({ _id: id });
    if (!product) return sendNotFound(res)

    return res.status(200).json({
      message: "Product data find",
      success: true,
      product
    })


  } catch (error) {
    return sendServerError(res)
  }
}


const statusUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById({ _id: id });
    if (!product) return sendNotFound();
    await ProductModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: !product.status
        }
      }
    )

    return sendSuccess(res, "Status update successfully")

  } catch (error) {
    return sendServerError(res)
  }

}

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductModel.findById({ _id: id });
    if (!product) return sendNotFound();
    await ProductModel.findByIdAndDelete({ _id: id });
    return sendSuccess(res, "Category delete")
  } catch (error) {
    return sendServerError(res)
  }

}

const addImages = async (req, res) => {
  try {

    const { id } = req.params;
    console.log(req.files, "id")
    const product = await ProductModel.findById({ _id: id });

    if (!product) return sendNotFound();
    // Check if images are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        massage: "Please upload images"
      });
    }
    // Cloudinary image URLs
    const imageUrls = req.files.map(file => file.path);
    product.images.push(...imageUrls);
    await product.save();
    sendSuccess(res)
  } catch (error) {
    return sendServerError(res)
  }

}
const statusById = async (req, res) => {
  try {
    const { id } = req.params;
    const { field } = req.body;
    const product = await ProductModel.findById(id);
    if (!product) return sendNotFound(res);
    await ProductModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          [field]: !product[field]
        }
      }
    )

    return sendSuccess(res, "Status update successfully")

  } catch (error) {
    return sendServerError(res)
  }

}

export {
  create,
  read,
  statusUpdate,
  deleteById,
  readById,
  addImages,
  statusById
}