var nmasterRoutes = require("./nmaster");
var tokoRoutes = require("./toko");
var gudangPusatRoutes = require("./gudang-pusat");
var laporanRoutes = require("./laporan");
var publicRoutes = require("./public");
var authRoutes = require("./auth");
var finishingRoutes = require("./finishing");
var generalInventoryRoutes = require("./general-inventory");
var bateeqShopRoutes= require("./bateeqshop");
var merchandiserRoutes=require("./merchandiser");

// export default [].concat( nmasterRoutes, publicRoutes, gudangPusatRoutes, tokoRoutes, nmerchandiserRoutes, gpurchasingRoutes, garmentproductionRoutes, laporanRoutes, finishingRoutes);
export default [].concat(
  nmasterRoutes,
  publicRoutes,
  gudangPusatRoutes,
  tokoRoutes,
  finishingRoutes,
  laporanRoutes,
  authRoutes,
  generalInventoryRoutes,
  bateeqShopRoutes,
  merchandiserRoutes
);
