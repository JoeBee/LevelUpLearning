import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input'; // Often needed with form fields
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { MatCardModule } from '@angular/material/card';
import { OptionsService } from '../shared/options.service'; // Import the service

@Component({
  selector: 'app-options',
  standalone: true,
  imports: [
    CommonModule, // Add CommonModule here
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './options.component.html',
  styleUrl: './options.component.scss'
})
export class OptionsComponent implements OnInit {
  // Properties to hold the selected values
  selectedSubject: string = ''; // Property to hold the selected subject
  selectedGradeLevel: string = ''; // Property to hold the selected grade level
  engagementDuration: string = '45'; // Default value
  thematicTone: string = 'neutral'; // Default value
  deliveryPreference: string = 'both'; // Default value

  // Gamification element states
  quizChallengesChecked: boolean = false;
  pointSystemChecked: boolean = false;
  timeBasedPuzzlesChecked: boolean = false;
  classroomPollsChecked: boolean = false;
  roleBasedDiscussionsChecked: boolean = false;
  fillInBlankChecked: boolean = false;

  // New property to hold the built string for the template
  builtOptionsString: string = '';

  // Subject Area options
  subjects: string[] = [
    'Science',
    'Math',
    'History',
    'Literature',
    'Social Studies',
    'Languages',
    'Other'
  ];

  // Grade Level options
  gradeLevels: string[] = [
    'Elementary (K-5)',
    'Middle School (6-8)',
    'High School (9-12)',
    'Higher Education'
  ];

  // Inject the service
  constructor(private optionsService: OptionsService) { }

  ngOnInit(): void {
    // Initialize the string when the component loads
    this.optionsBuilder();
  }

  // Function to build the comma-delimited string
  optionsBuilder(): void {
    const options: string[] = [];

    if (this.selectedSubject) options.push(`The subject is ${this.selectedSubject}.`);
    if (this.selectedGradeLevel) options.push(`This is for grade level ${this.selectedGradeLevel}.    `);
    if (this.engagementDuration) options.push(`The duration of the lesson is ${this.engagementDuration} minutes.`);

    const gamificationElements: string[] = [];
    if (this.quizChallengesChecked) gamificationElements.push('Quiz Challenges');
    if (this.pointSystemChecked) gamificationElements.push('Point System');
    if (this.timeBasedPuzzlesChecked) gamificationElements.push('Time Puzzles');
    if (this.classroomPollsChecked) gamificationElements.push('Classroom Polls');
    if (this.roleBasedDiscussionsChecked) gamificationElements.push('Role Discussions');
    if (this.fillInBlankChecked) gamificationElements.push('Fill-in-the-Blank');

    if (gamificationElements.length > 0) {
      options.push(`This should include: ${gamificationElements.join('/')}`);
    }

    if (this.thematicTone) options.push(`The tone of the lesson is ${this.thematicTone}`);
    // if (this.deliveryPreference) options.push(`Delivery: ${this.deliveryPreference}`);

    this.builtOptionsString = options.join(', '); // Store the string locally
    // Update the service instead of the local property
    this.optionsService.updateOptions(this.builtOptionsString); // Send the locally stored string
    // console.log('Selected Options:', this.builtOptionsString); // Keep for debugging if needed
  }
}
