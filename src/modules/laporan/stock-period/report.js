import {inject} from 'aurelia-framework';
import {Service} from "./service";
import {Router} from 'aurelia-router';
import moment from 'moment';
const StorageLoader = require('../../../loader/nstorage-loader');
var SeasonsLoader = require('../../../loader/season-loader');
var CollectionsLoader = require('../../../loader/collection-loader');
var CategoriesLoader = require('../../../loader/category-loader');
var CountersLoader = require('../../../loader/counter-loader');
var StyleLoader = require('../../../loader/article-style-loader');
var SizeLoader = require('../../../loader/size-loader');
var ColorLoader = require('../../../loader/color-loader');

@inject(Router, Service)
export class List {
    constructor(router, service) {
        this.service = service;
        this.router = router;
        this.flag = false;
    }
    info = {
        page:1,
        size:100,
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
        { field: "Brand", title: "Org", valign: "top" },
        { field: "Brand", title: "Brand", valign: "top" },
        { field: "ItemArticleRealizationOrder", title: "RO/Article", valign: "top" },
        { field: "Barcode", title: "Barcode", valign: "top" },
        { field: "ItemName", title: "Nama", valign: "top" },
        { field: "Size", title: "Size", valign: "top" },
        { field: "Color", title: "Color", valign: "top" },
        { field: "Group", title: "Group", valign: "top" },
        { field: "Category", title: "Category",  valign: "top"},
        { field: "Style", title: "Style", valign: "top" },
        { field: "Collection", title: "Collection", valign: "top" },
        { field: "SeasonCode", title: "Season Code", valign: "top" },
        { field: "SeasonYear", title: "Season Year", valign: "top" },
        { field: "Quantity", title: "Qty", valign: "top" },
        { field: "ReceivedDate", title: "Received Date", valign: "top" },
        { field: "Month", title: "Month", valign: "top" },
        { field: "Year", title: "Year", valign: "top" },
        { field: "Description", title: "Description", valign: "top" },
        { field: "Location", title: "Location", valign: "top" },
        { field: "OriginalCost", title: "Original Cost", valign: "top" },
        { field: "Gross", title: "Gross", valign: "top" },
        { field: "TotalOriCost", title: "Total Original Cost", valign: "top" },
        { field: "TotalGross", title: "Total Gross", valign: "top" },
    ];
    
    ExportToExcel() {
        var info = {
            storage : this.storage ? this.storage._id : "",
            dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
            dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
            group : this.group? this.group._id : "",
            category : this.category ? this.category._id : "",
            style : this.style ? this.style._id : "",
            collection : this.collection ? this.collection._id : "",
            season : this.season ? this.season._id : "",
            color : this.color ? this.color._id : "",
            sizes : this.sizes ? this.sizes.Size : "",
        }
        this.service.getStockExcel(info);
    }

    get storageLoader(){
        return StorageLoader;
    }
    storageView = (storage) => {
        return `${storage}`;
    
    }
    
    controlOptions = {
        label: {
            length: 4
        },
        control: {
            length: 5
        }
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
        // if(!this.storage){
        //     this.error={
        //         storage: "Storage harus diisi"
        //     };
        // }
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
                dateTo : this.dateTo ? moment(this.dateTo).format("YYYY-MM-DD") : "",
                dateFrom : this.dateFrom ? moment(this.dateFrom).format("YYYY-MM-DD") : "",
                group : this.group? this.group._id : "",
                category : this.category ? this.category._id : "",
                style : this.style ? this.style._id : "",
                collection : this.collection ? this.collection._id : "",
                season : this.season ? this.season._id : "",
                color : this.color ? this.color._id : "",
                sizes : this.sizes ? this.sizes.Size : "",
            } 
        return this.flag ?
        (
            this.service.getStock(args)
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
    
    get CollectionsLoader() {
        return CollectionsLoader;
    }
    get CountersLoader() {
        return CountersLoader;
    }
    get SeasonsLoader() {
        return SeasonsLoader;
    }

    get CategoriesLoader() {
        return CategoriesLoader;
    } 
    get StyleLoader() {
        return StyleLoader;
    }
    get SizeLoader() {
        return SizeLoader;
    } 
    get ColorLoader() {
        return ColorLoader;
    } 
}
        