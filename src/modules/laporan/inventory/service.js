import { inject, Lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { RestService } from '../../../utils/rest-service';
import { Container } from 'aurelia-dependency-injection';
import { Config } from "aurelia-api";

const uriServices = "inventories/monitoring";


export class Service extends RestService {

    constructor(http, aggregator, config, api) {
        super(http, aggregator, config, "inventory");
    }

    getMovement(info) {
        var endpoint = `${serviceUri}/monitoring`;
        var query = '';

        if (info.dateFrom && info.dateFrom !== "") {
            if (query === '') query = `dateFrom=${info.dateFrom}`;
            else query = `${query}&dateFrom=${info.dateFrom}`;
        }
        if (info.dateTo && info.dateTo !== "") {
            if (query === '') query = `dateTo=${info.dateTo}`;
            else query = `${query}&dateTo=${info.dateTo}`;
        }
        if (info.storage && info.storage !== "") {
            if (query === '') query = `storage=${info.storage}`;
            else query = `${query}&storage=${info.storage}`;
        }
        if (query !== '')
        endpoint = `${serviceUri}/monitoring?${query}`;

    return super.get(endpoint);
    }

    getMovementExcel(info) {
        var endpoint = `${serviceUri}/download?dateFrom=${info.dateFrom}&dateTo=${info.dateTo}&storage=${info.storage}`;  
        return super.getXls(endpoint);
    }
}