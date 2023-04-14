import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const StorageLoader = require('../../../loader/nstorage-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;

    }
    bind(context) {
        this.context = context;
    }
    
    searching() {
        var info = {
            storage : this.storage ? this.storage.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        } 
        this.service.search(info)
            .then(result => {
                console.log(result);
            });
    }
    
    ExportToExcel() {
        var info = {
            storage : this.storage ? this.storage.Id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
      
        }
        this.service.generateExcel(info);
    }

    get storageLoader(){
         
        return StorageLoader;
    }
    storageView = (storage) => {
        
        return `${storage}`;
    
    }

    
    reset() {
        this.dateFrom = null;
        this.dateTo = null;
        this.storage = null;
    }
  
    
}