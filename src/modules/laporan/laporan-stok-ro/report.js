import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api"
var Itemloader = require('../../../loader/finished-goods-loader')

@inject(Router, Service)
export class Report {
    @bindable productItem;

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.reportHTML = "";
        this.code = "";
        this.color = "";
        this.imagePath = "";
        this.error = {};
        this.readOnly = true;
    }

    options = {
        columns: [],
        search: false,
        showToggle: false,
        showColumns: false,
        undefinedText: '0'
    };

    // columns = [{title: 'TOKO', field: "item.StorageName" }]

    // data = [];
    // show = false;

    productItemChanged(newValue, oldValue) {
        this.readOnlyCode = true;
        this.readOnlyColor = true;
        var config = Container.instance.get(Config);

        if (this.error.code) {
            this.error = {};
        }

        if (this.productItem) {
            var image = `${config.getEndpoint("master").client.baseUrl}items/finished-goods/${this.productItem._id}`;
            //var image = `${config.getEndpoint("master").client.baseUrl}items/finished-goods/${this.productItem._id}`;
            this.code = this.productItem.ArticleRealizationOrder ? this.productItem.ArticleRealizationOrder : null;
            this.color = this.productItem.color ? this.productItem.color : null;
            this.imagePath = this.productItem.ImagePath ? this.productItem.ImagePath : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY9Y3rGTwbyc9GoAOyxRClRz7b5GnCnjVsHx_qK_CUXN79yis4';
            // let reader = new FileReader();
            // reader.onload = event => {
            //     let base64Image = event.target.result;
            //     this.imagePath = this.data.imageSrc = base64Image;
            // }
            //reader.readAsDataURL(this.imageSrc);
        }
    }

    get itemLoader() {
        return Itemloader;
    }

    exportToExcel() {
        if (this.code === '') {
            this.error.code = "Masukkan kode Realisasi Order";
        } else {
            this.service.generateXls(this.code);
        }
    }

    async showReport(){
        // this.tableData = [];

        // let input = this.data;
        if (this.code === '') {
            this.error = "Masukkan kode Realisasi Order";
        } else {
            this.error = "";
            // this.code = input ? input.this.code : "";
            await this.service.getStokByRO(this.code)
                .then(items => {
                        this.generateReportHTML(items);
                        if (items) {
                            this.show = true;
                        } else {
                            this.show = false;
                        }
                        this.models.refresh();
                    })
                    .catch(e => {
                        this.error = e;
                }) 
        }
    }

    generateTableInfo(size) {
        var tableHeader = [];
        var colHeaderOne = [];
        var colHeaderTwo = [];

        //initiate columns
        colHeaderOne.push({ title: "Toko", field: "store", rowspan: 2, valign: "middle", width: "200px" });
        colHeaderOne.push({ title: "No RO", field: "noRO", rowspan: 2, valign: "middle", align: "center"});

        for (var i = 0; i < size.length; i++) {
            var onInventory = size[i] + "onInventory";
            var onSales = size[i] + "onSales";

            //initiate columns
            var col = { title: size[i], colspan: 2 };

            var stok = { title: "Stok", field: onInventory, align: "center" };
            var stokOnSale = { title: "Stok Terjual", field: onSales, align: "center" };

            colHeaderOne.push(col);
            colHeaderTwo.push(stok);
            colHeaderTwo.push(stokOnSale);
        }

        colHeaderOne.push({ title: "Umur", field: "age", rowspan: 2, valign: "middle", align: "center" });
        colHeaderOne.push({ title: "Total Stok", field: "totalOnInventory", rowspan: 2, valign: "middle", align: "center" });
        colHeaderOne.push({ title: "Total Stok Terjual", field: "totalOnSales", rowspan: 2, valign: "middle", align: "center" });

        tableHeader.push(colHeaderOne);
        tableHeader.push(colHeaderTwo);

        return tableHeader;
    }

    async generateReportHTML(dataResult) {
        var columns = []
        var size = [];
        var tempArr = [];
        this.data = [];
        for (var dataItem of dataResult) {
            if (!this.data[dataItem.storageName+ dataItem.ro + dataItem.age]) {
                this.data[dataItem.storageName + dataItem.ro + dataItem.age] = {};
                this.data[dataItem.storageName+ dataItem.ro + dataItem.age]["store"] = dataItem.storageName;
                this.data[dataItem.storageName+ dataItem.ro + dataItem.age]["noRO"] = dataItem.ro;
                this.data[dataItem.storageName+ dataItem.ro + dataItem.age]['age'] = dataItem.age + " hari";
            }

            if (this.data[dataItem.storageName+ dataItem.ro + dataItem.age]) {
                if (!this.data[dataItem.storageName+ dataItem.ro + dataItem.age]["totalOnInventory"]) 
                    this.data[dataItem.storageName+ dataItem.ro + dataItem.age]["totalOnInventory"] = dataItem.quantityOnInventory;
                else
                    this.data[dataItem.storageName+ dataItem.ro + dataItem.age]["totalOnInventory"] += dataItem.quantityOnInventory;
                if(!this.data[dataItem.storageName+ dataItem.ro + dataItem.age]["totalOnSales"])
                    this.data[dataItem.storageName+ dataItem.ro + dataItem.age]["totalOnSales"] = dataItem.quantityOnSales;
                else
                    this.data[dataItem.storageName+ dataItem.ro + dataItem.age]["totalOnSales"] += dataItem.quantityOnSales;
            }

            if (this.data[dataItem.storageName+ dataItem.ro + dataItem.age]) {
                if (!this.data[dataItem.storageName+ dataItem.ro + dataItem.age][dataItem.size+"onInventory"]) 
                    this.data[dataItem.storageName+ dataItem.ro + dataItem.age][dataItem.size+"onInventory"] = dataItem.quantityOnInventory;
                else
                    this.data[dataItem.storageName+ dataItem.ro + dataItem.age][dataItem.size+"onInventory"] += dataItem.quantityOnInventory;
                if(!this.data[dataItem.storageName+ dataItem.ro + dataItem.age][dataItem.size+"onSales"])
                    this.data[dataItem.storageName+ dataItem.ro + dataItem.age][dataItem.size+"onSales"] = dataItem.quantityOnInventory;
                else
                    this.data[dataItem.storageName+ dataItem.ro + dataItem.age][dataItem.size+"onSales"] += dataItem.quantityOnInventory;
            }

            if (size.indexOf(dataItem.size) === -1) {
                size.push(dataItem.size);
            }
        }
        var props = Object.getOwnPropertyNames(this.data);

        for (var i = 1; i < props.length; i++) {
            tempArr.push(this.data[props[i]]);
        }
        columns = this.generateTableInfo(size)
        this.data = tempArr;
        this.options.columns = columns;
        
        var bootstrapTableOptions = {
            columns: columns,
            data: this.data,
            fixedColumns: true,
            fixedNumber: 3
          };
          if (this.data.length > 10) { // row > 10
            bootstrapTableOptions.height = $(window).height() - $('.navbar').height() - $('.navbar').height() - 25;
          }
          $(this.table).bootstrapTable('destroy').bootstrapTable(bootstrapTableOptions);


    }
}
