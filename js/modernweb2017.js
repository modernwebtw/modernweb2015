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
        SpeakerFilter: function() {
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
        filter: function(data, field, value, boolean) {
            return $.grep(data, function(obj) {
                if (typeof obj[field] === 'object') {
                    return (!!~$.inArray(value, obj[field]) == boolean) ? obj : null;
                } else {
                    return ((obj[field] == value) == boolean) ? obj : null;
                }
            });
        },
        showModal: function(speaker) {
            this.Modal_Speaker = speaker;
            $('a[href="#speakerModalAgenda"]').tab('show');
            $('#speakerModal').modal('show');
        },
        arcToSpan: function(str) {
            return str.replace(/\(/igm, '<span>(').replace(/\)/igm, ')</span>');
        }
    },
    filters: {
        time: function(date) {
            var leftPadZero = function(str, n) {
                str = ('' + str);
                return Array(n - str.length + 1).join('0') + str;
            }
            if (!!date) {
                return leftPadZero(date.getHours(), 2) + ':' + leftPadZero(date.getMinutes(), 2);
            }
            return '';
        }
    },
    beforeCreate: function() {
        $.when(
            confapi.getSessionWithSpeaker(),
            confapi.getSpeakerWithSession(),
            // confapi.getSponsor()
        ).done(function(session, speaker, sponsor) {
            modernweb2017.Session = session;
            modernweb2017.Speaker = speaker;
            // modernweb2017.Sponsor = sponsor;

            modernweb2017.$nextTick(function() {
                // fb
                FB.init({
                    appId: '681372298729949'
                });
                // game
                $('#alien').click(function() {
                    $('#modal_game_start').on('shown.bs.modal', function() {
                        $('.modal-backdrop').addClass('game-bg-waring');
                    }).modal('show');
                });

                $('#btn_game_start, #btn_continue').click(function() {
                    gameStart();
                });

                $('#btn_back, #btn_exit').click(function() {
                    gamePause();
                });

                $('#btn_share_fb').click(function() {
                    var score = $('#score').text();
                    FB.ui({
                        method: 'feed',
                        link: location.href,
                        picture: 'http://modernweb.tw/img/social-pic.jpg',
                        description: 'ModernWeb 2017',
                        caption: '消滅外星怪獸，得到了 ' + score + ' 分'
                    }, function(response) {});
                });

                var gameStart = function() {
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

                var gamePause = function() {
                    $('body').removeClass('game_start');
                    Game.pause();
                    toggleScroll(true);
                }

                var toggleScroll = function(boolean) {
                    if (boolean) {
                        $(window).off('scroll touchmove mousewheel');
                    } else {
                        $(window).on('scroll touchmove mousewheel', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            return false;
                        })
                    }
                }

                // scroll menu
                var $window = $(window);
                var $about = $('#about');
                var $menu = $('#menu');
                var $speaker = $('#speaker');
                var timer;
                $window.scroll(function() {
                    if (timer) {
                        window.clearTimeout(timer);
                    }
                    timer = window.setTimeout(function() {
                        $menu.toggleClass('menu--scroll', $window.scrollTop() >= $about.offset().top);
                        var $buy_ticket_btn = $('#buy_ticket');
                        $buy_ticket_btn.toggleClass('active', $window.scrollTop() >= $speaker.offset().top);
                    }, 200);
                });

                // mobile
                $(".menu__burger, .menu__mask").on('click', function() {
                    $(this).toggleClass("on");
                    $('.menu__content').toggleClass("on");
                    $(".menu").toggleClass('on');
                    $('body').toggleClass('is-hidden');
                });

                // scroll
                $('#menu a[href^="#"]:not([href="#"]), #buy_ticket').click(function() {
                    var target = '#' + $(this).attr('href').split('#')[1];
                    goScroll(target);
                    return false;
                });

                function goScroll(target) {
                    var target_top = $(target).offset().top;
                    var header_height = ($('html').width() <= 768) ? 0 : $('#menu').height();
                    var sTop = target_top - header_height;

                    $("html, body").stop().animate({ 
                        scrollTop: sTop
                    }, 1000);
                }
            });
        });
    }
});