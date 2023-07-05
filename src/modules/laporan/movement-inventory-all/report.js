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
    info = {
        page:1,
        size:25,
    };

    bind(context) {
        this.context = context;
    }
    
    look() {
       
        var info = {
            storage : this.storage ? this.storage._id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
        }
        this.service.getMovement(info)
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
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
      
        }
        this.service.getMovementExcel(info);
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
        this.storage = "";
    }
  
    
}