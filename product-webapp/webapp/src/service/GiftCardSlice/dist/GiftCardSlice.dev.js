"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchGiftCard = exports["default"] = exports.STATUES = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _reactToastify = require("react-toastify");

require("react-toastify/dist/ReactToastify.css");

var STATUES = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'ERROR'
});
exports.STATUES = STATUES;
var GiftCardSlice = (0, _toolkit.createSlice)({
  name: 'giftcard',
  initialState: {
    giftCardData: [],
    status: ''
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(fetchGiftCard.pending, function (state) {
      state.status = STATUES.LOADING;
    }).addCase(fetchGiftCard.fulfilled, function (state, action) {
      state.status = STATUES.IDLE;
      state.giftCardData = action.payload;
    }).addCase(fetchGiftCard.rejected, function (state) {
      state.status = STATUES.ERROR;
    });
  }
});
var _default = GiftCardSlice.reducer;
exports["default"] = _default;
var fetchGiftCard = (0, _toolkit.createAsyncThunk)('/getGiftCards', function _callee(thunkAPI) {
  var response, message;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('http://localhost:8082/getGiftCards', {
            method: 'GET',
            statusCode: 200
          }));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          return _context.abrupt("return", _context.sent);

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          message = _context.t0.response && _context.t0.response.data && _context.t0.response.data.message || _context.t0.message || _context.t0.toString();
          return _context.abrupt("return", thunkAPI.rejectWithValue(message));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
exports.fetchGiftCard = fetchGiftCard;