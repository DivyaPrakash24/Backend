const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
    let errors  = {};


data.name = !isEmpty(data.name) ? data.name:"";

data.email = !isEmpty(data.email) ? data.email:"";

data.password = !isEmpty(data.password) ? data.password:"";

data.password2 = !isEmpty(data.password2) ? data.password2:"";

if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
}
else if(validator.isEmpty(data.email)) {
    errors.email = "Email is invalid";
}


if (Validator.isEmpty(data.password,{min:6 , max: 30})) {
    errors.password = "Password must be at least 6 Characters";
}

if(validator.isEmpty(data.password,data.password2)) {
    errors.password2 = "Password must Match ";
}

return {
    errors,
    isValid: isEmpty(errors)
};
};
