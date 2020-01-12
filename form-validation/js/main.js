const app = new Vue({
    el: '#app',
    data: {
        errors: [],
        nameRules: [
            { message: 'Contains letters', regex: /[A-Za-z]+/ },
        ],
        passwordRules: [
            { message: 'Contains lowercase', regex: /[a-z]+/ },
            { message: "Contains uppercase", regex: /[A-Z]+/ },
            { message: "8 characters minimum", regex: /.{8,}/ },
            { message: "Contains Number", regex: /[0-9]+/ }
        ],
        emailRules: [
            { message: 'Email not correct', regex: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ },
            { message: 'Email not PCN email', regex: /student\.fontys\.nl/ }
        ],
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        firstNameFocused: false,
        lastNameFocused: false,
        emailFocused: false,
        usernameFocused: false,
        passwordFocused: false,
        confirmPasswordFocused: false,
        passwordVisible: false,
        formSubmit: false
    },
    mounted() {
        if (localStorage.username) {
            this.username = localStorage.username;
        }
    },
    methods: {
        checkForm: function (e) {
            this.formSubmit = true;

            if (!this.firstNameMissing && !this.lastNameMissing && !this.emailMissing &&
                !this.usernameMissing && !this.passwordMissing && !this.confirmPasswordMissing) {
                if (this.emailValidation.valid && this.passwordValidation.valid && !this.notSamePasswords) {
                    this.persist();

                    return true;
                }
            }

            e.preventDefault();
        },
        propertyCheck(fieldMissing, fieldFocused, placeholder) {
            if ((fieldMissing && fieldFocused) || (fieldMissing && this.formSubmit)) {
                return { invalid: true, placeholder: "Please enter " + placeholder };
            } else {
                return { invalid: false, placeholder: placeholder.charAt(0).toUpperCase() + placeholder.slice(1) };
            }
        },
        fieldRegexValidation(rules, field) {
            let errors = [];

            for (let rule of rules) {
                if (!rule.regex.test(field)) {
                    errors.push(rule.message);
                }
            }

            if (errors.length === 0) {
                return { valid: true, errors };
            } else {
                return { valid: false, errors };
            }
        },
        login: function (e) {
            this.formSubmit = true;

            if (!this.usernameMissing && !this.passwordMissing) {
                let userValid = localStorage.username == this.username;
                let passValid = localStorage.password == this.password;

                if (userValid && passValid) {
                    return true;
                }
            }

            e.preventDefault();
        },
        togglePasswordVisibility() {
            this.passwordVisible = !this.passwordVisible;
        },
        persist() {
            localStorage.username = this.username;
            localStorage.password = this.password;
        }
    },
    computed: {
        firstNameMissing() {
            return this.firstName === '';
        },
        lastNameMissing() {
            return this.lastName === '';
        },
        emailMissing() {
            return this.email === '';
        },
        usernameMissing() {
            return this.username === '';
        },
        passwordMissing() {
            return this.password === '';
        },
        confirmPasswordMissing() {
            return this.confirmPassword === '';
        },
        firstNameCheck() {
            return this.propertyCheck(this.firstNameMissing, this.firstNameFocused, "first name");
        },
        lastNameCheck() {
            return this.propertyCheck(this.lastNameMissing, this.lastNameFocused, "last name");
        },
        emailCheck() {
            return this.propertyCheck(this.emailMissing, this.emailFocused, "email");
        },
        usernameCheck() {
            return this.propertyCheck(this.usernameMissing, this.usernameFocused, "username");
        },
        passwordCheck() {
            return this.propertyCheck(this.passwordMissing, this.passwordFocused, "password");
        },
        confirmPasswordCheck() {
            if ((this.confirmPasswordMissing && this.confirmPasswordFocused) || (this.confirmPasswordMissing && this.formSubmit)) {
                return { invalid: true, placeholder: "Please confirm password" };
            } else {
                return { invalid: false, placeholder: "Confirm password" };
            }
        },
        emailValidation() {
            return this.fieldRegexValidation(this.emailRules, this.email);
        },
        notSamePasswords() {
            if (this.passwordsFilled) {
                return (this.password !== this.confirmPassword);
            } else {
                return false;
            }
        },
        passwordsFilled() {
            return (this.password !== '' && this.confirmPassword !== '');
        },
        passwordValidation() {
            return this.fieldRegexValidation(this.passwordRules, this.password);
        }
    }
})