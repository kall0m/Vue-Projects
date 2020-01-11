const app = new Vue({
    el: '#app',
    data: {
        errors: [],
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
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        firstNameFocused: false,
        nameFocused: false,
        emailFocused: false,
        usernameFocused: false,
        passwordFocused: false,
        confirmPasswordFocused: false
    },
    mounted() {
        if (localStorage.username) {
            this.username = localStorage.username;
        }
    },
    methods: {
        persist() {
            localStorage.username = this.username;
            localStorage.password = this.password;
        },
        login() {
            let userValid = localStorage.username == this.username;
            let passValid = localStorage.password == this.password;

            if (userValid && passValid) {
                alert('great!');
                return true;
            } else {
                alert('who aere you?!');
            }

            return false;
        },
        checkForm: function (e) {
            this.errors = [];

            if (!this.firstName) {
                this.errors.push("First name required.");
            }

            if (!this.name) {
                this.errors.push("Name required.");
            }

            if (!this.email) {
                this.errors.push('Email required.');
            }

            if (!this.username) {
                this.errors.push("Username required.");
            }

            if (!this.password) {
                this.errors.push("Password required.");
            }

            if (!this.confirmPassword) {
                this.errors.push("Confirm password required.");
            }

            if (!this.errors.length && this.emailValidation.valid && this.passwordValidation.valid) {
                this.persist();

                return true;
            }

            e.preventDefault();
        },
        fieldRegexValidation(rules, field) {
            let errors = [];

            for (let rule of rules) {
                if (!rule.regex.test(field)) {
                    errors.push(rule.message);
                }
            }

            if (errors.length === 0) {
                return { valid: true, errors }
            } else {
                return { valid: false, errors }
            }
        }
    },
    computed: {
        firstNameMissing() {
            return this.firstName === '';
        },
        nameMissing() {
            return this.name === '';
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
            let result = this.fieldRegexValidation(this.passwordRules, this.password);

            if (this.notSamePasswords) {
                result.valid = false;
                result.errors.push("Passwords don't match");
            }

            return result;
        }
    }
})