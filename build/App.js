"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var jimp_1 = __importDefault(require("jimp"));
var querystring_1 = __importDefault(require("querystring"));
var app = express_1.default();
exports.app = app;
app.get('/', function (req, res) {
    console.log('hitting route...');
    res.send('hello!');
});
app.get('/images/:imageID', function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var urlParams, queryParams, jimpImage, _a, _b, aspectRatio, smallerDimension, _c, _d, _e, _f, _g, width, height, _h, _j, _k, width, height, _l, _m;
        return __generator(this, function (_o) {
            switch (_o.label) {
                case 0:
                    urlParams = req.params;
                    queryParams = parseQueryParams(req.url);
                    return [4 /*yield*/, fetchImage(urlParams.imageID)];
                case 1:
                    jimpImage = _o.sent();
                    res.setHeader('Content-Type', 'image/jpeg');
                    if (!(Object.keys(queryParams).length === 0)) return [3 /*break*/, 3];
                    _b = (_a = res).send;
                    return [4 /*yield*/, jimpImage.getBufferAsync(jimp_1.default.MIME_JPEG)];
                case 2:
                    _b.apply(_a, [_o.sent()]);
                    return [2 /*return*/];
                case 3:
                    aspectRatio = jimpImage.bitmap.width / jimpImage.bitmap.height;
                    if (!(queryParams.format && queryParams.format === 'square')) return [3 /*break*/, 5];
                    smallerDimension = Math.min(jimpImage.bitmap.width, jimpImage.bitmap.height);
                    jimpImage.cover(smallerDimension, smallerDimension, jimp_1.default.HORIZONTAL_ALIGN_CENTER | jimp_1.default.VERTICAL_ALIGN_MIDDLE);
                    _d = (_c = res).send;
                    return [4 /*yield*/, jimpImage.getBufferAsync(jimp_1.default.MIME_JPEG)];
                case 4:
                    _d.apply(_c, [_o.sent()]);
                    return [2 /*return*/];
                case 5:
                    console.log(queryParams);
                    if (!(queryParams.w && queryParams.h)) return [3 /*break*/, 7];
                    jimpImage.resize(queryParams.w, queryParams.h);
                    _f = (_e = res).send;
                    return [4 /*yield*/, jimpImage.getBufferAsync(jimp_1.default.MIME_JPEG)];
                case 6:
                    _f.apply(_e, [_o.sent()]);
                    return [2 /*return*/];
                case 7:
                    if (!(queryParams.h && !queryParams.w)) return [3 /*break*/, 9];
                    _g = resizeWidth(queryParams.h, aspectRatio), width = _g[0], height = _g[1];
                    jimpImage.resize(width, height);
                    _j = (_h = res).send;
                    return [4 /*yield*/, jimpImage.getBufferAsync(jimp_1.default.MIME_JPEG)];
                case 8:
                    _j.apply(_h, [_o.sent()]);
                    return [2 /*return*/];
                case 9:
                    if (!(queryParams.w && !queryParams.h)) return [3 /*break*/, 11];
                    _k = resizeHeight(queryParams.w, aspectRatio), width = _k[0], height = _k[1];
                    jimpImage.resize(width, height);
                    _m = (_l = res).send;
                    return [4 /*yield*/, jimpImage.getBufferAsync(jimp_1.default.MIME_JPEG)];
                case 10:
                    _m.apply(_l, [_o.sent()]);
                    return [2 /*return*/];
                case 11: return [2 /*return*/];
            }
        });
    });
});
function parseQueryParams(url) {
    var queryParams = {};
    var queryIndex = url.indexOf('?');
    if (queryIndex >= 0) {
        var query = url.substr(queryIndex + 1);
        queryParams = querystring_1.default.parse(query);
    }
    return queryParams;
}
function fetchImage(id) {
    return __awaiter(this, void 0, void 0, function () {
        var awsURL, formattedURL;
        return __generator(this, function (_a) {
            awsURL = 'https://s3-us-west-2.amazonaws.com/makersdistillery/1000x/';
            formattedURL = "" + awsURL + id + ".jpg";
            return [2 /*return*/, jimp_1.default.read(formattedURL)];
        });
    });
}
function resizeWidth(height, aspectRatio) {
    return [height, height * aspectRatio];
}
function resizeHeight(width, aspectRatio) {
    return [width / aspectRatio, width];
}
