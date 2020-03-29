import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {ChartDataSets} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {Country, StatElem} from './stats.model';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {

  data: any;
  countrys = [];

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  selectedCountrys: Country[] = [];

  lineChartDeaths: ChartDataSets[] = [
    {},
  ];
  lineChartConfirmed: ChartDataSets[] = [
    {},
  ];
  lineChartRecovered: ChartDataSets[] = [
    {},
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
    this.fetchData();

    this.dropdownSettings = {
      singleSelection: false,
      text: 'Select Countries',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }

  private fetchData() {
    this.httpClient.get('https://pomber.github.io/covid19/timeseries.json').pipe(
      tap(data => this.data = data),
      tap(data => {
        Object.keys(data).forEach(key => this.countrys.push(key));
      }),
      tap(data => {
        this.dropdownList = this.countrys.map(country => {
          return {
            id: country,
            itemName: country
          };
        });
      }),
      tap(data => {
        const countrys = (localStorage.getItem('countrys'));
        if (countrys) {
          this.selectedItems = JSON.parse(countrys);
          this.loadCountrys();
        }
      }),
      tap(data => {
        (data as any).Argentina.forEach(({ date, confirmed, recovered, deaths }) => {
          // console.log(`${date} active cases: ${confirmed - recovered - deaths}`)
          }
        );
      })
    ).subscribe();
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    this.loadCountrys();
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
    this.loadCountrys();
  }
  onSelectAll(items: any) {
    console.log(items);
    this.loadCountrys();
  }
  onDeSelectAll(items: any) {
    console.log(items);
    this.loadCountrys();
  }

  private loadCountrys() {
    localStorage.setItem('countrys', JSON.stringify(this.selectedItems));
    this.selectedCountrys = [];
    this.lineChartLabels = [];
    Object.keys(this.data).forEach((key: string) => {
      if (this.selectedItems.map(i => i.id).includes(key)) {
        this.selectedCountrys.push({
          country: key,
          stats: this.data[key]
        });
      }
      this.data[key].forEach((line: StatElem) => {
        if (!this.lineChartLabels.includes(line.date)) {
          // console.log('ppppp', line.date);
          this.lineChartLabels.push(line.date);
        }
      });
    });
    const chartSet = [];
    this.lineChartDeaths = [];
    this.lineChartConfirmed = [];
    this.lineChartRecovered = [];
    this.selectedCountrys.forEach((country: Country) => {
      const deaths = [];
      const confirmed = [];
      const recovered = [];
      const key: string = country.country;
      this.lineChartLabels.forEach((label: string) => {
        let found = false;
        this.data[key].forEach((line: StatElem) => {
          if (line.date === label) {
            found = true;
            deaths.push(line.deaths);
            recovered.push(line.recovered);
            confirmed.push(line.confirmed);
            console.log('FOUND');
          }
        });
        if (!found) {
          deaths.push(null);
        }
      });
      console.log('FINALLY', key, deaths);
      this.lineChartDeaths.push({
        data: deaths,
        label: key
      });
      this.lineChartRecovered.push({
        data: recovered,
        label: key
      });
      this.lineChartConfirmed.push({
        data: confirmed,
        label: key
      });
    });
  }
}
