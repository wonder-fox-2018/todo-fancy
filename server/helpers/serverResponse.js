module.exports = {
    success: (res, code, message, output) => {
        res.status(code).json({
            message: message,
            output: output
        });
    },

    error: (res, code, err) => {
        res.status(code).json({
            message:err.message
        });
    }
};
