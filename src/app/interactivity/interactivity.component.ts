import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { OptionsService } from '../shared/options.service';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-interactivity',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownModule
  ],
  templateUrl: './interactivity.component.html',
  styleUrl: './interactivity.component.css'
})
export class InteractivityComponent implements OnInit, OnDestroy {
  gamifiedLectureContent: string = '';
  private lectureSubscription: Subscription | undefined;

  constructor(private optionsService: OptionsService) { }

  ngOnInit(): void {
    this.lectureSubscription = this.optionsService.currentGamifiedLecture.subscribe(content => {
      this.gamifiedLectureContent = content;
      console.log('InteractivityComponent received content:', content ? content.substring(0, 50) + '...' : '');
    });
  }

  ngOnDestroy(): void {
    this.lectureSubscription?.unsubscribe();
  }
}
