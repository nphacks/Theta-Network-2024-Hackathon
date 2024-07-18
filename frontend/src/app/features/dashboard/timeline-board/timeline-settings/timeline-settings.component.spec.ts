import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineSettingsComponent } from './timeline-settings.component';

describe('TimelineSettingsComponent', () => {
  let component: TimelineSettingsComponent;
  let fixture: ComponentFixture<TimelineSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelineSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelineSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
