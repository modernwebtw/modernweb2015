var modernweb2017 = new Vue({
    el: '#modernweb2017',
    data: {
        Session: {},
        Speaker: {},
        Sponsor: {},
        Modal_Speaker: {}
    },
    computed: {
        // ModalData: function () {
        //     var Modal_ID = this.Modal_ID;
        //     return this.Speaker[Modal_ID] || {}
        // },
        SpeakerFilter: function () {
            var speaker = this.Speaker;
            return {
                keynote: this.filter(speaker, 'session_type', 'keynote', true),
                session: this.filter(speaker, 'session_type', 'session', true),
                featured: this.filter(speaker, 'role', '關鍵講師', true),
                china: this.filter(speaker, 'tags', 'China', true),
                normal: this.filter(this.filter(speaker, 'role', '講師', true), 'tags', 'China', false)
            }
        }
    },
    methods: {
        filter: function (data, field, value, boolean) {
            return $.grep(data, function (obj) {
                if (typeof obj[field] === 'object') {
                    return (!!~$.inArray(value, obj[field]) == boolean) ? obj : null;
                } else {
                    return ((obj[field] == value) == boolean) ? obj : null;
                }
            });
        },
        showModal: function (speaker) {
            this.Modal_Speaker = speaker;
            $('#speakerModal').modal('show');
        }
    },
    filters: {
        time: function (date) {
            var leftPadZero = function (str, n) {
                str = ('' + str);
                return Array(n - str.length + 1).join('0') + str;
            }
            if (!!date) {
                return leftPadZero(date.getHours(), 2) + ':' + leftPadZero(date.getMinutes(), 2);
            }
            return '';
        }
    },
    beforeCreate: function () {
        $.when(
            confapi.getSessionWithSpeaker(),
            confapi.getSpeakerWithSession(),
            // confapi.getSponsor()
        ).done(function (session, speaker, sponsor) {
            modernweb2017.Session = session;
            modernweb2017.Speaker = speaker;
            // modernweb2017.Sponsor = sponsor;

            modernweb2017.$nextTick(function () {
                // fb
                FB.init({
                    appId: '681372298729949'
                });
                // game
                $('#alien').click(function () {
                    $('#modal_game_start').modal('show');
                });

                $('#btn_game_start, #btn_continue').click(function () {
                    gameStart();
                });

                $('#btn_back, #btn_exit').click(function () {
                    gamePause();
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

                var gameStart = function () {
                    $('html, body').scrollTop(0);
                    $('body').addClass('game_start');
                    var $game = $('#game');
                    var g_w = $game.width();
                    var g_h = $game.height();
                    $game.attr({
                        'width': g_w,
                        'height': g_h
                    });
                    Game.init();
                    toggleScroll(false);
                }

                var gamePause = function () {
                    $('body').removeClass('game_start');
                    Game.pause();
                    toggleScroll(true);
                }

                var toggleScroll = function (boolean) {
                    if (boolean) {
                        $(window).off('scroll touchmove mousewheel');
                    } else {
                        $(window).on('scroll touchmove mousewheel', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        })
                    }
                }
                // game
            });
        });
    }
});