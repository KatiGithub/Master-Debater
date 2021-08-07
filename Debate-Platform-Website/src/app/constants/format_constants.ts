import { Injectable } from "@angular/core"


@Injectable()
export class FormatConstants {
    static formats = {
        'Parliamentary Debates': {
            'minutesperspeech': [7, 8, 8, 8, 4, 4],
            'teamname' : ['Government', 'Opposition'],
            'positions': ['Prime Minister', 'Leader of the Opposition', 'Member of the Government', 'Member of the Opposition', 'Leader of the Opposition'],
            // 'debatesequence' : ['']
        },
        'WSDC': {
            'minutesperspeech' : [8, 8, 8, 8, 8, 8, 4, 4],
            'teamname' : ['Proposition', 'Opposition'],
            'positions' : ['Proposition 1', 'Proposition 2', 'Proposition 3', 'Opposition 1', 'Opposition 2', 'Opposition 3'],
            // 'debatesequence' : ['']
        },
        'British Parliamentary Debate' : {
            'minutesperspeech' : [7, 7, 7, 7, 7, 7, 7, 7],
            'teamname' : ['Government', 'Opposition'],
            'positions' : ['Prime Minister', 'Leader of Opposition', 'Deputy Prime Minister', 'Deputy Leader of Opposition', 'Member of Government', 'Member of Opposition', 'Government Whip', 'Opposition Whip'],
            // 'debatesequence' : ['1st proposition', '1st opposition', ]
            
        },
        'Team Policy Debate' : {
            'minutesperspeech' : [8, 8, 8, 8, 4, 4, 4, 4],
            'teamname' : ['Affirmative', 'Negative'],
            'positions' : ['1st Affirmative', '2nd Affirmative', '1st Negative', '2nd Negative'],
            // 'debatesequence' : ['1st Affirmative Constructive', '1st Negative Constructive', '2nd Affirmative Constructive', '2nd Negative Constructive', '1st Negative Rebuttal', '1 Affirmative Rebuttal', '2nd Negative Rebuttal', '2 Affirmative Rebuttal']
        }
        
    }
}