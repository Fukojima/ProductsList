import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApirequestService {

  constructor(private http:HttpClient) { }

  //Requisição com backend



  url = "http://localhost:3000/";
  get(uri:string){

      return this.http.get<any>(this.url + uri);

  }

  post(uri:string, product:any){
    return this.http.post<any>(this.url + uri, product);
  }

  delete(uri:string, id:any){

  return this.http.delete<any>(this.url+uri +'/'+id);
}

put(uri:string, id:any, product: any){

return this.http.put<any>(this.url+uri +'/'+id, product);
}

urlClima = "https://api.hgbrasil.com/weather/?format=json-cors&key=f2eca5ae&woeid=455825";
getClima(){
    return this.http.get<any>(this.urlClima);
}

}
