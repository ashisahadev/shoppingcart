import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from  './productlist';
import { Addcart } from  './addcart';
import { Observable } from  'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://127.0.0.1/shopcart";
  constructor(private httpClient: HttpClient) { }
  readProduct(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(`${this.PHP_API_SERVER}/api/read.php`);

  }
  addProductTocart(datares):Observable<any>{
    return this.httpClient.post<any>(this.PHP_API_SERVER + `/api/addProductTocart.php`, datares);
  }
  deleteProduct(delres):Observable<any> {
    return this.httpClient.post<any>(this.PHP_API_SERVER + `/api/deleteProduct.php`, delres);
  }
  cartlist(){
    return this.httpClient.get<any>(this.PHP_API_SERVER + `/api/cartlist.php`); 
  }
}
