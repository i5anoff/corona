var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
function getColor6(v) {
    var c = (v).toString(16).split('');
    while (c.length < 3)
        c.unshift('0');
    // console.log(c.join(""));
    return '#' + c.join("");
}
function getColor12(v) {
    var c = (v).toString(16);
    while (c.length < 6)
        c = '0' + c;
    return '#' + c;
}
function getColor10(v) {
    var r = ((v >> 14) & 63) * (255 / 63);
    var g = (v >> 6) & 255;
    var b = (v & 63) * (255 / 63);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
function getColor11(v) {
    var r = ((v >> 14) & 255);
    var g = ((v >> 6) & 255);
    var b = (v & 63) * (255 / 63);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
function getGray(power, v) {
    var c = Math.floor(255 * (v / (Math.pow(4, power))));
    return "rgb(" + c + ", " + c + ", " + c + ")";
}
var getGrayC = function (power) { return function (v) { return getGray(power, v); }; };
function drawString(array, getColor, canvas, ctx) {
    var animSide = 37; //Math.max(1, Math.round(array.length/11 * (0.5 + 0.5 * Math.sin(Date.now() / 2000))));
    canvas.width = 4 * animSide;
    canvas.height = 4 * Math.ceil(array.length / animSide);
    var x = 0, y = 0, dir = 1;
    for (var i = 0; i < array.length; i++) {
        ctx.fillStyle = getColor(array[i]);
        ctx.fillRect(x * 4, y * 4, 4, 3);
        // x++;
        // if (i % animSide === animSide - 1) {
        //     x = 0;
        //     y++;
        // }
        x += dir;
        if (x === animSide || x === -1) {
            x -= dir;
            ctx.fillRect(x * 4, y * 4, 4, 4);
            dir = -dir;
            y++;
        }
    }
    array.unshift(array.pop());
}
function init() {
    return __awaiter(this, void 0, void 0, function () {
        function tick() {
            drawString(corona6, getColor6, canvas6, ctx6);
            drawString(corona10, getColor10, canvas10, ctx10);
            drawString(corona11, getColor11, canvas11, ctx11);
            drawString(corona12, getColor12, canvas12, ctx12);
            requestAnimationFrame(tick);
        }
        var corona6, corona10, corona11, corona12, canvas6, ctx6, canvas10, ctx10, canvas11, ctx11, canvas12, ctx12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('corona6.json')];
                case 1: return [4 /*yield*/, (_a.sent()).json()];
                case 2:
                    corona6 = _a.sent();
                    return [4 /*yield*/, fetch('corona10.json')];
                case 3: return [4 /*yield*/, (_a.sent()).json()];
                case 4:
                    corona10 = _a.sent();
                    return [4 /*yield*/, fetch('corona11.json')];
                case 5: return [4 /*yield*/, (_a.sent()).json()];
                case 6:
                    corona11 = _a.sent();
                    return [4 /*yield*/, fetch('corona12.json')];
                case 7: return [4 /*yield*/, (_a.sent()).json()];
                case 8:
                    corona12 = _a.sent();
                    canvas6 = document.createElement('canvas');
                    document.body.append(canvas6);
                    ctx6 = canvas6.getContext('2d');
                    canvas10 = document.createElement('canvas');
                    document.body.append(canvas10);
                    ctx10 = canvas10.getContext('2d');
                    canvas11 = document.createElement('canvas');
                    document.body.append(canvas11);
                    ctx11 = canvas11.getContext('2d');
                    canvas12 = document.createElement('canvas');
                    document.body.append(canvas12);
                    ctx12 = canvas12.getContext('2d');
                    tick();
                    return [2 /*return*/];
            }
        });
    });
}
init();
