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
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public constructor(private transactionService: transactionsService) {}

  public sumData: { _id: string; totalAmount: number }[] = [];
  public sumDataForChart: { name: string; y: number }[] = [];
  
  public chartOptions: any = {
    animationEnabled: true,
    title: {
      text: "Category Expense Distribution"
    },
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      dataPoints: this.sumDataForChart
    }]
  };

  public showChart = false; // Flag to control chart visibility

  async ngOnInit() {
    try {
      this.sumData = await this.transactionService.getCategoriesSum();
      const totalAmount = this.sumData.reduce((sum, D) => sum + D.totalAmount, 0);

      const categoryPromises = this.sumData.map(D => this.transactionService.getOneCategory(D._id));
      const categories = await Promise.all(categoryPromises);

      this.sumDataForChart = this.sumData.map((D, index) => {
        const percentage = (D.totalAmount / totalAmount) * 100;
        return { name: categories[index].name, y: percentage };
      });

      this.updateChartOptions();

      // Use setTimeout to delay showing the chart
      setTimeout(() => {
        this.showChart = true; // Set to true after a delay
      }, 1000); // 1000 ms delay

    } catch (error: any) {
      console.error('Error fetching category sums or details:', error);
    }
  }

  private updateChartOptions() {
    this.chartOptions.data[0].dataPoints = this.sumDataForChart;
  }
}
