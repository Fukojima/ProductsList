import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApirequestService } from 'src/app/services/apirequest.service';
import { Product } from '../models/productModel';
import * as alertify from 'alertifyjs';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  categoryList = [

      {id: 1, description:"Alimenticios"},
      {id: 2, description:"Acessórios"},
      {id: 3, description:"Celulares"},
      {id: 4, description:"Eletrodométicos"},
      {id: 5, description:"Eletrônicos"},
      {id: 6, description:"Jogos"},
      {id: 7, description:"Vestuário"},
      {id: 8, description:"Outros"},

  ]

  constructor(private apiService: ApirequestService) { }

token:any;
  ngOnInit(): void {
   this.token = localStorage.getItem('token');
   console.log("token: ", this.token)
  }


  productForm = new FormGroup({
     'name': new FormControl('', Validators.required),
     'price': new FormControl('',Validators.required),
     'category': new FormControl('',Validators.required),
     'token':new FormControl('')
  });



  productRegister(){
   //  this.apiService.pos
   console.log("ed", this.token)
   this.productForm.controls['token'].setValue(this.token);
    this.apiService.post('create', this.productForm.value).toPromise().then(data => {
      console.log("data", data);

      alertify.notify('Produto cadastrando com sucesso', 'success', 5, function(){  console.log('dismissed'); });
      setTimeout(function(){ window.location.href = 'http://localhost:4200/list'; }, 3000);

    })


  }

  update(id:any, product:any){
    console.log("id", id)
   this.apiService.put("update",id, product).subscribe(data=>{
     console.log(data);
   })
   alertify.notify('Produto alterado com sucesso', 'success', 5, function(){  console.log('dismissed'); });
   setTimeout(function(){ window.location.href = 'http://localhost:4200/list'; }, 3000);

  }

}
