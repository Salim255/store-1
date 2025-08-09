export class User {
  constructor(
    private _id: string,
    private firstName: string,
    private lastName: string,
    private email: string,
    private isEmailVerified: boolean,
    private createdAt: Date,
    private updatedAt: Date
  ){}
}
