import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const serviceUri = "inventories/monitoring/get-movements-all";

export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "inventory");
    }

    getMovement(info) {
      
        var endpoint = `${serviceUri}`;

        return super.list(endpoint, info);
    }

    getMovementExcel(info) {
        var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&storage=${info.storage}`;  
        return super.getXls(endpoint);
    }
}