var confapi = (function() {
    var DOMAIN = 'https://confapi.ithome.com.tw';
    var NID = '981';
    var LOG = false;
    var CACHE = false;

    var error = function() {
        var str = Array.prototype.join.call(arguments, ' ');
        console.log('%cConfAPI：' + str, "font-family: \'Helvetica Neue\', Helvetica, Arial, sans-serif; color: #fff; font-size: 12px; padding: 5px; background: #444; border-radius: 4px; line-height: 40px; text-shadow: 0 1px #000");
    };

    var getJSONP = function(type) {
        var deferred = $.Deferred();
        var api = DOMAIN + '/api/' + type + '.jsonp?nid=' + NID + '&callback=?';
        $.getJSON(api).then(function(response) {
            deferred.resolve(response);
        }).fail(function() {
            error('「not found', api, '」');
            deferred.reject(api);
        });
        return deferred.promise();
    };

    var removeArray = function(arr) {
        return (arr.length === 0) ? '' : arr;
    };

    return {
        getSession: function() {
            return getJSONP('sessionlist').then(function(response) {
                return $.map(response, function(rowData, index) {
                    rowData['title'] = removeArray(rowData['title']);
                    rowData['classroom'] = removeArray(rowData['classroom']);
                    rowData['track'] = removeArray(rowData['track']);
                    rowData['summary'] = removeArray(rowData['summary']);
                    rowData['sponsor'] = removeArray(rowData['sponsor']);
                    rowData['download_link'] = removeArray(-rowData['download_link']);
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
                    rowData['avatar'] = DOMAIN + rowData['avatar'];
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
                    rowData['logo'] = DOMAIN + rowData['logo'];
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
