import { Component, Input } from '@angular/core';
import { ApexChart, ApexXAxis } from 'ng-apexcharts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  @Input() chart: ApexChart = {type: 'line'};

  @Input() series: ApexAxisChartSeries | ApexNonAxisChartSeries = []
  
  @Input() title: ApexTitleSubtitle = {text: "Statistics"}

  @Input() xaxis: ApexXAxis = {
    
  };
  
  
}
