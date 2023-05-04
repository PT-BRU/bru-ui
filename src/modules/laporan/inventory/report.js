import {inject,bindable} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const StorageLoader = require('../../../loader/nstorage-loader');

@inject(Router, Service)
export class List {
    @bindable selectedQuantity;
    quantities = [];
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    info = {
        page:1,
        size:25,
    };

    bind(context) {
        this.context = context;
      
        this.quantities.push("0");
        this.quantities.push("> 0");
    }
    selectedQuantityChanged(newValue, oldValue) {
        // console.log(newValue);
        // console.log(this.selectedMonth);
      }
    
    searching() {
       
        var info = {
            storage : this.storage ? this.storage._id : "",
          
            selectedQuantity : this.selectedQuantity
        }
         
        this.service.getStock(info)
            .then(result => {
                this.data=[];
                console.log(result.info.total);
                this.info.total = result.info.total; 
                for(var _data of result.data){
                    _data.Date =  moment(_data.Date).format("YYYY-MM-DD");
                    this.data.push(_data);

                 }
            });
    }
    
    ExportToExcel() {
        var info = {
            storage : this.storage ? this.storage._id : "",
            
            selectedQuantity : this.selectedQuantity
      
        }
        this.service.getStockExcel(info);
    }

    get storageLoader(){
        return StorageLoader;
    }
    storageView = (storage) => {
        return `${storage}`;
    
    }
    
    
    reset() {
        this.selectedQuantity = 0;
        this.storage = "";
        this.data = null;
        this.info.total=0;
    }
    changePage(e){
        var page = e.detail;
        this.info.page = page;

        this.showMovement();
    }
    
    showMovement() {

        this.data = [];
 
        var args = {
            page: this.info.page,
            size: this.info.size,
            storage : this.storage ? this.storage._id : "",
            selectedQuantity : this.selectedQuantity
        } 
        this.service.getStock(args)
        .then(result => {
            this.data=[];
            for(var _data of result.data){
                _data.Date =  moment(_data.Date).format("YYYY-MM-DD");
                this.data.push(_data);
             }
            })
            .catch(e => {
                this.error = e;
            })
        }
    
}