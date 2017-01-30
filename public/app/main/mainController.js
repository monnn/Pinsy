app.controller('MainController', function ($scope) {

    $('.splash').click(function() {
        $('body').addClass('leaving');
    });

    $('.carousel').carousel({
        interval: 3000
    })

    $('.first-carousel-indicator').addClass('active');
});
