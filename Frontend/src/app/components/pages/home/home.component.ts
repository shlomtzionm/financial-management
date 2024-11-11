import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TransactionsService } from '../../../services/transactions.service';


interface ChartDataPoint {
  name: string;
  y: number;
  color?: string; // Optional color property
}

@Component({
  selector: 'app-home',
  standalone: true,
  
  imports: [CommonModule, RouterOutlet, CanvasJSAngularChartsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public constructor(private transactionService: TransactionsService) {}

  public sumData: { _id: string; totalAmount: number }[] = [];
  public sumDataForChart: ChartDataPoint[] = [];
  
  // Example color palette
  private colorPalette = ["#FFB569", "#DE8439", "#BC5308","#78290F"];

  public chartOptions: any = {
    animationEnabled: true,
    backgroundColor: "transparent",
    title: {
      text: "Category Expense Distribution"
    },
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      dataPoints: this.sumDataForChart // Will be populated later
    }]
  };

  public showChart = false; // Flag for chart visibility

  async ngOnInit() {
    try {
    
      
      this.sumData = await this.transactionService.getCategoriesSum();
      const totalAmount = this.sumData.reduce((sum, D) => sum + D.totalAmount, 0);

      const categoryPromises = this.sumData.map(D => this.transactionService.getCategoryName(D._id));
      const categories = await Promise.all(categoryPromises);

      this.sumDataForChart = this.sumData.map((D, index) => {
        const percentage = (D.totalAmount / totalAmount) * 100;
        return { name: categories[index].name, y: percentage, color: this.colorPalette[index % this.colorPalette.length] };
      });

      this.updateChartOptions();

      setTimeout(() => {
        this.showChart = true;
      }, 1000);

    } catch (error: any) {
      console.error('Error fetching category sums or details:', error);
    }
  }

  private updateChartOptions() {
    this.chartOptions.data[0].dataPoints = this.sumDataForChart.map(dp => ({
      name: dp.name,
      y: dp.y,
      color: dp.color // Now TypeScript recognizes this property
    }));
  }
}
