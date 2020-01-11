class Content {
    constructor(title, topic, author, img, category) {
        this.title = title;
        this.topic = topic;
        this.author = author;
        this.img = img;
        this.category = category
    }
}

const app = new Vue({
    el: '#app',
    data: {
        term: '',
        results: [],
        noResults: false,
        searching: false,
        categories: [
            'ICT & Media design',
            'ICT & Software engineering',
            'ICT & Technology',
            'ICT & Infrastructure',
            'ICT & Business'
        ],
        contentList: [
            new Content(
                'Vue.js',
                'programming',
                'Chris',
                'https://vuejs.org//images/logo.png',
                'ICT & Media design'
            ),
            new Content(
                'React.js',
                'https://facebook.github.io/react/',
                'Tim',
                'https://daynin.github.io/clojurescript-presentation/img/react-logo.png',
                'ICT & Media design'
            ),
            new Content(
                'Angular.js',
                'https://angularjs.org/',
                'Sam',
                'https://angularjs.org/img/ng-logo.png',
                'ICT & Media design'
            ),
            new Content(
                'Ember.js',
                'http://emberjs.com/',
                'Rachel',
                'http://www.gravatar.com/avatar/0cf15665a9146ba852bf042b0652780a?s=200',
                'ICT & Media design'
            ),
            new Content(
                'Meteor.js',
                'https://www.meteor.com/',
                'Chris',
                'http://hacktivist.in/introduction-to-nodejs-mongodb-meteor/img/meteor.png',
                'ICT & Software engineering'
            ),
            new Content(
                'Aurelia',
                'http://aurelia.io/',
                'Tim',
                'https://cdn.auth0.com/blog/aurelia-logo.png',
                'ICT & Media design'
            ),
            new Content(
                'Node.js',
                'https://nodejs.org/en/',
                'A. A. Ron',
                'https://code-maven.com/img/node.png',
                'ICT & Software engineering'
            ),
            new Content(
                'Pusher',
                'https://pusher.com/',
                'Alex',
                'https://avatars1.githubusercontent.com/u/739550?v=3&s=400',
                'ICT & Software engineering'
            ),
            new Content(
                'Feathers.js',
                'http://feathersjs.com/',
                'Chuck',
                'https://cdn.worldvectorlogo.com/logos/feathersjs.svg',
                'ICT & Software engineering'
            ),
        ]
    },
    methods: {
        search: function () {
            if (!this.term) {
                return;
            }

            this.searching = true;

            this.results = this.contentList.filter(content => {
                return content.title.toLowerCase().includes(this.term.toLowerCase())
                    || content.category.toLowerCase().includes(this.term.toLowerCase())
                    || content.author.toLowerCase().includes(this.term.toLowerCase())
            })

            this.searching = false;
            this.noResults = this.results.length === 0;
        }
    }
})