import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivvyMapperPageComponent } from './divvy-mapper-page.component';

describe('DivvyMapperPageComponent', () => {
  let component: DivvyMapperPageComponent;
  let fixture: ComponentFixture<DivvyMapperPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DivvyMapperPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DivvyMapperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
