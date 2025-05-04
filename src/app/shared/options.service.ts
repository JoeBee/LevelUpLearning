import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OptionsService {
    private optionsSource = new BehaviorSubject<string>('');
    currentOptions = this.optionsSource.asObservable();

    constructor() { }

    updateOptions(options: string): void {
        this.optionsSource.next(options);
        console.log('OptionsService updated:', options); // For debugging
    }
} 