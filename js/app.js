var modernweb = new Vue({
    el: '#app',
    data: function() {
        return {
            sponsorList: [],
            speakerList: []
        }
    },
    ready: function() {
        $.when(confapi.getSponsor(), confapi.getSpeaker()).then(function(Sponsor, Speaker) {
            this.$set('sponsorList', Sponsor);
            this.$set('speakerList', Speaker);
            this.$nextTick(function() {
                this.checkImageLoaded('#key-spe img, #speakers img').then(function(){
                    location.hash && goScroll(location.hash);
                });
            });
        }.bind(this));
    },
    methods: {
        checkImageLoaded: function(selector) {
            var deferred = $.Deferred();
            var $ajaxImage = $(selector);
            var ImageNum = $ajaxImage.length;
            if (ImageNum > 0) {
                $ajaxImage.load(function() {
                    (--ImageNum == 0) && deferred.resolve();
                });
            } else {
                deferred.resolve();
            }
            return deferred.promise();
        }
    }
});


function goScroll(target) {
    var selector = target || 'body';
    var target_top = $(selector).offset().top;
    var header_height = $('#nav').height() + $('#navXs').height();
    var sTop = target_top - header_height;
    $("html, body").stop().animate({
        scrollTop: sTop
    }, 500);
}

$(function() {
    var navbar = $('#nav');
    var distance = navbar.offset().top;
    var $window = $(window);

    $window.scroll(function() {
        var position = ($window.scrollTop() >= distance) ? 'fixed' : 'relative';
        navbar.css('position', position);
    });

    $('a[href^="#"]:not([href="#"])').click(function() {
        var target = $(this).attr('href');
        goScroll(target);
        return false;
    });
});