import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BackgroundDTO} from 'src/app/dto/backgorund.dto';
import {NoteBackgroundDTO} from 'src/app/dto/note-background.dto';
import {NoteService} from 'src/app/services/note.service';
import {NoteBackgroundPickerComponent} from '../note-background-picker/note-background-picker.component';

@Component({
  selector: 'app-note-toolbar',
  templateUrl: './note-toolbar.component.html',
  styleUrls: ['./note-toolbar.component.scss']
})
export class NoteToolbarComponent implements OnInit {

  @ViewChild('backgrounds', {read: ViewContainerRef}) container: ViewContainerRef;
  @Input('showAdditionalActions') showAdditionalActions: boolean = true;
  @Output('selectBackgroundImage') selectBackgroundImage: EventEmitter<NoteBackgroundDTO> = new EventEmitter();
  @Output('selectBackgroundColor') selectBackgroundColor: EventEmitter<NoteBackgroundDTO> = new EventEmitter();
  private static backgrounds: BackgroundDTO;

  constructor(private noteService: NoteService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
  }

  /**
   * Send request to server to get
   * all backgrounds for note (colors and images)
   */
  public getBackgrounds(): void {
    if (!NoteToolbarComponent.backgrounds) {
      this.noteService.getBackgrounds().subscribe(
        res => {
          NoteToolbarComponent.backgrounds = res;
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
    componentRef.instance.backgorund = NoteToolbarComponent.backgrounds;
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
        this.selectBackgroundColor.emit(res);
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
        this.selectBackgroundImage.emit(res);
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
        if (res) {
          componentRef.destroy();
        }
      }
    );
  }

}
