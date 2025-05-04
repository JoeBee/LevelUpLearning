import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractivityComponent } from './interactivity.component';

describe('InteractivityComponent', () => {
  let component: InteractivityComponent;
  let fixture: ComponentFixture<InteractivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractivityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteractivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
