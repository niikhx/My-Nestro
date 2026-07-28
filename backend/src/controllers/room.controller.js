import RoomModel from "../models/room.model.js";
import {
  sendBadRequest, sendConflict, sendCreated,
  sendNotFound, sendServerError, sendSuccess
} from "../utils/response.js";


// create api
const create = async (req, res) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) return sendBadRequest(res);
    const room = await RoomModel.findOne({ name: name })
    if (room) return sendConflict(res)
    await RoomModel.create({ name, slug });
    return sendCreated(res);
  } catch (error) {
    return sendServerError(res);
  }
};


// Update ById api
const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug } = req.body;
    const update = {}
    const room = await RoomModel.findById({ _id: id })
    if (!room) return sendNotFound(res)
    if (name) {
      update.name = name;
      update.slug = slug;
    }
    await RoomModel.updateOne(
      { _id: id },
      { $set: update }
    );
    return sendSuccess(res);
  } catch (error) {
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
    const room = await RoomModel.find(filter).limit(limit);
    res.status(200).json({
      massage: "data find",
      success: true,
      rooms: room
    })
  } catch (error) {
    return sendServerError(res)
  }
};


// Read ById api
const readById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await RoomModel.findById({ _id: id });
    if (!room) return sendNotFound(res);
    res.status(200).json({
      massage: "id find successfully",
      success: true,
      room
    })
  } catch (error) {
    return sendServerError(res)
  }
};


// Delete ById api
const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await RoomModel.findById({ _id: id });
    if (!room) return sendNotFound(res)
    await RoomModel.findByIdAndDelete({ _id: id });
    return sendSuccess(res, "Room Deleted")
  } catch (error) {
    return sendServerError(res)
  }
};


// Status Update ById api
const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await RoomModel.findById({ _id: id });
    if (!room) return sendNotFound(res)
    await RoomModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          status: !room.status
        }
      }
    )
    return sendSuccess(res, "Status Updated")
  } catch (error) {
    return sendServerError(res)
  }
}


export { read, create, readById, updateById, deleteById, edit };