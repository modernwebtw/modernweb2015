// navbar fixed 

jQuery(document).ready(function($) {

    // Fixa navbar ao ultrapassa-lo
    var navbar = $('#nav'),
        distance = navbar.offset().top,
        $window = $(window);

    $window.scroll(function() {
        if ($window.scrollTop() >= distance) {
            navbar.css('position', 'fixed');
            // navbar.removeClass('navbar-fixed-top').addClass('navbar-fixed-top');
            // $("body").css("padding-top", "200px");
        } else {
            navbar.css('position', 'relative');
            // navbar.removeClass('navbar-fixed-top');
            // $("body").css("padding-top", "0px");
        }
    });

});

$(function() {
    Vue.filter('rank', function(data, rank) {
        return $.grep(data, function(obj) {
            return (obj.rank == rank) ? obj : null;
        });
    });

    Vue.filter('tag', function(data, tag) {
        return $.grep(data, function(obj) {
            var checkTag = null;
            $.each(obj.tags, function(i, v) {
                if (v == tag) {
                    checkTag = obj;
                }
            });
            return checkTag;
        });
    });

    Vue.filter('filter', function(obj, field, value) {
        return $.grep(Object.keys(obj), function(key) {
            var checkData = null;
            if (obj[key][field] == value) {
                checkData = obj;
            }
            return checkData;
        });
    });

    confapi.getSessionAndSpeaker().then(function(result) {
        // $.each(result, function(i, v) {
        //     if (v.start_time == '17:10') {
        //         console.log(i, v.track);
        //     }
        // });

        var SessionTableOpening1 = [
            1186, //9:30
            1044, //9:40
            1073, //10:30
        ];

        var SessionTableOpening2 = [
            1044, //9:30
            1044, //9:40
            1073, //10:30
        ];

        var SessionTableDay1 = [
            [1076, 1066, 1060], //11:50
            [1188], //12:30
            [1054, 1179, 1047], //13:30
            [1190], //14:10
            [1062, 1067, 1069], //14:20
            [1191], //15:00
            [1046, 1052, 1199], //15:30
            [1192], //16:10
            [1063, 1198, 1053], //16:20            
        ];

        var SessionTableDay2 = [
            [1076, 1066, 1060], //11:50
            [776], //12:30
            [1076, 1066, 1060], //13:30
            [777], //14:10
            [1076, 1066, 1060], //14:20
            [778], //15:00
            [1076, 1066, 1060], //15:30
            [779], //16:10
            [1076, 1066, 1060], //16:20            
        ];

        var modernweb = new Vue({
            el: 'body',
            data: {
                sponsorList: [],
                speakerList: [],
                articleList: [],
                SessionTable: result,
                SessionTableDay: SessionTableDay1,
                SessionTableOpening1: SessionTableOpening1,
                SessionTableOpening2: SessionTableOpening2
            }
        });

        $.when(confapi.getSponsor(), confapi.getSpeakerWithSession()).then(function(Sponsor, SpeakerWithSession) {
            modernweb.$set('sponsorList', Sponsor);
            modernweb.$set('speakerList', SpeakerWithSession);


        });


        $.when(confapi.getSponsor(), confapi.getSpeaker()).then(function(Sponsor, Speaker) {
            modernweb.$set('sponsorList', Sponsor);
            modernweb.$set('speakerList', Speaker);

            if (!!location.hash) {
                var tempHash = location.hash;
                // location.hash = '';
                Vue.nextTick(function() {
                    var nrOfImages = $(".speker-pic img, .speakers-production img").length;
                    if (!!nrOfImages) {
                        $(".speker-pic > img, .speakers-production img").load(function() {
                            if (--nrOfImages == 0) {
                                // Function goes here
                                goScroll(tempHash);
                            }
                        });
                    } else {
                        goScroll(tempHash);
                    }
                });
            }
        });

        $('.linkPage').click(function() {
            var target = $(this).find('a').attr('href');
            goScroll(target);
            return false;
        });

        // $.getJSON("http://www.ithome.com.tw/services/data/list-cloud-news.jsonp?callback=?").then(function(article) {
        //     modernweb.$set('articleList', article);
        // })
    });
});

var confapi = (function() {
    // config
    var Domain = 'http://confapi.ithome.com.tw';

    var NID = '981';

    var LOG = false;

    var CACHE = false;

    // private method
    var error = function() {
        var str = Array.prototype.join.call(arguments, ' ');
        // console.log('%cConfAPI：' + str, "font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #fff; font-size: 12px; padding: 5px; background: #444; border-radius: 4px; line-height: 40px; text-shadow: 0 1px #000");
    };

    var getJSONP = function(type) {
        var deferred = $.Deferred();

        var api = Domain + '/api/' + type + '.jsonp?nid=' + NID + '&callback=?';

        $.getJSON(api).then(function(response) {
            return deferred.resolve(response);
        }).fail(function() {
            error('「not found', api, '」');

            return deferred.reject(api);
        });

        return deferred.promise();
    };

    var removeArray = function(arr) {
        return (arr.length === 0) ? '' : arr;
    };

    // public method
    return {
        getSession: function() {
            return getJSONP('sessionlist').then(function(response) {
                return $.map(response, function(rowData, index) {
                    rowData['title'] = removeArray(rowData['title']);

                    rowData['classroom'] = removeArray(rowData['classroom']);

                    rowData['track'] = removeArray(rowData['track']);

                    rowData['summary'] = removeArray(rowData['summary']);

                    rowData['sponsor'] = removeArray(rowData['sponsor']);

                    rowData['download_link'] = removeArray(rowData['download_link']);

                    rowData['language'] = removeArray(rowData['language']);

                    rowData['forum_type'] = removeArray(rowData['forum_type']);

                    rowData['session_start'] = rowData['session_start'] + '000';

                    rowData['session_end'] = rowData['session_end'] + '000';

                    var SD = new Date(+rowData['session_start']);

                    var ED = new Date(+rowData['session_end']);

                    rowData['date'] = (SD.getMonth() + 1) + '/' + SD.getDate();

                    rowData['start_time'] = (SD.getHours()) + ':' + ((SD.getMinutes()) == 0 ? '00' : SD.getMinutes());

                    rowData['end_time'] = (ED.getHours()) + ':' + ((ED.getMinutes()) == 0 ? '00' : ED.getMinutes());

                    rowData['hash_path'] = 'speaker.html#s';

                    return rowData;
                });
            });
        },
        getSpeaker: function() {
            return getJSONP('speakerlist').then(function(response) {
                return $.map(response, function(rowData, index) {
                    rowData['avatar'] = Domain + rowData['avatar'];

                    rowData['speaker'] = rowData['speaker'];

                    rowData['company'] = removeArray(rowData['company']);

                    rowData['company_url'] = removeArray(rowData['company_url']);

                    rowData['department'] = removeArray(rowData['department']);

                    rowData['position'] = removeArray(rowData['position']);

                    rowData['role'] = removeArray(rowData['role']);

                    rowData['which_session'] = removeArray(rowData['which_session']);

                    rowData['hash_path'] = 'speaker.html#s' + rowData['target_id'];

                    return rowData;
                });
            });
        },
        getSponsor: function() {
            return getJSONP('sponsorlist').then(function(response) {
                return $.map(response, function(rowData, index) {
                    rowData['title'] = removeArray(rowData['title']);

                    rowData['description'] = removeArray(rowData['description']);

                    rowData['official_site'] = removeArray(rowData['official_site']);

                    rowData['logo'] = Domain + rowData['logo'];

                    rowData['hash_path'] = 'sponsors.html#s' + rowData['official_site_title'];

                    return rowData;
                });
            });
        },
        getSessionAndSpeaker: function() {
            return $.when(this.getSession(), this.getSpeaker()).then(function(Session, Speaker) {
                var SpeakerData = {};

                for (var i = 0; i < Speaker.length; i++) {
                    var target_id = Speaker[i]['target_id'];

                    SpeakerData[target_id] = Speaker[i];
                };

                Session = $.map(Session, function(rowData) {
                    rowData['speaker'] = $.map(rowData['speaker'], function(data) {
                        var target_id = data['target_id'];
                        if (!!SpeakerData[target_id] && data['target_id'] == SpeakerData[target_id]['target_id']) {
                            // add hash
                            var hash = rowData['hash_path'] + data['target_id'];

                            SpeakerData[target_id]['hash_path'] = hash;

                            data = SpeakerData[target_id];

                        }

                        return data;
                    });

                    return rowData;
                });

                var SessionData = {};

                for (var i = 0; i < Session.length; i++) {
                    var session_id = Session[i]['session_id'];

                    SessionData[session_id] = Session[i];
                };

                return SessionData;
            });
        },
        getSpeakerWithSession: function() {
            return $.when(this.getSession(), this.getSpeaker()).then(function(Session, Speaker) {
                var SessionData = {};

                $.each(Session, function(i, v) {
                    if (!!v.speaker.length) {
                        $.each(v.speaker, function(index, value) {
                            SessionData[value.target_id] = SessionData[value.target_id] || [];
                            SessionData[value.target_id].push({
                                title: v.title,
                                summary: v.summary
                            });
                        });
                    }
                });

                var SpeakerData = $.map(Speaker, function(rowData) {
                    rowData['session'] = SessionData[rowData.target_id];

                    return rowData;
                });

                return SpeakerData;
            });
        }
    }
}());

function goScroll(target) {
    var target_top = $(target).offset().top;
    var header_height = $('#nav').height() + $('#navXs').height() + 71;
    var sTop = target_top - header_height;

    $("html, body").stop().animate({
        scrollTop: sTop
    }, 1000, function() {
        location.hash = target;
    });
}
