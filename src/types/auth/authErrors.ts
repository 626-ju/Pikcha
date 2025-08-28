export class AuthError extends Error {
  type: string;

  constructor(message?: string, type: string = 'AuthError') {
    super(message);
    this.type = type;
    this.name = this.constructor.name;
  }
}

export class CredentialsSignin extends AuthError {
  type = 'CredentialsSignin';
}
