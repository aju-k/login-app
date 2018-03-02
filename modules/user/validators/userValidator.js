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
            res.redirect("/users/login");
        } else {
            next();
        }
    };

    SignupUserValidation = (req, res, next) => {
        const session = req.session;
        if (!session.hasOwnProperty('userInfo')) {
            res.redirect("/users/login");
        } else {
            next();
        }
    };


    SignupUserValidationSchema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        password: Joi.string().required(),
        birthDate: Joi.string().required(),
        address: Joi.string().required(),
        hobbies: Joi.allow(),
        email: Joi.string().required(),
        gender: Joi.string().required()
    });


    SignupUserValidation = (req, res, next) => {
        console.log('request body =>', req.body)
        Joi.validate(req.body, this.SignupUserValidationSchema, (err, value) => {
            if (err) {
                return res.status(400).send({
                    Error: err.details[0].message
                });
            }
            next();
        });
    }
}
export default new UserValidator();