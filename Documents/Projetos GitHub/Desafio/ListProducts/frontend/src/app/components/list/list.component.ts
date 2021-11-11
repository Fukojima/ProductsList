import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApirequestService } from 'src/app/services/apirequest.service';
import { Product } from '../models/productModel';

import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listData:any;
  authToken:any;
  product: Product = new Product ("","","");

  wind_speedy : string = "";
  temp: string = "";

  constructor(private apiService: ApirequestService) { }

  ngOnInit(): void {
    this.getRequest();

    this.apiService.get("list").subscribe(
      res => {
        console.log("res", res);
            this.listData = res;

            localStorage.setItem('token',res[0].token)
    });
  }

     delete(id:any){
       console.log("id", id)
      this.apiService.delete("delete",id).subscribe(data=>{
        console.log(data);
      })
      alertify.notify('Produto deletado com sucesso', 'success', 5, function(){  console.log('dismissed'); });
      setTimeout(function(){ window.location.href = 'http://localhost:4200/list'; }, 3000);

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


}
