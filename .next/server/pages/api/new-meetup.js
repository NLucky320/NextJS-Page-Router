"use strict";
(() => {
var exports = {};
exports.id = 958;
exports.ids = [958];
exports.modules = {

/***/ 209:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ new_meetup)
});

;// CONCATENATED MODULE: external "dns"
const external_dns_namespaceObject = require("dns");
var external_dns_default = /*#__PURE__*/__webpack_require__.n(external_dns_namespaceObject);
;// CONCATENATED MODULE: external "mongodb"
const external_mongodb_namespaceObject = require("mongodb");
;// CONCATENATED MODULE: ./pages/api/new-meetup.js


// Node's resolver was pointing at 127.0.0.1 (no DNS server there), which
// breaks the SRV lookup for mongodb+srv:// URIs. Use public DNS instead.
external_dns_default().setServers([
    "8.8.8.8",
    "1.1.1.1"
]);
// /api/new-meetup
// POST /api/new-meetup
async function handler(req, res) {
    if (req.method === "POST") {
        const data = req.body;
        const uri = process.env.MONGODB_URI;
        if (!uri) throw new Error("Missing MONGODB_URI");
        const client = new external_mongodb_namespaceObject.MongoClient(uri);
        const db = client.db();
        const meetupsCollection = db.collection("meetups");
        const result = await meetupsCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({
            message: "Meetup inserted!"
        });
    }
}
/* harmony default export */ const new_meetup = (handler);


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(209));
module.exports = __webpack_exports__;

})();