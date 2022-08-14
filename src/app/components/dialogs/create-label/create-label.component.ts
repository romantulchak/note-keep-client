import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LabelService} from "../../../services/label.service";
import {LabelDTO} from "../../../dto/label.dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateEditLabelRequest} from "../../../request/create-edit-label.request";

@Component({
  selector: 'app-create-label',
  templateUrl: './create-label.component.html',
  styleUrls: ['./create-label.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateLabelComponent implements OnInit {

  public labels: LabelDTO[];
  public labelFormGroup: FormGroup;
  public currentLabelName: string;

  constructor(private labelService: LabelService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initGroup();
    this.getLabels();
  }

  /**
   * Creates label with name from form
   */
  public createLabel(): void {
    const labelName = this.labelFormGroup.get('name')?.value;
    const createLabelRequest = new CreateEditLabelRequest(labelName);
    this.labelService.create(createLabelRequest).subscribe(
      () => {
        const label = new LabelDTO(labelName);
        this.labels.unshift(label);
        this.labelService.newLabel.next(label);
        this.labelFormGroup.reset();
      }
    )
  }

  /**
   * Shows Trash icon on hover
   *
   * @param label to get current label name
   */
  public showTrashIcon(label: LabelDTO): void {
    this.currentLabelName = label.name;
  }

  /**
   * Reset component view to default
   */
  public hideTrashIcon(): void {
    this.currentLabelName = '';
  }

  /**
   * Remove label from account
   *
   * @param label to be removed
   */
  public removeLabel(label: LabelDTO) {
    this.labelService.delete(label.name).subscribe(
      () => {
        this.labels = this.labels.filter(currentLabel => currentLabel.name !== label.name);
        this.labelService.deleteLabel.next(label.name);
      }
    )
  }

  /**
   * Change icon when user click on edit button
   *
   * @param label which will be edited
   */
  public enableEdit(label: LabelDTO): void {
    label.isEdit = true;
  }

  /**
   * Save result after editing and send it to server
   *
   * @param label which was edited
   * @param newLabelName new label name
   */
  public edit(label: LabelDTO, newLabelName: HTMLInputElement): void {
    const editLabelRequest = new CreateEditLabelRequest(newLabelName.value);
    editLabelRequest.id = label.id;
    this.labelService.edit(editLabelRequest).subscribe(
      () => {
        label.isEdit = false;
        label.name = newLabelName.value;
      }
    )
  }

  /**
   * Gets labels for user
   */
  private getLabels(): void {
    this.labelService.getLabelsForUser().subscribe(
      res => {
        this.labels = res;
        this.labels.forEach(value => value.isEdit = false);
      }
    )
  }

  /**
   * Initiate label form group
   */
  private initGroup(): void {
    this.labelFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]]
    });
  }
}
