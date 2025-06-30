// This function helps to handle errors in async route functions
function asyncHandler(fn) {
  // It returns a new function that Express can use as middleware
  return function (req, res, next) {
    // Call the async function and catch any errors
    // If there's an error, pass it to Express error handler using next()
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

// Export the asyncHandler function so it can be used in other files
export default asyncHandler;
