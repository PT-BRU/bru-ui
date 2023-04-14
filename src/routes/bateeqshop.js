module.exports = [
    {
        route: "/customers-report",
        name: "customers-report",
        moduleId: "./modules/customers-report/index",
        nav: true,
        title: "Customer Report by Orders",
        auth: true,
        settings: {
            group: "bateeq shop",
            subGroup: "Report",
            permission: { "C.01": 1, "MRD.01": 1 },
            iconClass: "fa fa-dashboard",
        },
    },,

    {
        route: 'laporan-mutasi-barang',
        name: 'laporan-mutasi-barang',
        moduleId: './modules/laporan/movement-inventory-all/index',
        nav: true,
        title: 'Laporan Mutasi Barang',
        auth: true,
        settings: {
            group: "bateeq shop",
            subGroup: "Report",
			permission: { "C.01": 1, "MRD.01": 1 },
            iconClass: "fa fa-dashboard",
        }
    },{
        route: 'laporan-stok',
        name: 'laporan-stok',
        moduleId: './modules/laporan/inventory/index',
        nav: true,
        title: 'Laporan Stok',
        auth: true,
        settings: {
            group: "bateeq shop",
            subGroup: "Report",
			permission: { "C.01": 1, "MRD.01": 1 },
            iconClass: "fa fa-dashboard",
        }
    },{
        route: 'laporan-penjualan',
        name: 'laporan-penjualan',
        moduleId: './modules/laporan/sales/index',
        nav: true,
        title: 'Laporan Penjualan',
        auth: true,
        settings: {
            group: "bateeq shop",
            subGroup: "Report",
			permission: { "C.01": 1, "MRD.01": 1 },
            iconClass: "fa fa-dashboard",
        }
    },
    {
        route: "/promotion",
        name: "voucher",
        moduleId: "./modules/promotion/index",
        nav: true,
        title: "Voucher",
        auth: true,
        settings: {
            group: "bateeq shop",
            subGroup: "promotion",
            permission: { "C.01": 1, "MRD.01": 1 },
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "/voucher-membership",
        name: "membership",
        moduleId: "./modules/voucher-membership/index",
        nav: true,
        title: "Voucher Membership",
        auth: true,
        settings: {
            group: "bateeq shop",
            subGroup: "promotion",
            permission: { "C.01": 1, "MRD.01": 1 },
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "/master-membership",
        name: "membership",
        moduleId: "./modules/master-membership/index",
        nav: true,
        title: "Master Membership",
        auth: true,
        settings: {
            group: "bateeq shop",
            subGroup: "promotion",
            permission: { "C.01": 1, "MRD.01": 1 },
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "/general-setting/reward-point",
        name: "general-setting",
        moduleId: "./modules/general-setting/index",
        nav: true,
        title: "Reward Point",
        auth: true,
        settings: {
            group: "bateeq shop",
            subGroup: "general setting",
            permission: { "C.01": 1, "MRD.01": 1 },
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: "/general-setting/reward-point-period",
        name: "general-setting",
        moduleId: "./modules/general-setting/reward-point-period/index",
        nav: true,
        title: "Reward Point Period",
        auth: true,
        settings: {
            group: "bateeq shop",
            subGroup: "general setting",
            permission: { "C.01": 1, "MRD.01": 1 },
            iconClass: "fa fa-dashboard",
        },
    },
    {
        route: '/customers',
        name: 'customers',
        moduleId: './modules/customers/index',
        nav: true,
        title: 'Customers',
        auth: true,
        settings: {
            group: "bateeq shop",
            subGroup: "customers",
            permission: { "C.01": 1, "MRD.01": 1},
            iconClass: 'fa fa-dashboard'
        }
    },
];