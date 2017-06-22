$(function () {
    $('#alien').click(function () {
        $('#modal_game_start').modal('show');
    });

    $('#btn_game_start').click(function () {
        $('body').addClass('game_start');
        Game.init();
    });

    $('#btn_continue').click(function () {
        Game.init();
    });

    $('#btn_back').click(function () {
        $('body').removeClass('game_start');
        Game.pause();
    });

    $('#btn_share_fb').click(function () {
        FB.ui({
            method: 'share_open_graph',
            action_type: 'og.likes',
            action_properties: JSON.stringify({
                object: {
                    'og:url': location.href,
                    'og:title': 'modernweb',
                    'og:description': '技術在我們手上，世界就在我們手上'
                }
            })
        }, function (response) {});
    });
})