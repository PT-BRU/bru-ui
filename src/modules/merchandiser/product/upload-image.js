import { inject, Lazy, bindable } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';
var FinishedGoodsLoader = require('../../../loader/finished-goods-loader');
var CountersLoader = require('../../../loader/counter-loader');
var MaterialCompositionsLoader = require('../../../loader/material-composition-loader');
var MaterialsLoader = require('../../../loader/material-loader');
// var MotifsLoader = require('../../../loader/motif-loader');
var ProcessLoader = require('../../../loader/process-loader');
var SeasonsLoader = require('../../../loader/season-loader');
var SubCountersLoader = require('../../../loader/sub-counter-loader');
var CollectionsLoader = require('../../../loader/collection-loader');
var CategoriesLoader = require('../../../loader/category-loader');
var ColorLoader = require('../../../loader/color-loader');

@inject(Router, Service)
export class Upload {
    motif = {};
    process = {};
    material = {};
    collection = {};
    season = {};
    counter = {};
    subCounter = {};
    @bindable data;
    @bindable error;
    contacts = [];
    productFilter = {};
    product = {};
    dataSource = [];
    dataDestination = [];
    // article_motif = {};
    // article_category = {};
    article_collection = {};
    article_colors = [];
    article_color = {};
    color = "#FF0000";
    ro = "";
    itemFilter={
        ImagePath: ""
    }
    columns = [
        { header: "", value: "__check" },
        { header: "Code", value: "code" },
        { header: "Name", value: "name" }
    ]

    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.data = { items: [] };
        this.isNotRO = false;
        this.isNotName = true;

        this.service.getColors()
            .then(result => {
              
                this.article_colors = result.data;
                if (this.article_colors.length > 0)
                    this.article_color = this.article_colors[0];
                this.article_colors.forEach((s) => {
                    s.toString = function () {
                        return s.name;
                    }
                });
            })

        this.product.toString = function () {
            return this.name || "";
        }
    }

    get MotifsLoader() {
        return MotifsLoader;
    }
    get MaterialsLoader() {
        return MaterialsLoader;
    }
    get MaterialCompositionsLoader() {
        return MaterialCompositionsLoader;
    }
    get CollectionsLoader() {
        return CollectionsLoader;
    }
    get SubCountersLoader() {
        return SubCountersLoader;
    }
    get CountersLoader() {
        return CountersLoader;
    }
    get ProcessLoader() {
        return ProcessLoader;
    }
    get SeasonsLoader() {
        return SeasonsLoader;
    }

    get CategoriesLoader() {
        return CategoriesLoader;
    }

    get ColorLoader() {
        return ColorLoader;
    }

    controlOptions = {
        label: {
            length: 2,
            align: "right"
        },
        control: {
            length: 6
        }
    }

    loaderSource = (info) => {
        return this.dataSource;
    }

    check(e) {
        if (e.keyCode == 13) {
            this.service.searchByRo(this.ro)
                .then((result) => {
                    this.deleteAll();
                    this.dataSource = result;
                    if (result) {
                        var firstResult = result[0];
                        this.data.ro = this.ro;
                        console.log(this.data);
                        // this.service.getMotif(firstResult.code.substring(9, 11))
                        //     .then((motif) => {
                        //         if (motif) {
                        //             this.article_motif = motif.data;
                        //         }
                        //     })
                    }
                })
            return false;
        } else {
            return true;
        }
    }

    updateType(e) {
        this.deleteAll();
        var type = e.target.value;
        this.isNotRO = type != "ro";
        this.isNotName = type != "name";

        if (this.isNotRO)
            this.ro = "";
        if (this.isNotName)
            this.product = {};
    }

    get finishedGoodsLoader() {
        return FinishedGoodsLoader;
    }

    finishedGoodsChange(e) {
        this.clearTable();
        this.dataSource.push(this.product);
    }

    changeColor(e) {
    }

    deleteAll() {
        this.clearTable();
    }

    moveRight() {
        var filter = this.dataSource.filter(function (item) {
            return item.check
        });

        this.dataDestination = this.dataDestination.concat(filter);

        var temp = this.dataSource;
        for (var item of filter) {
            var i = this.dataSource.indexOf(item);
            if (i != -1) {
                temp.splice(i, 1);
            }
            item.check = false;
        }
        this.dataSource = [].concat(temp);
    }

    onClickAllDataSource($event) {
        for (var item of this.dataSource) {
            item.check = $event.detail.target.checked;
        }
    }
    onClickAllDataDestination($event) {
        for (var item of this.dataDestination) {
            item.check = $event.detail.target.checked;
        }
    }

    moveLeft() {
        var filter = this.dataDestination.filter(function (item) {
            return item.check
        });

        this.dataSource = this.dataSource.concat(filter);

        var temp = this.dataDestination;
        for (var item of filter) {
            var i = this.dataDestination.indexOf(item);
            if (i != -1) {
                temp.splice(i, 1);
            }
            item.check = false;
        }
        this.dataDestination = [].concat(temp);
    }

    clearTable() {
        this.dataSource = [];
        this.dataDestination = [];
        this.article_motif = {};
    }

    activate(params) {

    }

    select(contact) {
        this.selectedId = contact.id;
        return true;
    }

    list() {
        this.router.navigateToRoute('list');
    }


    @bindable imageUpload;
    @bindable imageSrc;
    imageUploadChanged(newValue) {
      let imageInput = document.getElementById("imageInput");
      let reader = new FileReader();
      reader.onload = event => {
        let base64Image = event.target.result;
        this.imageSrc = this.data.ImageFile = base64Image;
      };
      reader.readAsDataURL(imageInput.files[0]);
    }
    async upload() {

        var e = [];
        if (this.dataDestination.length == 0) {
            e["dataDestination"] = "Produk harus dipilih"
            if (this.dataSource.length == 0) {
                e["dataSource"] = "Tidak ada produk ditemukan"
            }
        }
        // if (this.data.realizationOrderName == "" || this.data.realizationOrderName == undefined) {
        //     e["realizationOrderName"] = "Nama RO harus diisi"
        // }
        if (this.data.process == "" || this.data.process == undefined) {
            e["process"] = "Process harus diisi"
        }
        if (this.data.materials == "" || this.data.materials == undefined) {
            e["materials"] = "Bahan harus diisi"
        }
        if (this.data.materialCompositions == "" || this.data.materialCompositions == undefined) {
            e["materialCompositions"] = "Komposisi Bahan harus diisi"
        }
        if (this.data.collections == "" || this.data.collections == undefined) {
            e["collections"] = "Koleksi harus diisi"
        }
        if (this.data.counters == "" || this.data.counters == undefined) {
            e["counters"] = "Season harus diisi"
        }
        if (this.data.subCounters == "" || this.data.subCounters == undefined) {
            e["subCounters"] = "Style harus diisi"
        }
        if (this.data.seasons == "" || this.data.seasons == undefined) {
            e["seasons"] = "Season harus diisi"
        }
        // if (this.data.motif == "" || this.data.motif == undefined) {
        //     e["motif"] = "Nama harus diisi"
        // }
        if (this.data.categories == "" || this.data.categories == undefined) {
            e["categories"] = "Kategori harus diisi"
        }
        if (this.data.ro == "" || this.data.ro == undefined) {
            e["ro"] = "Nomor RO harus diisi"
        }
        if (this.data.color == "" || this.data.color == undefined) {
            e["color"] = "Nama Warna harus diisi"
        }

        if (Object.keys(e).length > 0) {
            this.error = e;
        } else {
            
                        var data = {}
                        data.dataDestination = this.dataDestination;
                        data.colorCode = this.color;
                        data.color = this.data.color;
                       // data.imagePath = result.data[0];
                        data.imageFile = this.imageSrc;
                        // data.motifPath = result.data[1];
                        // data.realizationOrderName = this.data.realizationOrderName;
                        data.process = this.data.process;
                        // data.motifDoc = this.data.motif;
                        data.seasons = this.data.seasons;
                        data.materials = this.data.materials;
                        data.materialCompositions = this.data.materialCompositions;
                        data.collections = this.data.collections;
                        data.counters = this.data.counters;
                        data.subCounters = this.data.subCounters;
                        data.categories = this.data.categories;
                        data.ArticleRealizationOrder = this.data.ro;
                        data.ColorCode = this.data.colorCode;
                        data.ColorDocName= this.data.ColorDocName;
                        data.DomesticWholesale= this.data.DomesticWholesale;
                        data.InternationalCOGS=this.data.InternationalCOGS;
                        data.InternationalWholesale= this.data.InternationalWholesale;
                        data.InternationalRetail=this.data.InternationalRetail;
                        data.InternationalSale= this.data.InternationalSale;
                        data.Remark= this.data.Remark;
                        data.Uom= this.data.Uom;
                        data.Size= this.data.Size;
                        this.service.updateProductImage(data)
                            .then(result2 => {
                                this.list();
                            }).catch(e => {
                                this.error = e;
                            });
        }

    }

    list() {
        this.router.navigateToRoute('list');
    }
}
