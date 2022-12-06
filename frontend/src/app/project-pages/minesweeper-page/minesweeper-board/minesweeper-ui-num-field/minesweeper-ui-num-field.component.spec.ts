import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinesweeperUiNumFieldComponent } from './minesweeper-ui-num-field.component';

describe('MinesweeperUiNumFieldComponent', () => {
  let component: MinesweeperUiNumFieldComponent;
  let fixture: ComponentFixture<MinesweeperUiNumFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinesweeperUiNumFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MinesweeperUiNumFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
