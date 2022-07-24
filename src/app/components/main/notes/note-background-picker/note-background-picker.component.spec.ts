import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBackgroundPickerComponent } from './note-background-picker.component';

describe('NoteBackgroundPickerComponent', () => {
  let component: NoteBackgroundPickerComponent;
  let fixture: ComponentFixture<NoteBackgroundPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoteBackgroundPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteBackgroundPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
