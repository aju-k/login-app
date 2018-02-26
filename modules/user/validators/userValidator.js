import Joi from "joi";
class UserValidator {

    LoginSchema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).max(30).required(),
            submit: Joi.string().required()

    });

    LoginValidation = (req, res, next) => {
        Joi.validate(req.body, this.LoginSchema, (err, value) => {
            if (err) {
                console.log(err.details);
                return res.status(400).send({
                    Error: err.details[0].message
                });
            }
            next();
        });
    };

    Login = (req, res, next) => {
        const session = req.session;
        if (!session.hasOwnProperty('userInfo')) {
            res.redirect("/user/login");
        } else {
            next();
        }
    };
}
export default new UserValidator();