import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitySearchPageComponent } from './activity-search-page.component';

describe('ActivitySearchPageComponent', () => {
  let component: ActivitySearchPageComponent;
  let fixture: ComponentFixture<ActivitySearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivitySearchPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivitySearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
