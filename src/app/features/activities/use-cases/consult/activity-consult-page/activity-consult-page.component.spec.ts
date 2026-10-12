import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityConsultPageComponent } from './activity-consult-page.component';

describe('ActivityConsultPageComponent', () => {
  let component: ActivityConsultPageComponent;
  let fixture: ComponentFixture<ActivityConsultPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityConsultPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityConsultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
