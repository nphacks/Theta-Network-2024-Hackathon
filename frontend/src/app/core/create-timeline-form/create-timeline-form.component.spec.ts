import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimelineFormComponent } from './create-timeline-form.component';

describe('CreateTimelineFormComponent', () => {
  let component: CreateTimelineFormComponent;
  let fixture: ComponentFixture<CreateTimelineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTimelineFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTimelineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
