import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  constructor() { }

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

}
