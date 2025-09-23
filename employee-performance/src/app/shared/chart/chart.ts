import { Component, Input } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.html',
  imports: [NgxEchartsModule],
  styleUrl: './chart.scss'
})
export class Chart {
  @Input() chartLabels: string[] = [];
  @Input() chartData: number[] = [];
  @Input() chartTitle: string = 'Performance';

  chartOption: EChartsOption = {};

  ngOnChanges() {
    this.chartOption = {
      title: {
        text: this.chartTitle
      },
      tooltip: {},
      xAxis: {
        type: 'category',
        data: this.chartLabels
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.chartData,
          type: 'bar',
          color: '#4caf50'
        }
      ]
    };
  }
}
