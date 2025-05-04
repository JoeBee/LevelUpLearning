import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [MatButtonModule, FormsModule, HttpClientModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  originalLecture: string = `Alright class, settle down! Today, we're diving into the amazing world of cells, the tiny building blocks of all living things – from the tallest trees to the smallest bacteria, and yes, even you! Think of them like the individual LEGO bricks that make up a giant castle. Each cell, though microscopic, is a bustling city of activity, constantly working to keep the organism alive. We'll explore the main parts of a typical cell, like the nucleus, which acts as the cell's control center holding all the important instructions (DNA!), and the cytoplasm, a jelly-like substance where all the other important stuff happens.

Next up, we'll zoom in on some key players within the cell. Imagine tiny power plants called mitochondria, responsible for producing the energy the cell needs to function – we often call them the "powerhouses of the cell." Then there are ribosomes, the little factories that churn out proteins, essential for everything from building new cell parts to carrying out chemical reactions. And in plant cells, we'll discover chloroplasts, amazing structures that capture sunlight to make food through a process called photosynthesis – that's how plants get their energy!

Finally, we'll touch upon how these individual cells work together. Just like those LEGO bricks can be arranged in countless ways to build different structures, different types of cells organize themselves to form tissues, like muscle tissue or nerve tissue. These tissues then work together to create organs, like your heart or your lungs, and ultimately, these organs form entire organ systems that keep us alive and kicking. So, even though they're small, cells are truly the foundation of all life! Any initial questions before we get started?`;
  gamifiedLecture: string = '';
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private http: HttpClient) { }

  gamifyLecture(): void {
    if (!this.originalLecture || this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.gamifiedLecture = '';
    this.errorMessage = null;

    // const apiUrl = 'http://127.0.0.1:8000/generate';
    // const apiUrl = 'http://127.0.0.1:8000';
    const apiUrl = 'http://127.0.0.1:8000/api/generate';

    this.http.post<{ response: string }>(apiUrl, {
      prompt: `Make the following text entertaining for 6th graders using Star Wars references: ${this.originalLecture}`
    }).subscribe({
      next: (response) => {
        this.gamifiedLecture = response.response;
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
