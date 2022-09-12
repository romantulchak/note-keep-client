import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NoteBackgroundDTO} from 'src/app/dto/note-background.dto';
import {NoteBackgroundPickerComponent} from '../note-background-picker/note-background-picker.component';
import {NoteDTO} from "../../../../dto/note.dto";
import {CreateNoteRequest} from "../../../../request/create-note.request";

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit, AfterViewInit {

  @Input('note') note: NoteDTO;
  @Input('isSkipFocus') skipFocus: boolean = true;
  @Input('isEdit') isEdit: boolean;
  @Input('isNoteCreatingFocus') isNoteCreatingFocus: boolean;
  @Output('create') createNoteEvent: EventEmitter<CreateNoteRequest> = new EventEmitter<CreateNoteRequest>();
  public createNoteFormGroup: FormGroup;
  public selectedBackgroundColor: NoteBackgroundDTO | null;
  public selectedBackgroundImage: NoteBackgroundDTO | null;

  @ViewChild('textbox') textBox: ElementRef;
  @ViewChild('titlebox') titleBox: ElementRef;

  constructor(private elementRef: ElementRef,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initNoteFormGroup();
  }

  ngAfterViewInit(): void {
    if (this.isEdit) {
      this.handleEditNote();
    }
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
    if (!this.elementRef.nativeElement.contains(event.target) && this.isNoteCreatingFocus && this.skipFocus) {
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
   * Sends event to parent to create note
   */
  private createNote(): void {
    if (this.createNoteFormGroup.valid) {
      this.createNoteEvent.emit(this.createNoteFormGroup.value);
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
      title: [this.note?.title || '', Validators.maxLength(999)],
      text: [this.note?.text || '', [Validators.required, Validators.minLength(0), Validators.maxLength(7800)]],
      isMarked: [this.note?.isMarked || false],
      backgroundColor: [this.note?.backgroundColor.value || ''],
      backgroundImage: [this.note?.backgroundImage.value || ''],
    });
  }

  private handleEditNote(): void {
    this.titleBox.nativeElement.innerHTML = this.title;
    this.textBox.nativeElement.innerHTML = this.text;
    this.selectedBackgroundColor = new NoteBackgroundDTO('', this.backgroundColor, this.backgroundColor);
    this.selectedBackgroundImage = new NoteBackgroundDTO('', this.backgroundImage, this.backgroundImage);

  }

  get title(): string {
    return this.createNoteFormGroup.get('title')?.value;
  }

  get text(): string {
    return this.createNoteFormGroup.get('text')?.value;
  }

  get isMarked(): string {
    return this.createNoteFormGroup.get('isMarked')?.value;
  }

  get backgroundColor(): string {
    return this.createNoteFormGroup.get('backgroundColor')?.value;
  }

  get backgroundImage(): string {
    return this.createNoteFormGroup.get('backgroundImage')?.value;
  }
}
