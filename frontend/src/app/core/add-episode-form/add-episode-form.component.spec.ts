import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEpisodeFormComponent } from './add-episode-form.component';

describe('AddEpisodeFormComponent', () => {
  let component: AddEpisodeFormComponent;
  let fixture: ComponentFixture<AddEpisodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEpisodeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEpisodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
