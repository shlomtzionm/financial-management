import { Component, inject, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HomeService } from "../../../services/home.service";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  public monthlyIncome: number;
  public monthlyOutcome: number;
  public goal: number;
  public monthlySaved: number;
  public monthToGoal: number;
  public totalBalance: number;

  public constructor(public homeService: HomeService) {}

  ngOnInit(): void {
    try {
      this.homeService.monthlyIncome().subscribe(income => {
        this.monthlyIncome = income;
      });

      this.homeService.monthlyOutcome().subscribe(outcome => {
        this.monthlyOutcome = -outcome;
      });
  
      this.homeService.monthlySaved().subscribe(saved=>
        this.monthlySaved = saved
      )

      this.homeService.totalBalance().subscribe(total=>
        this.totalBalance = total
      )
    
  
    } catch (error: any) {
      this._snackBar.open("Something went wrong", "x");
    }
  }


  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
