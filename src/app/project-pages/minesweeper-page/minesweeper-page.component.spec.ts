import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperPageComponent } from './minesweeper-page.component';

describe('MinesweeperPageComponent', () => {
  let component: MinesweeperPageComponent;
  let fixture: ComponentFixture<MinesweeperPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinesweeperPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesweeperPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
