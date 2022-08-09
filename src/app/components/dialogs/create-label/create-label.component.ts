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
        console.log('Created')
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
