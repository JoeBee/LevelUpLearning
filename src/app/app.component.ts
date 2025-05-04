import { Component } from '@angular/core';
// Import the specific Material components needed
import { MatTabGroup, MatTab } from '@angular/material/tabs';

// Import the newly generated components
import { SyllabusComponent } from './syllabus/syllabus.component';
import { OptionsComponent } from './options/options.component';
import { ContentComponent } from './content/content.component';
import { InteractivityComponent } from './interactivity/interactivity.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Import the specific Material components and our tab components
  imports: [
    MatTabGroup,
    MatTab,
    SyllabusComponent,
    OptionsComponent,
    ContentComponent,
    InteractivityComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Level Up Learning';
}
