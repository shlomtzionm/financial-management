import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
 
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { transactionsService } from '../../../services/transactions.service';
 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public constructor(private transactionServices:transactionsService ){}

  public sumData: Object


 async ngOnInit() {
try {
   this.sumData = await this.transactionServices.getCategoriesSum()
   
} catch (error:any) {
  
}
  }

  private date = new Date();
  private monthInWords = this.getMonthInWords();
  
  private getMonthInWords(): string {
      const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];
      return monthNames[this.date.getMonth()];
  }

  chartOptions = {
	  animationEnabled: true,
	  title:{
		text: this.monthInWords
	  },
	  data: [{
		type: "doughnut",
		yValueFormatString: "#,###.##'%'",
		indexLabel: "{name}",
		dataPoints: [
		  { y: 28, name: "Labour" },
		  { y: 10, name: "Legal" },
		  { y: 20, name: "Production" },
		  { y: 15, name: "License" },
		  { y: 23, name: "Facilities" },
		  { y: 17, name: "Taxes" },
		  { y: 12, name: "Insurance" }
		]
	  }]
	}	
}
