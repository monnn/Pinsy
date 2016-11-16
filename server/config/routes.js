var auth = require('./auth'),
    userController = require('../controllers/userController'),
    pinController = require('../controllers/pinController');


module.exports = function(app) {
    app.get('/api/users', auth.isInRole('admin'), userController.getAllUsers);
    app.post('/api/users', userController.createUser);

    app.get('/api/pins', pinController.getAllPins);
    app.post('/api/pins', pinController.createPin);
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
