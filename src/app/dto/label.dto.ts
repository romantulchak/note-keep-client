export class LabelDTO {
  public id: string;
  public name: string;
  public isEdit: boolean;

  constructor(name: string) {
    this.name = name;
  }
}
