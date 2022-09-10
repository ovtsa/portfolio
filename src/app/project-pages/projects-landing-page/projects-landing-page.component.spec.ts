import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsLandingPageComponent } from './projects-landing-page.component';

describe('ProjectsLandingPageComponent', () => {
  let component: ProjectsLandingPageComponent;
  let fixture: ComponentFixture<ProjectsLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectsLandingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
