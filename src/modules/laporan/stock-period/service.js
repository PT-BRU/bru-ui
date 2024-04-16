import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const uriServices = "inventories/monitoring/get-stock-by-period";


export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "inventory");
    }

    getStock(info) {
        var endpoint = `${uriServices}`;
        console.log(endpoint)
        return super.list(endpoint, info);
    }

    getStockExcel(info) {
        var endpoint = `${uriServices}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&storage=${info.storage}
            &style=${info.style}&group=${info.group}&category=${info.category}&collection=${info.collection}
            &season=${info.season}&color=${info.color}&sizes=${info.sizes}`; 
        return super.getXls(endpoint);
    }
}