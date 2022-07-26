import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackgroundDTO } from 'src/app/dto/backgorund.dto';
import { NoteBackgroundDTO } from 'src/app/dto/note-background.dto';
import { CreateNoteRequest } from 'src/app/request/create-note.request';
import { NoteService } from 'src/app/services/note.service';
import { NoteBackgroundPickerComponent } from '../note-background-picker/note-background-picker.component';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {

  public isNoteCreatingFocus: boolean;
  public createNoteFormGroup: FormGroup;
  public backgrounds: BackgroundDTO;
  public selectedBackgroundColor: NoteBackgroundDTO | null;
  public selectedBackgroundImage: NoteBackgroundDTO | null;
  
  @ViewChild('textbox') textBox: ElementRef;
  @ViewChild('titlebox') titleBox: ElementRef;
  @ViewChild('backgrounds', {read: ViewContainerRef}) container: ViewContainerRef;

  constructor(private elementRef: ElementRef,
              private fb: FormBuilder,
              private noteService: NoteService,
              private componentFactoryResolver : ComponentFactoryResolver) { }

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
   * Togle isMarked attribute in form group
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
   * Send request to server to get
   * all backgrounds for note (colors and images)
   */
   public getBackgrounds(): void {
    if (!this.backgrounds) {
      this.noteService.getBackgrounds().subscribe(
        res => {
          this.backgrounds = res;
          this.createBackgroundPickerComponent();
        }
      );  
    } else { 
      this.createBackgroundPickerComponent();
    }
  }

  /**
   * Creates background picker component
   */
  private createBackgroundPickerComponent(): void {
    this.container.clear();
    const factory = this.componentFactoryResolver.resolveComponentFactory(NoteBackgroundPickerComponent);
    const componentRef = this.container.createComponent(factory);
    componentRef.instance.backgorund = this.backgrounds;
    this.handleSelectedBackroundColor(componentRef);
    this.handleSelectedBackroundImage(componentRef);
    this.handleClickOutsideBackgroundPicker(componentRef);
  }

  /**
   * Handle selected value from {@link NoteBackgroundPickerComponent}
   * and sets it into form group for backgroundColor field
   * 
   * @param componentRef to get @Output from compoennt
   */
  private handleSelectedBackroundColor(componentRef: ComponentRef<NoteBackgroundPickerComponent>): void {
    componentRef.instance.backgorundColor.subscribe(
      res => {
        this.selectedBackgroundColor = res;
        this.createNoteFormGroup.get('backgroundColor')?.setValue(res.name);
      }
    );
  }

  /**
   * Handle selected value from {@link NoteBackgroundPickerComponent}
   * and sets it into form group for backgroundImage field
   * 
   * @param componentRef to get @Output from compoennt
   */
     private handleSelectedBackroundImage(componentRef: ComponentRef<NoteBackgroundPickerComponent>): void {
      componentRef.instance.backgorundImage.subscribe(
        res => {          
          this.selectedBackgroundImage = res;
          this.createNoteFormGroup.get('backgroundImage')?.setValue(res.name);
        }
      );
    }

  /**
   * Handle click outside background picker {@link NoteBackgroundPickerComponent}
   * if true then destroy component 
   * 
   * @param componentRef to get @Output from compoennt
   */
   private handleClickOutsideBackgroundPicker(componentRef: ComponentRef<NoteBackgroundPickerComponent>): void {
    componentRef.instance.hidePicker.subscribe(
      res => {          
        if(res) {
          componentRef.destroy();
        }
      }
    );
  }


  /**
   * Sends request to server to create note
   */
  private createNote(): void {
    if(this.createNoteFormGroup.valid){
      this.noteService.create(this.createNoteFormGroup.value).subscribe(
        res => {
          console.log(res);
          console.log('Note created');
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
