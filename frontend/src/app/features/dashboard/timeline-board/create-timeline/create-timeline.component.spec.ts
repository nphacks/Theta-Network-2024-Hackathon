import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimelineComponent } from './create-timeline.component';

describe('CreateTimelineComponent', () => {
  let component: CreateTimelineComponent;
  let fixture: ComponentFixture<CreateTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTimelineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
