import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { BackgroundDTO } from 'src/app/dto/backgorund.dto';
import { NoteBackgroundDTO } from 'src/app/dto/note-background.dto';

@Component({
  selector: 'app-note-background-picker',
  templateUrl: './note-background-picker.component.html',
  styleUrls: ['./note-background-picker.component.scss']
})
export class NoteBackgroundPickerComponent implements OnInit {

  @Input('backgrounds') backgorund: BackgroundDTO;
  @Output('color') backgorundColor: EventEmitter<NoteBackgroundDTO> = new EventEmitter();
  @Output('image') backgorundImage: EventEmitter<NoteBackgroundDTO> = new EventEmitter(); 
  @Output('hide') hidePicker: EventEmitter<Boolean> = new EventEmitter();

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  /**
   * Emit selected background color to parent component
   * 
   * @param backgorundColor to be emit to parent component
   */
  public selectBackgroundColor(backgorundColor: NoteBackgroundDTO = new NoteBackgroundDTO()): void {
    this.backgorundColor.emit(backgorundColor);
  }

   /**
   * Emit selected background image to parent component
   * 
   * @param backgorundColor to be emit to parent component
   */
    public selectBackgroundImage(backgorundImage: NoteBackgroundDTO = new NoteBackgroundDTO()): void {
      this.backgorundImage.emit(backgorundImage);
    }

    /**
     * Detects if user click outside background picker 
     * if yes hide component for selecting backgorunds 
     * 
     * @param event to get mouse event
     */
    @HostListener('document:mousedown', ['$event'])
    public onClickOutsidePicker(event: MouseEvent): void {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.hidePicker.emit(true);
      }
    }
}
