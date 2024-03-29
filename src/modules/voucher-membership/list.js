import { inject, bindable } from "aurelia-framework";
import { Service, ServiceMembership,VoucherService } from "./service";
import { Router } from "aurelia-router";
import moment from "moment";
import numeral from 'numeral';

@inject(Router, Service, ServiceMembership,VoucherService)
export class List {
  @bindable flag = false;

  // info = { page: 1, size: 25 };

  context = ["Detail"];

  columns = [
    { title: "Voucher Name", field: "DiscountName" },
    {
      title: "Nominal", field: "Nominal", formatter: function (value, data, index) {
        return numeral(value).format('0,000.00');
      }
    },
    { title: "Voucher Type", field: "DiscountType" },
    {
      title: "Point Exchanged", field: "ExchangePoint", formatter: function (value, data, index) {
        return numeral(value).format('0,000.00');
      }
    },
    { title: "Total Claimed", field: "TotalClaimed" },
    { title: "Total Used", field: "TotalUse" },
    { title: "Member", field: "Membership" }
  ];

  voucherType = ["", "Nominal", "Product"];

  tierMembershipType = ["", "Silver", "Gold", "Platinum"];

  controlOptions = {
    label: {
      length: 3,
    },
    control: {
      length: 8,
    },
  };

  constructor(router, service, serviceMembership,voucherService) {
    this.service = service;
    this.router = router;
    this.serviceMembership = serviceMembership;
    this.voucherService=voucherService;
  }

  async activate() {
    this.membershipResult = await this.serviceMembership.getListMembership({})
      .then(result => {
        console.log(result)
        return result
      });
  }

  search() {
    this.flag = true;
    this.tableList.refresh();
  }

  loader = (info) => {
    // if (info.sort) order[info.sort] = info.order;

    let args = {
      page: parseInt(info.offset / info.limit, 10) + 1,
      limit: info.limit,
      keyword: info.search ? info.search : ''
    };

    if (this.flag) {
      if (this.info.startDate)
        args.startDate = moment(this.info.startDate).format("YYYY/MM/DD");

      if (this.info.endDate)
        args.endDate = moment(this.info.endDate).format("YYYY/MM/DD");

      if (this.info.voucherType) {
        switch (this.info.voucherType.toLowerCase()) {
          case "product":
            args.voucherType = "2";
            break;
          case "nominal":
            args.voucherType = "0";
            break;
          default:
            args.voucherType = "8";
            break;
        }
      }

      if (this.info.tierMembership)
        args.membershipId = this.membershipResult.find(x => x.name.toLowerCase() == this.info.tierMembership.toLowerCase()).id;
    }
    return this.voucherService.search(args)
      .then((result) => {
        let data = result.data.map((val) => {
          val.Membership = val.Membership.split(',')
            .map((id) => {
              return this.membershipResult.find(x => x.id == id).name
            })
          return val
        })
        return {
          total: result.total,
          data: data,
        };
      });
  };

  contextClickCallback(event) {
    var arg = event.detail;
    var data = arg.data;
    switch (arg.name) {
      case "Detail":
        this.router.navigateToRoute('view', { id: data.id });
        break;
    }
  }

  reset() {
    this.flag = false;
    this.error = {};
    this.info = {};
    this.tableList.refresh();
  }

  create() {
    this.router.navigateToRoute("create");
  }
}
