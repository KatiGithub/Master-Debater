export class Court {
    courtid?: Number;
    debate_room?: {
        'current_speaker': String,
        'current_speaker_startTime': Date,
        'debate_order': []
    } = {
        'current_speaker': '',
        'current_speaker_startTime': new Date(),
        'debate_order': []
    };
    decision_room1?: [] = [];
    decision_room2?: [] = [];
    debate_format?: String =  '';
    preproom1?: [] = [];
    preproom2?: [] = [];
    startTime?: Date = new Date();
    state?: Number = 0;
    participants?: Object = {
        'audience': [],
        'judges': [],
        'team1': [],
        'team2': []
    }

    host?: Object = {
        'email': JSON.parse(localStorage.getItem('current_user')!)['email'],
        'webrtc_token': ''
    }
}