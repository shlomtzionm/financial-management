import { ChangeDetectionStrategy, Component, inject, Input, model, signal } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { UpdateComponent } from "../update/update.component";
import { TransactionModel } from "../../../models/transaction-model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogConfig } from "@angular/cdk/dialog";

export interface DialogData {
  transaction: TransactionModel;
}

@Component({
  selector: "app-action-menu",
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIcon, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: "./action-menu.component.html",
  styleUrl: "./action-menu.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuComponent {
  @Input() deleteTransaction: (_id: string) => void;
  @Input() updateTransaction: (_id:string, transaction: TransactionModel) => void;
  @Input() transaction: TransactionModel;
  public dialog = inject(MatDialog);



  public triggerDelete() {
    try {
      this.deleteTransaction(this.transaction._id);
    } catch (error: any) {
      this.openSnackBar("Something went wrong", "X");
    }
  }

  public triggerUpdate(transaction: TransactionModel) {
    try {
      this.updateTransaction(transaction._id,transaction);
    } catch (error: any) {
      console.log(error);
      this.openSnackBar("Something went wrong", "X");
    }
  }


  openDialog(): void {

    const dialogConfig = new MatDialogConfig<any>();
    const chosenTransaction = { ...this.transaction };
    dialogConfig.data = { transaction: chosenTransaction };
    const dialogRef = this.dialog.open(UpdateComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.triggerUpdate(result); // Trigger update only if result exists
      } else {
        console.log("Dialog closed without update");
      }
    });
  }

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
