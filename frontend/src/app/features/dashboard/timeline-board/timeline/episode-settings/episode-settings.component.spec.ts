import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeSettingsComponent } from './episode-settings.component';

describe('EpisodeSettingsComponent', () => {
  let component: EpisodeSettingsComponent;
  let fixture: ComponentFixture<EpisodeSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EpisodeSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EpisodeSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
