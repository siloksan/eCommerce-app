import UserStatus from 'types/types';

class StorageController {
  private storage = localStorage;

  private keyStatus = 'userStatus';

  public userStatus: string | null;

  constructor() {
    this.userStatus = this.getUserStatus();
  }

  public getUserStatus(): string | null {
    return this.storage.getItem(this.keyStatus);
  }

  public setUserStatus(userStatus: UserStatus) {
    this.storage.setItem(this.keyStatus, userStatus);
  }

  public removeUserStatus() {
    this.storage.removeItem(this.keyStatus);
  }
}

export default StorageController;
