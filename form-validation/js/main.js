const app = new Vue({
    el: '#app',
    data: {
        errors: [],
        firstName: null,
        name: null,
        email: null,
        username: null,
        password: null,
        confirmPassword: null
    },
    methods: {
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
            } else if (!this.validEmail(this.email) || this.notFontysEmail(this.email)) {
                this.errors.push('Valid email required.');
            }

            if (!this.username) {
                this.errors.push("Username required.");
            }

            if (!this.password) {
                this.errors.push("Password required.");
            }

            if (!this.confirmPassword) {
                this.errors.push("Please confirm password.");
            }

            if (this.password !== this.confirmPassword) {
                this.errors.push("Passwords do not match.");
            }

            if (!this.errors.length) {
                return true;
            }

            e.preventDefault();
        },
        validEmail: function (email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        notFontysEmail(value = "") {
            return !value.includes("student.fontys.nl");
        }
    }
})