import { Component, OnInit,Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from  '../productlist';
import { Addcart } from  '../addcart';
import { MatDialogRef, MatDialog,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface DialogData {
  totamt: string;
  
}
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  products:  Product[];
  public totqty:number=0;
  public totamt:number=0;
  addProductList:any;
  delProduct:any;
  constructor(
    private apiService:ApiService,
    public dialog: MatDialog,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.readProduct();
    this.cartlist();
  }
  readProduct(){
    this.apiService.readProduct().subscribe((products: Product[])=>{
      this.products = products;
      console.log(this.products);
    })
  }
  cartlist(){
    this.apiService.cartlist().subscribe(res=>{
      console.log(res);
      this.totqty=res.totqty;
      this.totamt=res.totamt;
    });
  }
  addProduct(id,price){
    this.addProductList={
      "addProdid": id,
      "addProdprice": price,
    };

  
  this.apiService.addProductTocart(this.addProductList).subscribe(res=>{
    alert(res.message);
    this.readProduct();
    // console.log("---------");
    // console.log(res);
    this.totqty=res.totqty;
    this.totamt=res.totamt;
    // this.products = addcart;
    // console.log(this.products);
  })
  //alert(id+"-----price"+price);
  }
  deleteProduct(id){
    this.delProduct={
      "delProdid":id
    }
    this.apiService.deleteProduct(this.delProduct).subscribe(res=>{
     //console.log(res);
     alert(res.message);
     this.readProduct();
    if(res.status=="1"){
      this.totqty=res.totqty;
      this.totamt=res.totamt;
    }
    })
  }
  openPopModel(totamt){
    //alert(totamt);
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      height: '300px',
      data: {totamt: totamt}
    });
    dialogRef.afterClosed().subscribe(() => {
      this.snack.open('Transaction successful!', 'OK', { duration: 4000 })
    });
    
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }


}
