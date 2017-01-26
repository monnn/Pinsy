var auth = require('./auth'),
    userController = require('../controllers/userController'),
    pinController = require('../controllers/pinController'),
    likeController = require('../controllers/likeController'),
    commentController = require('../controllers/commentController');

module.exports = function(app) {
    app.get('/api/users', userController.getUsers);
    app.post('/api/users', userController.createUser);

    app.post('/api/pins', pinController.createPin);
    app.get('/api/pins', pinController.getPins);

    app.post('/pin/like', likeController.likePin);
    app.get('/pin/likes', likeController.getLikes);

    app.post('/pin/comment', commentController.commentPin);
    app.get('/pin/comments', commentController.getComments);

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
