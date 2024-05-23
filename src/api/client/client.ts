import {
  AuthMiddlewareOptions,
  ClientBuilder,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import CustomTokenCache from 'utils/helpers/tokenCache';
import { UserAuthData } from 'types/interfaces';
import StorageController from 'utils/helpers/localStorage';
import UserStatus from 'types/types';

class Client {
  private projectKey: string = import.meta.env.VITE_CTP_PROJECT_KEY;

  private authUrl: string = import.meta.env.VITE_CTP_AUTH_URL;

  private apiUrl: string = import.meta.env.VITE_CTP_API_URL;

  private clientId: string = import.meta.env.VITE_CTP_CLIENT_ID;

  private clientSecret: string = import.meta.env.VITE_CTP_CLIENT_SECRET;

  public apiRoot: ByProjectKeyRequestBuilder;

  public storageController = new StorageController();

  public tokenCache = new CustomTokenCache();

  constructor() {
    this.apiRoot = this.getApiRoot();
  }

  private getAuthMiddlewareOptions(): AuthMiddlewareOptions {
    return {
      host: this.authUrl,
      projectKey: this.projectKey,
      credentials: {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      },
      tokenCache: this.tokenCache,
      scopes: [`manage_project:${this.projectKey}`],
      fetch,
    };
  }

  private getPasswordAuthMiddlewareOptions(userAuthData: UserAuthData): PasswordAuthMiddlewareOptions {
    this.tokenCache.clearToken();
    const options = this.getAuthMiddlewareOptions();
    const { credentials } = options;
    const newOptions = {
      ...options,
      credentials: {
        ...credentials,
        user: userAuthData,
      },
    };
    return newOptions;
  }

  private getRefreshAuthMiddlewareOptions(refreshToken: string): RefreshAuthMiddlewareOptions {
    const options = this.getAuthMiddlewareOptions();
    const newOptions = {
      ...options,
      refreshToken,
    };
    return newOptions;
  }

  private getHttpMiddlewareOptions(): HttpMiddlewareOptions {
    return {
      host: this.apiUrl,
      fetch,
    };
  }

  private getAnonymousFlowClient() {
    const options = this.getAuthMiddlewareOptions();
    const httpMiddlewareOptions = this.getHttpMiddlewareOptions();
    return new ClientBuilder().withAnonymousSessionFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
  }

  private getPasswordFlowClient(userAuthData: UserAuthData) {
    const options = this.getPasswordAuthMiddlewareOptions(userAuthData);
    const httpMiddlewareOptions = this.getHttpMiddlewareOptions();
    return new ClientBuilder().withPasswordFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
  }

  private getRefreshFlowClient(refreshToken: string) {
    const options = this.getRefreshAuthMiddlewareOptions(refreshToken);
    const httpMiddlewareOptions = this.getHttpMiddlewareOptions();
    return new ClientBuilder().withRefreshTokenFlow(options).withHttpMiddleware(httpMiddlewareOptions).build();
  }

  public getApiRoot(userAuthData?: UserAuthData): ByProjectKeyRequestBuilder {
    const { refreshToken } = this.tokenCache.get();
    if (userAuthData) {
      return createApiBuilderFromCtpClient(this.getPasswordFlowClient(userAuthData)).withProjectKey({
        projectKey: this.projectKey,
      });
    }
    if (this.storageController.userStatus === UserStatus.registered && refreshToken) {
      return createApiBuilderFromCtpClient(this.getRefreshFlowClient(refreshToken)).withProjectKey({
        projectKey: this.projectKey,
      });
    }
    return createApiBuilderFromCtpClient(this.getAnonymousFlowClient()).withProjectKey({ projectKey: this.projectKey });
  }
}

const client = new Client();

export { Client };

export default client;
