import mongoose from "mongoose";

function errorHandler(err) {
  if (err instanceof mongoose.Error.ValidationError) {
    let message = [];
    for (const m in err.errors) {
      message.push(err.errors[m].message);
    }
    return {
      statusCode: 422,
      message: message.join(" "),
    };
  }
  if (err instanceof mongoose.Error.CastError) {
    return {
      statusCode: 400,
      message: "Sent data are not valid.",
    };
  }
  return {
    statusCode: err.statusCode || 500,
    message: err.message,
  };
}

export { errorHandler };
