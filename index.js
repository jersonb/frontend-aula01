"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestDataHandler = exports.Persons = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "M";
    Gender["FEMALE"] = "F";
})(Gender || (exports.Gender = Gender = {}));
var Persons = exports.Persons = /** @class */ (function () {
    function Persons() {
        var _this = this;
        this.persons = [];
        this.men = function () { return _this.persons.filter(function (x) { return x.gender == Gender.MALE; }); };
        this.women = function () { return _this.persons.filter(function (x) { return x.gender == Gender.FEMALE; }); };
    }
    Persons.prototype.add = function (person) {
        this.persons.push(person);
    };
    Persons.prototype.average = function (persons) {
        return persons.reduce(function (x, y) { return x + y.heidth; }, 0) / persons.length;
    };
    Persons.prototype.max = function (persons) {
        return persons.reduce(function (x, y) { return Math.max(x, y.heidth); }, -Infinity);
    };
    Persons.prototype.min = function (persons) {
        return persons.reduce(function (x, y) { return Math.min(x, y.heidth); }, +Infinity);
    };
    Persons.checkHeidth = function (heidth) {
        return heidth >= 1.1 || heidth <= 2.3;
    };
    Persons.prototype.toString = function () {
        return "\n        Homens: \n        Quantidade: ".concat(this.men().length, " m\u00E9dia: ").concat(this.average(this.men()).toFixed(2), " maior: ").concat(this.max(this.men()), " menor: ").concat(this.min(this.men()), "\n        Mulheres: \n        Quantidade: ").concat(this.women().length, " m\u00E9dia: ").concat(this.average(this.women()).toFixed(2), "  maior: ").concat(this.max(this.women()), " menor: ").concat(this.min(this.women()), "\n        ");
    };
    Persons.instance = new Persons();
    return Persons;
}());
var RequestDataHandler = exports.RequestDataHandler = /** @class */ (function () {
    function RequestDataHandler() {
    }
    RequestDataHandler.prototype.requestHeidth = function (showmessage) {
        var message = 'Informe uma altura válida';
        var result = Number(showmessage(message));
        while (!Persons.checkHeidth(result)) {
            result = Number(showmessage(message));
        }
        return result;
    };
    RequestDataHandler.instance = new RequestDataHandler();
    return RequestDataHandler;
}());
var request = RequestDataHandler.instance;
var heidth = request.requestHeidth(window.prompt);
console.log(heidth);
