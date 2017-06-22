var confapi = confapi || (function () {
    // config
    var Domain = 'http://confapi.ithome.com.tw';
    var currentData = document.currentScript || {};
    currentData = currentData.dataset || {};
    var NID = currentData.nid || 1838;
    var LOG = currentData.log || false;
    var CACHE = {};
    // private method
    var getJSONP = function (type) {
        var deferred = $.Deferred();
        var api = Domain + '/api/v1.3/' + type + '.jsonp?nid=' + NID + '&callback=?';

        if (!!CACHE[type]) {
            return deferred.resolve(CACHE[type]);
        } else {
            $.getJSON(api).then(function (response) {
                CACHE[type] = response;
                return deferred.resolve(response);
            }).fail(function () {
                return deferred.reject(api);
            });
        }
        return deferred.promise();
    };

    var ConvertEmptyArrayToString = function (rowData, arrayKey) {
        for (var i = 0; i < arrayKey.length; i++) {
            var key = arrayKey[i];
            rowData[key] = (rowData[key].length === 0) ? '' : rowData[key];
        }
        return rowData;
    };

    // public method
    return {
        getSession: function () {
            return getJSONP('sessionlist').then(function (response) {
                return $.map(response, function (rowData, index) {
                    rowData = ConvertEmptyArrayToString(rowData, [
                        'title',
                        'classroom',
                        'track',
                        'summary',
                        'sponsor',
                        'download_link',
                        'language',
                        'forum_type'
                    ]);
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
        getSpeaker: function () {
            return getJSONP('spk').then(function (response) {
                return $.map(response, function (rowData, index) {
                    rowData = ConvertEmptyArrayToString(rowData, [
                        'company',
                        'company_url',
                        'department',
                        'position',
                        'profile',
                        'role',
                        'which_session'
                    ]);
                    // fixed null avatar
                    if (!!rowData['avatar'].length) {
                        rowData['avatar'] = Domain + rowData['avatar'];
                    } else {
                        rowData['avatar'] = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
                    }
                    rowData['speaker'] = rowData['speaker'];
                    rowData['position'] = rowData['position'].replace(/&amp;/, '&');
                    rowData['hash_path'] = 'speaker.html#s' + rowData['target_id'];
                    return rowData;
                });
            });
        },
        getSponsor: function () {
            return getJSONP('sponsorlist').then(function (response) {
                return $.map(response, function (rowData, index) {
                    rowData = ConvertEmptyArrayToString(rowData, [
                        'title',
                        'alt_title',
                        'description',
                        'official_site'
                    ]);
                    rowData['logo'] = Domain + rowData['logo'];
                    rowData['hash_path'] = 'sponsor-inner.html#s' + rowData['vendor_id'];
                    // fixed google icon
                    rowData['social_links'] = $(rowData['social_links']).map(function (index, social_link) {
                        if (social_link['service'] == 'googleplus') {
                            social_link['service'] = 'google-plus';
                        }
                        return social_link;
                    }).get();
                    // ===
                    return rowData;
                });
            });
        },
        getSessionWithSpeaker: function () {
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
                    // fixed time
                    var sessioin_date = rowData['sessioin_date'];
                    rowData['start_Date'] = new Date(sessioin_date.value + ' ' + sessioin_date.timezone_db);
                    rowData['end_Date'] = new Date(sessioin_date.value2 + ' ' + sessioin_date.timezone_db);;
                    return rowData;
                });
                var SessionData = {};
                for (var i = 0; i < Session.length; i++) {
                    var session_id = Session[i]['session_id'];
                    SessionData[session_id] = Session[i];
                };
                // test
                // (function () {
                //     var timeSection = {};
                //     $.map(SessionData, function (session) {
                //         var leftPadZero = function (str, n) {
                //             str = ('' + str);
                //             return Array(n - str.length + 1).join('0') + str;
                //         }
                //         var sDate = session.start_Date;
                //         var track = session.track || 'keynote';
                //         var sTime = leftPadZero(sDate.getHours(), 2) + ':' + leftPadZero(sDate.getMinutes(), 2);
                //         timeSection[sTime] = timeSection[sTime] || {
                //             'keynote': 0,
                //             'Track A': 0,
                //             'Track B': 0,
                //             'Track C': 0,
                //             'Track D': 0,
                //             'Track E': 0,
                //             'Track F': 0,
                //             'Track G': 0,
                //             'Track H': 0,
                //             'Track I': 0
                //         };
                //         timeSection[sTime][track] = timeSection[sTime][track] || {};
                //         timeSection[sTime][track] = session.session_id;
                //     });
                //     console.table(timeSection);
                //     // part 2
                //     var newTimeSection = {};
                //     for (time in timeSection) {
                //         newTimeSection[time] = newTimeSection[time] || [];
                //         var Section = timeSection[time];
                //         for (track in Section) {
                //             var sID = Section[track];
                //             if (!!sID) {
                //                 newTimeSection[time].push(sID);
                //             }
                //         }
                //     };
                //     console.table(newTimeSection);
                // }())
                // ====
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
                            // fixed time
                            var sessioin_date = v['sessioin_date'];
                            var leftPadZero = function (str, n) {
                                str = ('' + str);
                                return Array(n - str.length + 1).join('0') + str;
                            }
                            var date = new Date(sessioin_date.value + ' ' + sessioin_date.timezone_db);
                            var time = leftPadZero(date.getHours(), 2) + ':' + leftPadZero(date.getMinutes(), 2);
                            // end fixed time
                            SessionData[value.target_id].push({
                                'title': v.title,
                                'track': v.track,
                                'summary': v.summary,
                                'session_id': v.session_id,
                                'session_type': v.session_type,
                                'time': time
                            });
                        });
                    }
                });
                var SpeakerData = $.map(Speaker, function (rowData) {
                    var session = SessionData[rowData.target_id] || [];
                    rowData['session'] = session;
                    rowData['session_type'] = '';
                    if (session.length > 0) {
                        rowData['session_type'] = session[0]['session_type'];
                    }
                    return rowData;
                });
                return SpeakerData;
            });
        }
    }
}());