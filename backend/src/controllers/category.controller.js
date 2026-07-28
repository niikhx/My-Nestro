import categorymodel from "../models/category.model.js";
import {
  sendBadRequest, sendConflict, sendCreated,
  sendNotFound, sendServerError, sendSuccess
} from "../utils/response.js";


// create api
const create = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const image_url = req.file.path;
    const category = await categorymodel.findOne({ name: name })
    if (category) return sendConflict(res)
    await categorymodel.create({ name, slug, image: image_url });
    return sendCreated(res);
  } catch (error) {
    console.log(error)
    return sendServerError(res);
  }
};


// Update ById api
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;
    // const image_url = req.file.path;
    const update = {}
    if (req.file) {
      update.image = req.file.path;
    }
    const category = await categorymodel.findById({ _id: id })
    if (!category) return sendNotFound(res)
    if (name) {
      update.name = name;
      update.slug = slug;
    }
    await categorymodel.updateOne(
      { _id: id },
      {
        $set: update
      }
    )
    return sendSuccess(res);

  } catch (error) {
    console.log(error)
    return sendServerError(res);
  }
};


// Read api
const read = async (req, res) => {
  try {
    const query = req.query;
    const limit = query.limit ? parseInt(req.query.limit) : 0;
    const filter = {}
    if (query.status) filter.status = query.status === "true"
    const categories = await categorymodel.find(filter).limit(limit)
    res.status(200).json({
      massage: "data find",
      success: true,
      categories,
      total: categories.length
    })
  } catch (error) {
    console.log(error)
  }
};


// Read ById api
const readById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categorymodel.findById({ _id: id });
    if (!category) return sendNotFound(res);
    res.status(200).json({
      massage: "id find successfully",
      success: true,
      category
    })
  } catch (error) {
    return sendServerError(res)
  }
};


// Delete ById api
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categorymodel.findById({ _id: id });
    if (!category) return sendNotFound(res)
    await categorymodel.findByIdAndDelete({ _id: id });
    return sendSuccess(res, "Category Deleted")
  } catch (error) {
    return sendServerError(res)
  }
};


// Status Update ById api
const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categorymodel.findById({ _id: id });
    if (!category) return sendNotFound(res)
    await categorymodel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: !category.status
        }
      }
    )
    return sendSuccess(res, "Status Updated")
  } catch (error) {
    return sendServerError(res)
  }
}


export { read, create, readById, updateById, deleteById, edit };