import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogHomepageComponent } from './blog-homepage.component';

describe('BlogHomepageComponent', () => {
  let component: BlogHomepageComponent;
  let fixture: ComponentFixture<BlogHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogHomepageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
