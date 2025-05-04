import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { OptionsService } from '../shared/options.service';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule, MatButtonModule, FormsModule, HttpClientModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent implements OnInit, OnDestroy {
  originalLecture: string = `
On November 19, 1863, Abraham Lincoln delivered one of the most famous speeches in American history: the Gettysburg Address.  
The Union victory at Gettysburg was a key moment in the Civil War—thwarting General Robert E. Lee's invasion of the North.  
President Lincoln offered this brief speech in a dedication ceremony for a new national cemetery near the Gettysburg battlefield.  
Lincoln was not even the featured speaker that day.  Noted orator Edward Everett spoke for nearly two hours, while Lincoln spoke for a mere two minutes.  
In his powerful address, Lincoln embraced the Declaration of Independence, 
recalling how the nation was "conceived in Liberty, and dedicated to the proposition that all men are created equal."  
By resurrecting these promises, Lincoln committed post-Civil War America to "a new birth of freedom."  
Following the Civil War, the Reconstruction Amendments—the Thirteenth, Fourteenth, and Fifteenth Amendments—abolished slavery, 
wrote the Declaration of Independence's commitment to freedom and equality into the Constitution, and promised to ban racial discrimination in voting.  
In so doing, the amendments sought to make Lincoln's "new birth of freedom" a constitutional reality.
`;
  gamifiedLecture: string = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  private currentOptionsString: string = '';
  private optionsSubscription: Subscription | undefined;

  constructor(private http: HttpClient, private optionsService: OptionsService) { }

  ngOnInit(): void {
    this.optionsSubscription = this.optionsService.currentOptions.subscribe(options => {
      this.currentOptionsString = options;
      console.log('ContentComponent received options:', this.currentOptionsString);
    });
  }

  ngOnDestroy(): void {
    this.optionsSubscription?.unsubscribe();
  }

  gamifyLecture(): void {
    if (!this.originalLecture || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.gamifiedLecture = '';
    this.errorMessage = null;

    const apiUrl = 'http://127.0.0.1:8000/api/generate';


    // prompt: `Make the following text entertaining for 6th graders using Star Wars references: ${this.originalLecture}`

    const instruction = `. Make the following text entertaining. Break it up into sections and add a quiz after each section.`;
    const promptPayload = `${instruction} ${this.currentOptionsString}: ${this.originalLecture}`;
    console.log('*** Sending prompt:', promptPayload);

    this.http.post<{ response: string }>(apiUrl, {
      prompt: promptPayload
    }).subscribe({
      next: (response) => {
        this.gamifiedLecture = response.response;
        this.optionsService.updateGamifiedLecture(this.gamifiedLecture);
        this.isLoading = false;
        console.log('* gamifiedLecture:', this.gamifiedLecture);
        console.log('* response:', response);
      },
      error: (error) => {
        console.error('Error calling API:', error);
        this.errorMessage = `Failed to gamify the lecture: ${error.error?.detail || 'Unknown error'}`;
        this.gamifiedLecture = 'Error processing request.';
        this.isLoading = false;
        console.log('* error:', error);
      }
    });
  }
}
