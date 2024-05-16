class StorageController {
  private storage = localStorage;

  private keyAnonymous = 'anonymous';

  public anonymous: string | null;

  constructor() {
    this.anonymous = this.getAnonymous();
  }

  public getAnonymous(): string | null {
    return this.storage.getItem(this.keyAnonymous);
  }

  public setAnonymous() {
    this.storage.setItem(this.keyAnonymous, this.keyAnonymous);
  }

  public removeAnonymous() {
    this.storage.removeItem(this.keyAnonymous);
  }
}

export default StorageController;
