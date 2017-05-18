/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * The MIT License
 *
 * ShuffleText by Yasunobu Ikeda. Feb 3, 2012
 * Visit http://clockmaker.jp/ for documentation, updates and examples.
 *
 * Copyright (c) 2012-2017 Yasunobu Ikeda
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
/**
 * ShuffleText is random text effect class for DOM Elements.
 * ShuffleTextはDOMエレメント用ランダムテキストクラスです。
 * @author Yasunobu Ikeda
 */
var ShuffleText = (function () {
    /**
     * Constructor.
     * @param element DOMエレメント
     */
    function ShuffleText(element) {
        /**
         * The string for random text.
         * ランダムテキストに用いる文字列です。
         * @type {string}
         * @default 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
         */
        this.sourceRandomCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        /**
         * The string for effect space.
         * 空白に用いる文字列です。
         * @type {string}
         * @default '-'
         */
        this.emptyCharacter = '-';
        /**
         * The milli seconds of effect time.
         * エフェクトの実行時間です。
         * @type {number}
         * @default 600
         */
        this.duration = 600;
        this._isRunning = false;
        this._originalStr = '';
        this._originalLength = 0;
        this._timeCurrent = 0;
        this._timeStart = 0;
        this._randomIndex = [];
        this._requestAnimationFrameId = 0;
        this._element = element;
        this.setText(element.innerHTML);
    }
    /** テキストを設定します。 */
    ShuffleText.prototype.setText = function (text) {
        this._originalStr = text;
        this._originalLength = text.length;
    };
    Object.defineProperty(ShuffleText.prototype, "isRunning", {
        /**
         * It is running flag. 再生中かどうかを示すブール値です。
         * @returns {boolean}
         */
        get: function () {
            return this.isRunning;
        },
        enumerable: true,
        configurable: true
    });
    /** 再生を開始します。 */
    ShuffleText.prototype.start = function () {
        var _this = this;
        this.stop();
        this._randomIndex = [];
        var str = '';
        for (var i = 0; i < this._originalLength; i++) {
            var rate = i / this._originalLength;
            this._randomIndex[i] = Math.random() * (1 - rate) + rate;
            str += this.emptyCharacter;
        }
        this._timeStart = new Date().getTime();
        this._isRunning = true;
        this._requestAnimationFrameId = requestAnimationFrame(function () {
            _this._onInterval();
        });
        this._element.innerHTML = str;
    };
    /** 停止します。 */
    ShuffleText.prototype.stop = function () {
        this._isRunning = false;
        cancelAnimationFrame(this._requestAnimationFrameId);
    };
    ShuffleText.prototype.dispose = function () {
        this.sourceRandomCharacter = null;
        this.emptyCharacter = null;
        this._isRunning = false;
        this.duration = 0;
        this._originalStr = null;
        this._originalLength = 0;
        this._timeCurrent = 0;
        this._timeStart = 0;
        this._randomIndex = null;
        this._element = null;
        this._requestAnimationFrameId = 0;
    };
    /**
     * インターバルハンドラーです。
     * @private
     */
    ShuffleText.prototype._onInterval = function () {
        var _this = this;
        this._timeCurrent = new Date().getTime() - this._timeStart;
        var percent = this._timeCurrent / this.duration;
        var str = '';
        for (var i = 0; i < this._originalLength; i++) {
            if (percent >= this._randomIndex[i]) {
                str += this._originalStr.charAt(i);
            }
            else if (percent < this._randomIndex[i] / 3) {
                str += this.emptyCharacter;
            }
            else {
                str += this.sourceRandomCharacter.charAt(Math.floor(Math.random() * (this.sourceRandomCharacter.length)));
            }
        }
        if (percent > 1) {
            str = this._originalStr;
            this._isRunning = false;
        }
        this._element.innerHTML = str;
        if (this._isRunning === true) {
            this._requestAnimationFrameId = requestAnimationFrame(function () {
                _this._onInterval();
            });
        }
    };
    return ShuffleText;
}());

/* harmony default export */ __webpack_exports__["a"] = (ShuffleText);
//# sourceMappingURL=shuffle-text.module.js.map


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_shuffle_text__ = __webpack_require__(0);


window.addEventListener('load', init);
function init() {
  var effectList = [];
  var elementList = document.querySelectorAll('.my-effect');

  for (var i = 0; i < elementList.length; i++) {

    var element = elementList[i];
    element.dataset.index = i;

    // インスタンスを取得する
    effectList[i] = new __WEBPACK_IMPORTED_MODULE_0_shuffle_text__["a" /* default */](element);

    // マウスオーバー時に再生する
    element.addEventListener('mouseenter', function () {
      effectList[+this.dataset.index].start();
    });

    // マウスアウト時に再生する
    element.addEventListener('mouseleave', function () {
      effectList[+this.dataset.index].start();
    });

    // 初回を再生する
    effectList[i].start();
  }
}


/***/ })
/******/ ]);