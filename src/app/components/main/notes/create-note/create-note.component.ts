import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoteBackgroundDTO} from 'src/app/dto/note-background.dto';
import {NoteService} from 'src/app/services/note.service';
import {NoteBackgroundPickerComponent} from '../note-background-picker/note-background-picker.component';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  public isNoteCreatingFocus: boolean;
  public createNoteFormGroup: FormGroup;
  public selectedBackgroundColor: NoteBackgroundDTO | null;
  public selectedBackgroundImage: NoteBackgroundDTO | null;

  @ViewChild('textbox') textBox: ElementRef;
  @ViewChild('titlebox') titleBox: ElementRef;

  constructor(private elementRef: ElementRef,
              private fb: FormBuilder,
              private noteService: NoteService) {
  }

  ngOnInit(): void {
    this.initNoteFormGroup();
  }

  /**
   * Set styles for creating note on focuse
   */
  public setNoteCreationOnFocus(): void {
    this.isNoteCreatingFocus = true;
  }

  /**
   * Toggle isMarked attribute in form group
   */
  public setMarked(): void {
    const isMarked = this.createNoteFormGroup.get('isMarked');
    isMarked?.setValue(!isMarked.value);
  }

  /**
   * Set styles for creating note when unfocus
   */
  public setTextForNote(event: any, fieldName: string): void {
    this.createNoteFormGroup.get(fieldName)?.setValue(event.target.innerHTML);
  }

  /**
   * Detects if user click outside creating note
   * if yes hide fields for creating note
   * and send request to server
   *
   * @param event to get mouse event
   */
  @HostListener('document:mousedown', ['$event'])
  public onClickOutsideCreateNote(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.isNoteCreatingFocus) {
      this.isNoteCreatingFocus = false;
      window.getSelection()?.removeAllRanges();
      this.createNote();
    }
  }

  /**
   * Handle selected value from {@link NoteBackgroundPickerComponent}
   * and sets it into form group for backgroundColor field
   *
   * @param noteBackgroundDTO to get @Output from component
   */
  public handleSelectedBackgroundColor(noteBackgroundDTO: NoteBackgroundDTO): void {
    this.selectedBackgroundColor = noteBackgroundDTO;
    this.createNoteFormGroup.get('backgroundColor')?.setValue(noteBackgroundDTO.name);
  }

  /**
   * Handle selected value from {@link NoteBackgroundPickerComponent}
   * and sets it into form group for backgroundImage field
   *
   * @param noteBackgroundDTO to get @Output from component
   */
  public handleSelectedBackgroundImage(noteBackgroundDTO: NoteBackgroundDTO): void {
    this.selectedBackgroundImage = noteBackgroundDTO;
    this.createNoteFormGroup.get('backgroundImage')?.setValue(noteBackgroundDTO.name);
  }

  /**
   * Sends request to server to create note
   */
  private createNote(): void {
    if (this.createNoteFormGroup.valid) {
      this.noteService.create(this.createNoteFormGroup.value).subscribe(
        res => {
          this.noteService.notes.next(res);
        }
      );
    }
    this.textBox.nativeElement.innerHTML = ''
    this.titleBox.nativeElement.innerHTML = '';
    this.selectedBackgroundColor = null;
    this.selectedBackgroundImage = null;
    this.createNoteFormGroup.reset();
  }

  /**
   * Init create form group for note
   */
  private initNoteFormGroup(): void {
    this.createNoteFormGroup = this.fb.group({
      title: ['', Validators.maxLength(999)],
      text: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(7800)]],
      isMarked: [false],
      backgroundColor: [''],
      backgroundImage: [''],
    });
  }
}
