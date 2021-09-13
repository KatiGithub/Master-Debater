import { Injectable } from "@angular/core";

@Injectable({
    'providedIn': 'root'
})

export class Message {
    
    message?: string;
    sender?: string;
    
}