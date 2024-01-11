module.exports = [
//   {
//     route: 'account-bank',
//     name: 'account-bank',
//     moduleId: './modules/master/naccount-bank/index',
//     nav: true,
//     title: 'Akun Bank',
//     auth: true,
//     settings: {
//         group: "nmaster",
//         permission: { "C.01": 1 },
//         iconClass: 'fa fa-dashboard'
//     }
//   },
//   {
//     route: 'garment-buyers',
//     name: 'garment-buyers',
//     moduleId: './modules/master/garment-buyer/index',
//     nav: true,
//     title: 'Buyer Garment',
//     auth: true,
//     settings: {
//         group: "nmaster",
//         permission: {  "C.01": 1, "MRD.01": 1 },
//         iconClass: 'fa fa-adjust'
//     }
// },
// {
//   route: 'budgets',
//   name: 'budgets',
//   moduleId: './modules/master/budget/index',
//   nav: true,
//   title: 'Budget',
//   auth: true,
//   settings: {
//       group: "nmaster",
//       permission: { "C.01": 1 },
//       iconClass: 'fa fa-dashboard'
//   }
// },
// {
//   route: "rate",
//   name: "rate",
//   moduleId: "./modules/master/rate/index",
//   nav: true,
//   title: "Ongkos",
//   auth: true,
//   settings: {
//     group: "nmaster",
//     permission: { "C.01" : 1, "MRD.01": 1 },
//     iconClass: "fa fa-adjust"
//   }
// },
// {
//   route: 'suppliers/budgeting',
//   name: 'suppliers/budgeting',
//   moduleId: './modules/master/supplier-budgeting/index',
//   nav: true,
//   title: 'Supplier',
//   auth: true,
//   settings: {
//       group: "nmaster",
//       permission: { "C.01": 1, "C5": 1 },
//       iconClass: 'fa fa-dashboard'
//   }
// },
// {
//   route: 'suppliers',
//   name: 'suppliers',
//   moduleId: './modules/master/supplier/index',
//   nav: true,
//   title: 'Supplier Read Only',
//   auth: true,
//   settings: {
//       group: "nmaster",
//       permission: { "C.01": 1, "PBL.01": 1 },
//       iconClass: 'fa fa-dashboard'
//   }
// },
// {
//   route: 'categories',
//   name: 'categories',
//   moduleId: './modules/master/ncategory/index',
//   nav: true,
//   title: 'Kategori',
//   auth: true,
//   settings: {
//       group: "nmaster",
//       permission: { "C.01": 1 },
//       iconClass: 'fa fa-dashboard'
//   }
// },
{
  route: 'divisions',
  name: 'divisions',
  moduleId: './modules/master/division/index',
  nav: true,
  title: 'Divisi',
  auth: true,
  settings: {
      group: "nmaster",
      permission: { "C.01": 1 },
      iconClass: 'fa fa-adjust'
  }
},
// {
//   route: "efficiency",
//   name: "efficiency",
//   moduleId: "./modules/master/nefficiency/index",
//   nav: true,
//   title: "Efficiency",
//   auth: true,
//   settings: {
//     group: "nmaster",
//     permission: { "C.01" : 1, "MRD.01": 1 },
//     iconClass: "fa fa-adjust"
//   }
// },
{
  route: 'units',
  name: 'units',
  moduleId: './modules/master/unit/index',
  nav: true,
  title: 'Unit',
  auth: true,
  settings: {
      group: "nmaster",
      permission: {"C.01": 1 },
      iconClass: 'fa fa-adjust'
  }

},
// {
//   route: 'products/budgeting',
//   name: 'products/budgeting',
//   moduleId: './modules/master/product-budgeting/index',
//   nav: true,
//   title: 'Barang',
//   auth: true,
//   settings: {
//       group: "nmaster",
//       permission: {"C.01": 1, "C5": 1 },
//       iconClass: 'fa fa-dashboard'
//   }
// },
// {
//   route: 'products',
//   name: 'products',
//   moduleId: './modules/master/product/index',
//   nav: true,
//   title: 'Barang',
//   auth: true,
//   settings: {
//       group: "nmaster",
//       permission: {"C.01": 1, "PBL.01": 1, "GDG.07": 1, "GDG.08": 1, "GDG.10": 1 },
//      // permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "S4": 1, "C3": 1, "E": 1, "K": 1, "S1": 1, "S2": 1, "S3": 1, "U1": 1, "F1": 1, "F2": 1, "L3": 1, "LK": 1, "L8": 1, "L2": 1, "C2": 1, "A2": 1, "C1": 1, "B5": 1, "L1": 1, "B4": 1, "B3": 1, "C4": 1, "OJ": 1, "A1": 1, "B9": 1, "A4": 1, "P1A": 1, "C2A": 1, "C2B": 1, "FP": 1, "PI": 1, "P": 1, "FC": 1, "GU": 1, "GS": 1, "PG": 1, "C1A": 1, "C1B": 1, "KK": 1, "B1": 1, "W1": 1, "W2": 1},
//       iconClass: 'fa fa-dashboard'
//   }
// },
{
  route: 'storage',
  name: 'storage',
  moduleId: './modules/master/storage/index',
  nav: true,
  title: 'Storage',
  auth: true,
  settings: {
      group: "nmaster",
      permission: {"C.01": 1 },
      //permission: { "P1": 1, "P3": 1, "P4": 1, "P6": 1, "P7": 1, "PG": 1, "C9": 1 },
      iconClass: 'fa fa-dashboard'
  }
},
// {
//   route: 'uoms',
//   name: 'uoms',
//   moduleId: './modules/master/nuom/index',
//   nav: true,
//   title: 'Satuan',
//   auth: true,
//   settings: {
//       group: "nmaster",
//       permission: {"C.01": 1 },
//       //permission: { "C9": 1 },
//       iconClass: 'fa fa-dashboard'
//   }
// },
{
  route: 'master/expeditions',
  name: 'master/expeditions',
  moduleId: './modules/master/expedition/index',
  nav: true,
  title: 'Master Ekspedisi',
  auth: true,
  settings: {
      group: "nmaster",
      permission: {"C.01": 1 },
      iconClass: 'fa fa-dashboard'
  }
},
{
  route: "store",
  name: "store",
  moduleId: "./modules/master/store/index",
  nav: true,
  title: "Store",
  auth: true,
  settings: {
    group: "nmaster",
    permission: {"C.01": 1 },
    iconClass: ""
  }
},
{
  route: "article-category",
  name: "article-category",
  moduleId: "./modules/master/article-category/index",
  nav: true,
  title: "Kategori",
  auth: true,
  settings: {
    group: "nmaster",
    permission: {"C.01": 1 },
    iconClass: ""
  }
},
{
  route: "article-style",
  name: "article-style",
  moduleId: "./modules/master/article-style/index",
  nav: true,
  title: "Style",
  auth: true,
  settings: {
    group: "nmaster",
    permission: {"C.01": 1 },
    iconClass: ""
  }
},
{
  route: "article-process",
  name: "article-process",
  moduleId: "./modules/master/article-process/index",
  nav: true,
  title: "Proses",
  auth: true,
  settings: {
    group: "nmaster",
    permission: {"C.01": 1 },
    iconClass: ""
  }
},
{
  route: "article-material",
  name: "article-material",
  moduleId: "./modules/master/article-material/index",
  nav: true,
  title: "Bahan",
  auth: true,
  settings: {
    group: "nmaster",
    permission: {"C.01": 1 },
    iconClass: ""
  }
},
{
  route: "article-material-composition",
  name: "article-material-composition",
  moduleId: "./modules/master/article-material-composition/index",
  nav: true,
  title: "Komposisi Bahan",
  auth: true,
  settings: {
    group: "nmaster",
    permission: {"C.01": 1 },
    iconClass: ""
  }
},
{
  route: "article-collection",
  name: "article-collection",
  moduleId: "./modules/master/article-collection/index",
  nav: true,
  title: "Koleksi",
  auth: true,
  settings: {
    group: "nmaster",
    permission: {"C.01": 1 },
    iconClass: ""
  }
},
{
  route: "article-season",
  name: "article-season",
  moduleId: "./modules/master/article-season/index",
  nav: true,
  title: "Season",
  auth: true,
  settings: {
    group: "nmaster",
    permission: {"C.01": 1 },
    iconClass: ""
  }
},
{
  route: "article-counter",
  name: "article-counter",
  moduleId: "./modules/master/article-counter/index",
  nav: true,
  title: "Konter",
  auth: true,
  settings: {
    group: "nmaster",
    permission: {"C.01": 1 },
    iconClass: ""
  }
},
{
  route: "article-color",
  name: "article-color",
  moduleId: "./modules/master/article-color/index",
  nav: true,
  title: "Color",
  auth: true,
  settings: {
    group: "nmaster",
    permission: {"C.01": 1 },
    iconClass: ""
  }
},
];
