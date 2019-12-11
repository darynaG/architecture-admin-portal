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
  public data: [];
  public labels: [];

  // TODO can't read data from json, Value is undefined after subscribe
    constructor(private authService: AuthenticationService,
                private service: AdminViewService) {}

    ngOnInit() {
      this.getUserData();
      this.getChartData();
  }

  ngAfterViewInit() {
      this.buildChart();
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
        this.data = content. data;
        this.labels = content.labels;
      });

    // data - точечки на графіку, dataY - вісь

    this.data = [11, 26, 45, 11, 55, 45, 26];
    this.labels = ['Автоматизації роботи оператора мобільного зв’язку', 'Автоматизаціія прокату весільних суконь', 'Система обліку використання тепла та гарячої води', 'Автоматизації роботи оператора мобільного зв’язку', 'Облік роботи рекламного агентства', 'Система обліку використання тепла та гарячої води', 'Автоматизаціія прокату весільних суконь' ];
     // this.data = [0, 0, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63];
  }

  buildChart() {
    this.chartColor = '#FFFFFF';

    const speedCanvas = document.getElementById('speedChart');

    const dataFirst = {
      data: this.data,
      fill: false,
      borderColor: '#fbc658',
      backgroundColor: 'transparent',
      pointBorderColor: '#fbc658',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8,
    };

    const dataSecond = {
      data: this.data,
      fill: false,
      borderColor: '#51CACF',
      backgroundColor: 'transparent',
      pointBorderColor: '#51CACF',
      pointRadius: 4,
      pointHoverRadius: 4,
      pointBorderWidth: 8
    };

    const speedData = {
      labels: this.labels,
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
