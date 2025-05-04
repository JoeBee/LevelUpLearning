import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OptionsService {
    private optionsSource = new BehaviorSubject<string>('');
    currentOptions = this.optionsSource.asObservable();

    private gamifiedLectureSource = new BehaviorSubject<string>('');
    currentGamifiedLecture = this.gamifiedLectureSource.asObservable();

    constructor() { }

    updateOptions(options: string): void {
        this.optionsSource.next(options);
        console.log('OptionsService updated:', options); // For debugging
    }

    updateGamifiedLecture(lecture: string): void {
        this.gamifiedLectureSource.next(lecture);
        console.log('OptionsService gamified lecture updated.'); // For debugging
    }
} 