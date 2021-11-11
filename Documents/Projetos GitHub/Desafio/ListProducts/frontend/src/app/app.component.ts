import { Component, OnInit } from '@angular/core';
import { ApirequestService } from 'src/app/services/apirequest.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

   wind_speedy : string = "";
   temp: string = "";


  constructor(
    public apiService : ApirequestService){}

  ngOnInit(){

     this.getRequest();

  }

  getRequest(){
    this.apiService.getClima().subscribe(
      data => {
        console.log(data.results);
         this.wind_speedy = data.results.wind_speedy;
         this.temp = data.results.temp;
      }
    );


  }


  title = 'climarj';
}
