import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

class CustomTokenCache implements TokenCache {
  private key = 'token-data';

  private storage = localStorage;

  private tokenStore: TokenStore;

  constructor() {
    const tokenData = this.storage.getItem(this.key);
    this.tokenStore = tokenData
      ? JSON.parse(tokenData)
      : {
          token: '',
          expirationTime: 0,
          refreshToken: '',
        };
  }

  public get(): TokenStore {
    return this.tokenStore;
  }

  public set(cache: TokenStore): void {
    Object.assign(this.tokenStore, cache);
    this.storage.setItem(this.key, JSON.stringify(this.tokenStore));
  }

  public clearToken() {
    Object.assign(this.tokenStore, {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    });
    this.storage.setItem(this.key, JSON.stringify(this.tokenStore));
  }
}

export default CustomTokenCache;
