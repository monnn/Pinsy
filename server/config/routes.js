var auth = require('./auth'),
    userController = require('../controllers/userController'),
    pinController = require('../controllers/pinController');


module.exports = function(app) {
    app.get('/api/users', userController.getUsers);
    app.post('/api/users', userController.createUser);

    app.post('/api/pins', pinController.createPin);
    app.get('/api/pins', pinController.getPins);

    app.post('/pin/like', pinController.likePin);
    app.get('/pin/likes', pinController.getLikes);

    app.post('/pin/comment', pinController.commentPin);
    app.get('/pin/comments', pinController.getComments);

    app.get('/uploadToken', pinController.getUploadToken);

    app.get('/partials/:partialDir/:partialName', function (req, res) {
        res.render('../../public/app/' + req.params.partialDir + '/' + req.params.partialName);
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};
