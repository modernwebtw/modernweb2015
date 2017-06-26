$(function() {

    $('.typeClass').click(function() {
        var link = $(this).data('href');
        parent.location.href = parent.location.origin + '/' + link;
        return false;
    });

    confapi.getSessionAndSpeaker().then(function(result) {
        // $.each(result, function(i, v) {
        //     if (v['start_time'] == '17:10') {
        //         console.log(i, v.track);
        //     }
        // });

        var SessionTableOpening = [
            760, //8:50
            761, //9:00
            751, //10:00
        ];

        var SessionTableDay = [
            [758, 763, 764, 765, 767, 768], //11:00
            [786, 787, 788, 789, 774, 769], //11:50
            [790, 791, 792, 793, 775, 770], //13:30
            [794, 795, 796, 797, 783, 771], //14:20
            [798, 802, 803, 799, 784, 772], //15:30
            [800, 805, 806, 801, 785, 773], //16:20
            [804, '', '', 782, '', ''] // 17:10
        ];

        var FormValueDay = [
            ['A1', 'B1', 'C1', 'D1', 'E1', 'F1'],
            ['A2', 'B2', 'C2', 'D2', 'E2', 'F2'],
            ['A3', 'B3', 'C3', 'D3', 'E3', 'F3'],
            ['A4', 'B4', 'C4', 'D4', 'E4', 'F4'],
            ['A5', 'B5', 'C5', 'D5', 'E5', 'F5'],
            ['A6', 'B6', 'C6', 'D6', 'E6', 'F6'],
            ['A7', '', '', 'D7', '', '']
        ];

        var cdexpo = new Vue({
            el: 'body',
            data: {
                SessionTable: result,
                SessionTableDay: SessionTableDay,
                SessionTableOpening: SessionTableOpening,
                FormValueDay: FormValueDay
            }
        });

        Vue.nextTick(function() {
            $('.day_1_layout')
                .find('tr:has(td:contains("17:10-17:40"))')
                .find('.selcou')
                .addClass('disabled');

            $('.day_1_layout')
                .find('td:contains("敬請期待")')
                .addClass('disabled');
            $('.day_1_layout')
                .find('td:contains("體驗課程")')
                .addClass('disabled');

            // Verify
            var selcouVerify = function() {
                $('tr:has(td.selcou)').map(function(i, tr) {
                    var TR = $(this);
                    var Count_Selcou = TR.find('.selcou').length;
                    var Count_Disabled = TR.find('.disabled').length;
                    var Count_Active = TR.find('.active').length;

                    if ((Count_Selcou - Count_Disabled) > 0) {
                        $(this).find('td').eq(0).find('.error').remove();
                        if (Count_Active < 1) {
                            $(this).find('td').eq(0).append('<div class="error" style="color: red">請選擇議程</div>');
                        }
                    }
                });

                var day = $('.day_1_layout:visible').find('.error').length;

                $('#submit').removeClass('disabled').prop('disabled', false);
                if ((day) > 0) {
                    $('#submit').addClass('disabled').prop('disabled', true);
                }
            };

            $('.selcou').click(function() {
                var $this = $(this);

                var isDisabled = $this.hasClass('disabled');

                if (isDisabled) {
                    return false;
                }

                var isSelected = $this.hasClass('active');

                if (isSelected) {
                    $this.removeClass('active');
                    $('[value="' + $this.data('value') + '"]').prop('checked', false);
                } else {
                    // var old = $this.parent('tr').find('.active');
                    // old.removeClass('active');
                    // $('[value="' + old.data('value') + '"]').prop('checked', false);
                    $this.addClass('active');
                    $('[value="' + $this.data('value') + '"]').prop('checked', true);
                }

                selcouVerify();
            });

            selcouVerify();
        });
    });
});

var confapi = (function() {
    // config
    var Domain = 'http://confapi.ithome.com.tw';

    var NID = '699';

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
        }
    }
}());
