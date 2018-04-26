import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Chart from 'chart.js';

/**
 * Generated class for the AnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-analysis',
  templateUrl: 'analysis.html',
})
export class AnalysisPage
{

  GasChart: any;
  AreaChart: any;
  TemperatureChart: any;

  TemperatureData: any = [];
  HumidityData: any = [];
  GasData: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad AnalysisPage');

    this.GasChart = document.getElementById("GasChart");


    var myChart = new Chart(this.GasChart, {
      type: 'line',
      data: {
        labels: ["1", "2", "3", "4", "5"],
        xAxisID: "Journey Step",
        yAxisID: "Density of Gas",

        datasets: [{
          label: 'Gas Density',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(83,180,245, 0.2)',
          borderColor: 'rgba(83,180,245,1)',
          borderWidth: 1
        },],

      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          display: true,
          text: 'Trend in Gas Density of Journey',
          position: 'top'
        }
      }
    });


    this.AreaChart = document.getElementById("AreaChart");


    var AreaChart = new Chart(this.AreaChart, {
      type: 'doughnut',
      data: {
        labels: ["Good", "Medium", "Bad"],
        datasets: [{
          data: [12, 19, 3],
          backgroundColor: [
            'rgba(111,206,124, 0.4)',
            'rgba(232,111,51,0.4)', 'rgba(110,13,37,0.4)'],
          borderColor: [
            'rgba(111,206,124, 0.4)',
            "rgba(232,111,51,0.4)", "rgba(110,13,37,0.4)"],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: 'Measure of Journey',
          position: 'top'
        }
      }
    });

    this.CreateTemperatureChart();






  }

  CreateTemperatureChart()
  {
    this.TemperatureChart = document.getElementById("TemperatureChart");


    var myChart = new Chart(this.TemperatureChart, {
      type: 'line',
      data: {
        labels: ["1", "2", "3", "4", "5"],
        datasets: [{
          label: 'Temperature',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: 'rgba(232,111,51,0.4)',
          borderColor: 'rgba(232,111,51,1)',
          borderWidth: 1
        }, {
          label: 'Humidity',
          data: [11, 12, 13, 8, 9, 10],
          backgroundColor: 'rgba(110,13,37,0.4)',
          borderColor: 'rgba(110,13,37,1)',
          borderWidth: 1

        }],

      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        title: {
          display: true,
          text: 'Trend in Temperature & Humidity of Journey',
          position: 'top'
        }
      }
    });

  }

  getPollutionData = () =>
  {
    var url = 'https://air92.restlet.net/v1/specificJourneies/?media=json'
    return new Promise(function (resolve, reject)
    {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.onload = function ()
      {
        var result = JSON.parse(xhr.response);
        resolve(result);
      };
      xhr.send();
    });
  }

}
