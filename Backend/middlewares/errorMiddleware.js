// This middleware runs when a page is not found (wrong URL)
const notFound = (req, res, next) => {
  // Create a new error with the message showing which URL was not found
  const error = new Error(`Not Found - ${req.originalUrl}`);

  // Set the status code to 404 (Page Not Found)
  res.status(404);

  // Pass the error to the next error-handling function
  next(error);
};

// This middleware handles any errors that happen in the app
const errorHandler = (err, req, res, next) => {
  // If the response is already sent to the browser, skip handling
  if (res.headersSent) {
    return next(err);
  }

  // If status is still 200 (OK), change it to 500 (Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Send back a response with the error message
  res.status(statusCode).json({
    message: err.message, // This shows the error message to the user
  });
};

// Export these functions so they can be used in other files
export { notFound, errorHandler };
