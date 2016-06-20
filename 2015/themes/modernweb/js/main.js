jQuery(document).ready(function($) {

    /* ===== Plugin - Headhesive ===== */

    // var options = {
    //     offset: '#showHere',
    //     classes: {
    //         clone:   'banner--clone',
    //         stick:   'banner--stick',
    //         unstick: 'banner--unstick'
    //     }
    // };

    // Optimalisation: Store the references outside the event handler:
    // function checkWidth() {
    //     var windowsize = $(window).width();
    //     if (windowsize > 992) {
    //         //if the window is greater than 992px wide then turn on headhesive.js.
    //         var banner = new Headhesive('#header', options);
    //     }
    // }
    // // Execute on load
    // checkWidth();
    // // Bind event listener
    // $(window).resize(checkWidth);

    // Mobile menu
    $('#mobile-btn').click(function(e){
        $('body').toggleClass('open-menu');
    });

    // Make height of .post-item equal width
    $('#news').find('.post-item').height($('.post-item').width());
    $(window).resize(function(){
        $('#news').find('.post-item').height($('.post-item').width());
    });

    // Headhesive destroy
    // banner.destroy();
	/* effects related to images need to be bind in window.load */
	$(window).load(function(){		
	});

    // Go tp top
    var offset = 220;
    var duration = 500;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
    });
    
    jQuery('.back-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })

});