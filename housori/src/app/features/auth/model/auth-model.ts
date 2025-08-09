export class UserAuthentication {
  constructor(
    public userId: string,
    private expirationTime: Date,
  ){}
}
