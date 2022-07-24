export class NoteBackgroundDTO {
  public name: string;
  public value: string;
  public fullPathToImage: string;

  constructor(name: string = 'default', value: string = '', fullPathToImage: string = ''){
    this.name = name;
    this.value = value;
    this.fullPathToImage = this.fullPathToImage;
  }

}
