const mongoose = require("mongoose");

/** 404 for any route nothing else handled. */
function notFound(req, res) {
    res.status(404).render("error", { status: 404, message: "Page not found" });
}

/**
 * Central error handler. Express 5 forwards errors thrown in async handlers here.
 * Invalid ids become 404s, validation problems 400s, everything else 500.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
    let status = err.status || 500;
    let message = "Something went wrong";

    if (err instanceof mongoose.Error.CastError) {
        status = 404;
        message = "Not found";
    } else if (err instanceof mongoose.Error.ValidationError) {
        status = 400;
        message = Object.values(err.errors)
            .map((e) => e.message)
            .join(", ");
    } else if (status < 500 && err.message) {
        message = err.message;
    }

    if (status >= 500) console.error(err);
    res.status(status).render("error", { status, message });
}

module.exports = { notFound, errorHandler };
