import { Component, Input } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: "app-edit-menu",
  standalone: true,
  imports: [MatMenuModule, MatButtonModule, MatIcon],
  templateUrl: "./edit-menu.component.html",
  styleUrl: "./edit-menu.component.css",
})
export class EditMenuComponent {
  @Input() deleteTransaction: (_id: string) => void;
  @Input() _id: string;

  public  triggerDelete() {
    try {
      this.deleteTransaction(this._id);
    } catch (error: any) {
      console.log(error);
    }
  }
}
