// success response
const sendSuccess = (res, massage = "Success", optional = null) => {
  return res.status(200).json({
    success: true,
    massage,
    ...optional
  })
};

// created response
const sendCreated = (res, massage = "Create Successfully") => {
  return res.status(201).json({
    success: true,
    massage
  })
};


// BadRequest response
const sendBadRequest = (res, massage = "Bad Request") => {
  return res.status(400).json({
    success: false,
    massage
  })
};


// NotFound response
const sendNotFound = (res, massage = "Resource Not Found") => {
  return res.status(404).json({
    success: false,
    massage
  })
};


// Conflict (Already Exist) response
const sendConflict = (res, massage = "Data Already Exist") => {
  return res.status(409).json({
    success: false,
    massage
  })
};


// Conflict (Already Exist) response
const sendServerError = (res, error) => {
  console.log(error)
  return res.status(500).json({
    success: false,
    massage: "Internal Server Error"
  })
};


export {
  sendBadRequest,
  sendConflict,
  sendCreated,
  sendNotFound,
  sendServerError,
  sendSuccess
}