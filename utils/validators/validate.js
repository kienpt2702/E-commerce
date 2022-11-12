const validate = (schema) => {
    return (req, res, next) => {
        const {error, value} = schema.validate(req.body);
        if(error) {
            next(error);
            return;
        }
        next();
    }
}

exports.validate = validate;