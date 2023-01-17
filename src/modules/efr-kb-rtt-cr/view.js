import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service)
export class View {
    packingList = '';
    password = '';
    constructor(router, service) {
        this.router = router;
        this.service = service;
        this.printStruk = "";
    }

    activate(params) {
        var id = params.id;
        this.service.getById(id)
            .then(data => {
                this.data = data;
                // const jobs = [this.service.getSPKByReference(data.code), this.service.getPackingListTransferStock(data.code)];
                // Promise.all(jobs)
                //     .then(result => {
                //         const spk = result[0];
                //         const packingListTransferStock = result[1];
                //         if (spk != undefined && spk.length > 0) {
                //             this.password = spk[0].password;
                //             this.packingList = spk[0].packingList;
                //         }
                //         if (packingListTransferStock) {
                //             if (packingListTransferStock[0].source.code == packingListTransferStock[1].destination.code) {
                //                 this.tujuan = packingListTransferStock[0].source;
                //             } else if (packingListTransferStock[0].destination.code == packingListTransferStock[1].source.code) {
                //                 this.tujuan = packingListTransferStock[0].destination;
                //             }
                //         }
                //     }).catch(e => {
                //     })
                this.generatePrintStrukTable();
            })
    }

    list() {
        this.router.navigateToRoute('list');
    }

    print() {
        window.print();
    }

    generatePrintStrukTable() {
        var totalItem = 0;
        var totalPrice = 0;
        this.service.getSPKByReference(this.data.code)
            .then(spk => {
              console.log(spk);
                this.printStruk = "";
                this.printStruk += "<table style='width:88%;'>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'><b> PT. BATEEQ RETAILINDO UTAMA </b> </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'><b> Jln Merapi No. 23 RT. 000 RW. 000 Banaran,  </b></td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'><b> Grogol Kab. Sukoharjo Jawa Tengah </b> </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'><b>TRANSFER STOK </b><br/></td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'>";
                this.printStruk += "            <div class='col-xs-5'> Nomor Packing List </div>";
                this.printStruk += "            <div class='col-xs-7'> " + spk.packingList + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'>";
                this.printStruk += "            <div class='col-xs-5'> Password </div>";
                this.printStruk += "            <div class='col-xs-7'> " + spk.password + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'>";
                this.printStruk += "            <div class='col-xs-5'> Tanggal </div>";
                this.printStruk += "            <div class='col-xs-7'> " + (this.data.createdDate).substring(0, 10) + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr style='height:20px;'>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'>";
                this.printStruk += "            <div class='col-xs-5'> Kasir </div>";
                this.printStruk += "            <div class='col-xs-7'> " + this.data.createdBy + " </div>";
                this.printStruk += "        </td>";

                this.printStruk += "    </tr>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'>";
                this.printStruk += "            <div class='col-xs-5'> Sumber </div>";
                this.printStruk += "            <div class='col-xs-7'> " + this.data.sourcecode + "-" + this.data.sourcename + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr>";
                
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'>";
                this.printStruk += "            <div class='col-xs-5'> Tujuan </div>";
                //this.printStruk += "            <div class='col-xs-7'> GDG.05-GUDANG TRANSFER STOCK </div>";
                // this.printStruk += "            <div class='col-xs-7'> GDG.01-GUDANG BARANG JADI 1 </div>";
                this.printStruk += "            <div class='col-xs-7'> " + this.data.transfercode + "-" + this.data.transfername + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr style='height:20px;'>";
                
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'>";
                this.printStruk += "            <div class='col-xs-5'> Keterangan </div>";
                this.printStruk += "            <div class='col-xs-7'> " + "Transfer ke " + this.data.destinationcode + "-" + this.data.destinationname + " </div>";
                this.printStruk += "        </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'> ==================================== </td>";
                this.printStruk += "    </tr>";

                for (var item of this.data.items) {
                    var remark= item.remark? item.remark:"";
                    this.printStruk += "    <tr style='height:20px;'>";
                    this.printStruk += "        <td class='text-left' style='padding-right:6pt; height:15px;'> " + item.item.code + " </td>";
                    this.printStruk += "        <td colspan='2' class='text-left' style='height:15px;'> " + item.item.name + " </td>";
                    this.printStruk += "    </tr>";
                    this.printStruk += "    <tr style='height:20px;'>";
                    this.printStruk += "        <td class='text-left' style='padding-right:6pt; height:15px;'> " + item.quantity.toLocaleString() + " X &nbsp; </td>";
                    this.printStruk += "        <td class='text-left' style='height:15px;'> " + (item.item.domesticSale).toLocaleString() + " </td>";
                    this.printStruk += "        <td class='text-right' style='height:15px;'> " + (item.item.domesticSale * item.quantity).toLocaleString() + " </td>";
                    this.printStruk += "    </tr>";
                    this.printStruk += "    <tr style='height:20px;'>";
                    this.printStruk += "        <td class='text-left' style='padding-right:6pt; height:15px;'> " + remark + " </td>";
                    this.printStruk += "    </tr>";
                    totalItem += item.quantity;
                    totalPrice += (item.item.domesticSale * item.quantity);
                }
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td colspan='3' class='text-left' style='height:15px;'> ==================================== </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td class='text-left' style='padding-right:6pt; height:15px;'>  Total Item:  </td>";
                this.printStruk += "        <td colspan='2' class='text-left' style='height:15px;'> " + totalItem + " </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "    <tr style='height:20px;'>";
                this.printStruk += "        <td class='text-left' style='padding-right:6pt; height:15px;'> Grand Total: </td>";
                this.printStruk += "        <td colspan='2' class='text-left' style='height:15px;'> " + totalPrice.toLocaleString() + " </td>";
                this.printStruk += "    </tr>";
                this.printStruk += "</table>";
            }).catch(e => {
            })

    }

} 
