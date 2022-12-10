"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _UserSlice = _interopRequireDefault(require("../service/LoginSlice/UserSlice"));

var _GiftCardSlice = _interopRequireDefault(require("../service/GiftCardSlice/GiftCardSlice"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var store = (0, _toolkit.configureStore)({
  reducer: {
    user: _UserSlice["default"],
    giftcard: _GiftCardSlice["default"]
  }
});
var _default = store;
exports["default"] = _default;