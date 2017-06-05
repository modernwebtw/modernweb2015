// navbar fixed

jQuery(document).ready(function ($) {

    // Fixa navbar ao ultrapassa-lo
    var navbar = $('#nav'),
        distance = navbar.offset().top,
        $window = $(window);

    $window.scroll(function () {
        if ($window.scrollTop() >= distance) {
            navbar.css('position', 'fixed');
            $("body").css("padding-top", navbar.height());
        } else {
            navbar.css('position', 'relative');
            $("body").css("padding-top", "0px");
        }
    });

});

$(function () {
    Vue.filter('rank', function (data, rank) {
        return $.grep(data, function (obj) {
            return (obj.rank == rank) ? obj : null;
        });
    });

    Vue.filter('tag', function (data, tag) {
        return $.grep(data, function (obj) {
            var checkTag = null;
            $.each(obj.tags, function (i, v) {
                if (v == tag) {
                    checkTag = obj;
                }
            });
            return checkTag;
        });
    });

    Vue.filter('filter', function (obj, field, value) {
        return $.grep(Object.keys(obj), function (key) {
            var checkData = null;
            if (obj[key][field] == value) {
                checkData = obj;
            }
            return checkData;
        });
    });

    confapi.getSessionAndSpeaker().then(function (result) {

        var SessionTableOpening1 = [
            1186, //9:30
            1044, //9:40
            1073, //10:30
        ];

        var SessionTableOpening2 = [
            1192, //9:30
            1045, //9:40
            1065, //10:30
        ];

        var SessionTableDay1 = [
            [1076, 1066, 1060], //11:50-12:30
            [1188], //12:30-13:30
            [1054, 1179, 1047], //13:30-14:10
            [1189], //14:10-14:20
            [1062, 1067, 1069], //14:20-15:00
            [1190], //15:00-15:30
            [1046, 1056, 1205], //15:30-16:10
            [1191], //16:10-16:20
            [1063, 1198, 1053], //16:20
        ];

        var SessionTableDay2 = [
            [1049, 1051, 1058], //11:50-12:30
            [1194], //12:30-13:30
            [1059, 1050, 1055], //13:30-14:10
            [1195], //14:10-14:20
            [1048, 1052, 1061], //14:20-15:00
            [1196], //15:00-15:30
            [1064, 1200, 1068], //15:30-16:10
            [1197], //16:10-16:20
            [1074, 1057, 1201], //16:20
        ];

        var modernweb = new Vue({
            el: 'body',
            data: {
                sponsorList: [],
                speakerList: [],
                articleList: [],
                SessionTable: result,
                SessionTableDay1: SessionTableDay1,
                SessionTableDay2: SessionTableDay2,
                SessionTableOpening1: SessionTableOpening1,
                SessionTableOpening2: SessionTableOpening2
            }
        });

        $.when(confapi.getSponsor(), confapi.getSpeakerWithSession()).then(function (Sponsor, Speaker) {
            modernweb.$set('sponsorList', Sponsor);
            modernweb.$set('speakerList', Speaker);

            if (!!location.hash) {
                var tempHash = location.hash;
                Vue.nextTick(function () {
                    var nrOfImages = $(".speker-pic img, .speakers-production img").length;
                    if (!!nrOfImages) {
                        $(".speker-pic > img, .speakers-production img").load(function () {
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

        $('a[href^="#"]:not([href="#"])').click(function () {
            var target = '#' + $(this).attr('href').split('#')[1];
            goScroll(target);
            return false;
        });
    });
});

var confapi = (function () {
    // config
    var Domain = 'http://confapi.ithome.com.tw';

    var NID = '981';

    var LOG = false;

    var CACHE = false;

    // private method
    var error = function () {
        var str = Array.prototype.join.call(arguments, ' ');
        // console.log('%cConfAPI：' + str, "font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #fff; font-size: 12px; padding: 5px; background: #444; border-radius: 4px; line-height: 40px; text-shadow: 0 1px #000");
    };

    var getJSONP = function (type) {
        var deferred = $.Deferred();

        var api = Domain + '/api/' + type + '.jsonp?nid=' + NID + '&callback=?';

        $.getJSON(api).then(function (response) {
            return deferred.resolve(response);
        }).fail(function () {
            error('「not found', api, '」');

            return deferred.reject(api);
        });

        return deferred.promise();
    };

    var removeArray = function (arr) {
        return (arr.length === 0) ? '' : arr;
    };

    // public method
    return {
        getSession: function () {
            return getJSONP('sessionlist').then(function (response) {
                return $.map(response, function (rowData, index) {
                    rowData['title'] = removeArray(rowData['title']);

                    rowData['classroom'] = removeArray(rowData['classroom']);

                    rowData['track'] = removeArray(rowData['track']);

                    rowData['summary'] = removeArray(rowData['summary']);

                    rowData['sponsor'] = removeArray(rowData['sponsor']);

                    rowData['download_link'] = removeArray(rowData['download_link']);

                    rowData['language'] = removeArray(rowData['language']);

                    rowData['forum_type'] = removeArray(rowData['forum_type']);

                    // fixed time
                    var sessioin_date = rowData['sessioin_date'];
                    rowData['start_Date'] = new Date(sessioin_date.value + ' ' + sessioin_date.timezone_db);
                    rowData['end_Date'] = new Date(sessioin_date.value2 + ' ' + sessioin_date.timezone_db);

                    var SD = new Date(rowData['start_Date']);

                    var ED = new Date(rowData['start_Date']);

                    rowData['date'] = (SD.getMonth() + 1) + '/' + SD.getDate();

                    rowData['start_time'] = (SD.getHours()) + ':' + ((SD.getMinutes()) == 0 ? '00' : SD.getMinutes());

                    rowData['end_time'] = (ED.getHours()) + ':' + ((ED.getMinutes()) == 0 ? '00' : ED.getMinutes());

                    rowData['hash_path'] = 'speaker.html#s';

                    return rowData;
                });
            });
        },
        getSpeaker: function () {
            return getJSONP('speakerlist').then(function (response) {
                return $.map(response, function (rowData, index) {
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
        getSponsor: function () {
            return getJSONP('sponsorlist').then(function (response) {
                return $.map(response, function (rowData, index) {
                    rowData['title'] = removeArray(rowData['title']);

                    rowData['description'] = removeArray(rowData['description']);

                    rowData['official_site'] = removeArray(rowData['official_site']);

                    rowData['logo'] = Domain + rowData['logo'];

                    rowData['hash_path'] = 'sponsors.html#s' + rowData['official_site_title'];

                    return rowData;
                });
            });
        },
        getSessionAndSpeaker: function () {
            return $.when(this.getSession(), this.getSpeaker()).then(function (Session, Speaker) {
                var SpeakerData = {};

                for (var i = 0; i < Speaker.length; i++) {
                    var target_id = Speaker[i]['target_id'];

                    SpeakerData[target_id] = Speaker[i];
                };

                Session = $.map(Session, function (rowData) {
                    rowData['speaker'] = $.map(rowData['speaker'], function (data) {
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
        getSpeakerWithSession: function () {
            return $.when(this.getSession(), this.getSpeaker()).then(function (Session, Speaker) {
                var SessionData = {};

                $.each(Session, function (i, v) {
                    if (!!v.speaker.length) {
                        $.each(v.speaker, function (index, value) {
                            SessionData[value.target_id] = SessionData[value.target_id] || [];
                            SessionData[value.target_id].push({
                                title: v.title,
                                summary: v.summary
                            });
                        });
                    }
                });

                var SpeakerData = $.map(Speaker, function (rowData) {
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
    var header_height = $('#nav').height() + $('#navXs').height();
    var sTop = target_top - header_height;

    $("html, body").stop().animate({
        scrollTop: sTop
    }, 1000, function () {
        location.hash = target;
    });
}