import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { BackgroundDTO } from 'src/app/dto/backgorund.dto';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  public isNoteCreatingFocus: boolean;
  public createNoteFormGroup: FormGroup;
  public backgrounds: BackgroundDTO;
  
  @ViewChild('textbox') textBox: ElementRef;
  @ViewChild('titlebox') titleBox: ElementRef;

  constructor(private elementRef: ElementRef,
              private fb: FormBuilder,
              private noteService: NoteService) { }

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
   * Send request to server to get
   * all backgrounds for note (colors and images)
   */
   public getBackgrounds(): void {
    if (!this.backgrounds) {
      this.noteService.getBackgrounds().subscribe(
        res => {
          console.log(res);
          this.backgrounds = res;
        }
      );  
    }
  }

  /**
   * Sends request to server to create note
   */
  private createNote(): void {
    this.textBox.nativeElement.innerHTML = ''
    this.titleBox.nativeElement.innerHTML = '';
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
