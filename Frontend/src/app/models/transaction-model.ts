export class TransactionModel {
  public _id: string;
  public amount: number;
  public date: Date;
  public description: string;
  public category: string;
  public imageName: string;
  public image: File
}
