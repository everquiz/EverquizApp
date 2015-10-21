module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'epamAuth' : {
        'clientID'      : 'ee8c9c4fc634ec173ea82cc63a47dc91928e2f9d04405e979d21f986d8b4aefc',
        'clientSecret'  : '2777a9c7e32b89153da98186967f9cb75cf789b9304737ec3761b18bc4373f1f',
        'gitlabURL'     : "https://git.epam.com",
        'callbackURL'   : 'https://everquiz.herokuapp.com/auth/gitlab/callback'
    },

    'vkAuth' : {
        'clientID'      : '5099697', // your App ID
        'clientSecret'  : 'wvIh5Zk1kvZK2ho1bafC', // your App Secret
        'callbackURL'   : 'https://everquiz.herokuapp.com/auth/vkontakte/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '52704386046-917u4gbncibo2jtctjid1mfiuma8enlj.apps.googleusercontent.com',
        'clientSecret'  : 'XvZEZYyKILxR8IVvFNXcUGio',
        'callbackURL'   : 'https://everquiz.herokuapp.com/auth/google/callback'
    }

};
