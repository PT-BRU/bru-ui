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
        this.flag = false;
    }
    info = {
        page:1,
        size:25,
    };

    bind(context) {
        this.context = context;
    }
    tableOptions = {
        search: false,
        showToggle: false,
        showColumns: false,
        pagination: true
    }
    columns = [
        { field: "ItemCode", title: "Barcode", valign: "top" },
        { field: "Brand", title: "Brand", valign: "top" },
        { field: "Date", title: "Transaction Date", valign: "top" },
        { field: "Category", title: "Category",  valign: "top"},
        { field: "Collection", title: "Collection", valign: "top" },
        { field: "SeasonCode", title: "Season Code", valign: "top" },
        { field: "SeasonYear", title: "Season Year", valign: "top" },
        { field: "ItemArticleRealizationOrder", title: "RO/Article", valign: "top" },
        { field: "ItemName", title: "Name", valign: "top" },
        { field: "Color", title: "Color", valign: "top" },
        { field: "Size", title: "Size", valign: "top" },
        { field: "Quantity", title: "Qty", valign: "top" },
        { field: "Location", title: "Location", valign: "top" },
        { field: "OriginalCost", title: "Original Cost", valign: "top" },
        //{ field: "", title: "Landed Cost", valign: "top" },
        { field: "Gross", title: "Gross", valign: "top" },
        { field: "Nett", title: "Nett", valign: "top" },
        { field: "Discount1", title: "Disc %", valign: "top" },
        { field: "Discount2", title: "Disc2 %", valign: "top" },
        { field: "DiscountNominal", title: "Disc Nominal", valign: "top" },
        { field: "SpecialDiscount", title: "Disc Special", valign: "top" },
        //{ field: "", title: "Disc Name", valign: "top" },
        { field: "TotalOriCost", title: "Total Original Cost", valign: "top" },
        //{ field: "", title: "Total Landed Cost", valign: "top" },
        { field: "TotalGross", title: "Total Gross", valign: "top" },
        { field: "TotalNett", title: "Total Nett", valign: "top" },
        { field: "Margin", title: "Margin", valign: "top" },
    ];
    
    ExportToExcel() {
        var info = {
            storage : this.storage ? this.storage._id : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
      
        }
        this.service.getSalesExcel(info);
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
        this.data = null;
        this.info.total=0;
    }

    searching() {
        this.error = {};
        if (Object.getOwnPropertyNames(this.error).length === 0) {
            this.flag = true;
            this.Table.refresh();
        }
    }

    loader = (info) => {
        var order = {};
        if (info.sort)
            order[info.sort] = info.order;
            var args = {
                page: parseInt(info.offset / info.limit, 10) + 1,
                size: info.limit,
                storage : this.storage ? this.storage._id : "",
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : ""
            } 
        return this.flag ?
        (
            this.service.getSales(args)
            .then(result => {
                console.log(result)
                this.data=[];
                this.info.total=result.info.total;
                for(var _data of result.data){
                    this.data.push(_data);
                }
                return {
                    total: this.info.total,
                    data: this.data
                };
            })
        ) : { total: 0, data: [] };
    }
    
}
        