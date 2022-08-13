export class CreateEditLabelRequest {
  public id: string;
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
