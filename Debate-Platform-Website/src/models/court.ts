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
    startTime?: Date;
    state?: Number = 0;
    participants?: [] = []
}