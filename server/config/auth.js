module.exports = {

    'facebookAuth' : {
        'clientID'      : 'your-secret-clientID-here', // your App ID
        'clientSecret'  : 'your-client-secret-here', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

    'vkAuth' : {
        'clientID'      : '5099697', // your App ID
        'clientSecret'  : 'wvIh5Zk1kvZK2ho1bafC', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/vkontakte/callback'
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '52704386046-917u4gbncibo2jtctjid1mfiuma8enlj.apps.googleusercontent.com',
        'clientSecret'  : 'XvZEZYyKILxR8IVvFNXcUGio',
        'callbackURL'   : 'http://localhost:3000/auth/google/callback'
    }

};