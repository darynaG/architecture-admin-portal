import {AfterViewInit, Component, OnInit} from '@angular/core';
import Chart from 'chart.js';
import {AuthenticationService, ChartDetails, User, UserDetails} from '../auth/auth.service';
import {AdminViewService} from '../admin-view/admin-view-component.service';
import {toArray} from 'rxjs/operators';


@Component({
    selector: 'app-dashboard-cmp',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['test.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit {

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  private user: UserDetails;

  chartData: ChartData;

  // TODO can't read data from json, Value is undefined after subscribe
    constructor(private authService: AuthenticationService,
                private service: AdminViewService) {}

    ngOnInit() {
      this.getUserData();
      this.getChartData();
  }

  ngAfterViewInit() {

  }

  getUserData() {
      this.service.getUserDetails(this.authService.currentUserValue.id).subscribe(
        content => {
              this.user = content;
        }
      );
  }

  getChartData() {
    this.service.getUserStatistics(this.authService.currentUserValue.id).subscribe(
      content => {
        this.chartData = content;
        this.buildChart();
      });
  }

  buildChart() {
      this.chartColor = '#FFFFFF';

      const speedCanvas = document.getElementById('speedChart');

      const dataFirst = {
      data: this.chartData.data,
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

      const dataSecond = {
      data: this.chartData.data,
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

      const speedData = {
      labels: this.chartData.labels,
      datasets: [dataFirst]
    };

      const chartOptions = {
      legend: {
        display: false,
        position: 'top'
      }
    };

      const lineChart = new Chart(speedCanvas, {
      type: 'line',
      hover: false,
      data: speedData,
      options: chartOptions
    });
  }
}
export class ChartData {
  data: [];
  labels: [];
}
