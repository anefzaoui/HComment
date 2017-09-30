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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_HComment__ = __webpack_require__(1);


document.addEventListener('DOMContentLoaded', function _loaded() {
  document.removeEventListener('DOMContentLoaded', _loaded);
  let comment = new __WEBPACK_IMPORTED_MODULE_0__api_HComment__["a" /* default */]();
  comment.init('commentBox1');
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class HComment {

  constructor() {
    this.commentBox = null;
    this.commentField = null;
    this.mentionList = null;
    this.userList = null;
    this.filteredUserList = null;
    this.mlDOM = null;
    this.shouldCheckCase1 = true;
    /**
     * This should be set to true after an `@` sign is detected
     * as typed. While true, text input of the user should be
     * recorded until this variable is set back to false.
     *
     * While text input is being recorded, the text is at the same
     * time is being sent through to the `getUsersFromAtSign` fn.
     */
    this.isCheckingCase2 = false;
    this.nickText = '';
    this.userInput = '';
    this.mentionAtPos = null;
    this.currentCaretPos = 0;
  }

  /**
   * A hack of selecting nothing to give us the current position
   * of the cursor aka caret.
   */
  getCaretPosition() {
    let savedRange;
    // Works in Firefox, Chrome, Opera, Safari, and IE9+
    if (window.getSelection && window.getSelection().rangeCount > 0) {
      savedRange = window.getSelection().getRangeAt(0).cloneRange();
    } else if (document.selection) {
      savedRange = document.selection.createRange();
    }
    return savedRange.endOffset;
  }
  /**
   * adding the clicked on name to the comment field.
   */
  addNick(name, uInput) {
    /**
     * A long string with something like @str being written
     *
     */
    console.log(`user input: ${uInput} - caret pos: ${this.currentCaretPos} + 1`);
    let fieldText = self.commentField.textContent;

    let part1 = fieldText.substr(0, this.currentCaretPos - (uInput.length + 1));
    let part2 = fieldText.substr(this.currentCaretPos);

    console.log(`part1: ${part1}`);
    console.log(`part2: ${part2}`);

    let output = part1 + name + part2;

    self.commentField.innerHTML = output;
    self.shouldCheckCase1 = false;
  }

  /**
   * loadJSON
   * standard json loading function
   */
  loadJSON(url, callback) {
    const xhr = new XMLHttpRequest();

    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('application/json');
    }

    xhr.open('GET', url);

    xhr.responseType = 'json';
    xhr.addEventListener('load', function io_loadjson(e) {
      if (e.target.status === 200 || e.target.status === 0) {
        callback(e.target.response);
      } else {
        callback(console.error(`Not found: ${url}`));
      }
    });
    xhr.addEventListener('error', callback);
    xhr.addEventListener('timeout', callback);

    try {
      xhr.send(null);
    } catch (e) {
      callback(console.error(`Not found: ${url}`));
    }
  }

  /**
   * Search through the data and return the result from the user's input.
   */
  filterContent(arr, searchKey) {
    return arr.filter(obj => Object.keys(obj).some(key => obj[key].includes(searchKey)));
  }

  /**
   * attaching event listener for keyboard typing to
   * eventually detect the `@` sign and other related logic.
   */
  attachEventListeners() {
    let self = this;

    this.commentField.addEventListener('keyup', e => {
      self.userInput = self.commentField.textContent;

      if (self.userInput.length >= 3) {
        self.getUsersFromString(self.userInput);
      }

      // Check if ESC (27) key is pressed to destroy the mention list.
      if (e.keyCode === 27) {
        self.destroyMentionListDOM();
        self.isCheckingCase2 = false;
      }

      if (e.keyCode === 8 && self.userInput.length === 0) {
        self.destroyMentionListDOM();
        self.isCheckingCase2 = false;
        self.shouldCheckCase1 = true;
      }
      self.currentCaretPos = self.getCaretPosition();
      if (self.isCheckingCase2) {
        self.nickText = self.userInput.substring(self.mentionAtPos + 1, self.currentCaretPos);
        console.log(self.nickText);
        if (self.nickText.length >= 3) {
          self.getUsersFromAtSign(self.nickText);
        } else {
          self.destroyMentionListDOM();
        }
      }
    });

    /**
     * We bind a 'keypress' event because the `@` sign cannot be
     * detected with the keyup event.
     */
    this.commentField.addEventListener('keypress', e => {
      if (e.keyCode == "@".charCodeAt(0)) {
        self.mentionAtPos = self.getCaretPosition();
        self.isCheckingCase2 = true;
      }
    });
  }

  /**
   * `attachMentionListListeners` appends a click event to each of
   * the list items shown by `constructMentionListDOM`
   */
  attachMentionListListeners() {
    const self = this;
    [].forEach.call(this.mentionList.getElementsByClassName('user-suggestion'), el => {
      el.addEventListener('click', function (e) {
        if (e.currentTarget) {
          let selectedNickName = e.currentTarget.querySelector('.user-nick-s').textContent;
          self.addNick(selectedNickName, self.nickText);
          self.destroyMentionListDOM();
          self.isCheckingCase2 = false;
        }
      });
    });
  }

  /**
   * For both `getUsersFromAtSign` and `getUsersFromString`:
   * We try here to construct the suggestion/mention list DOM
   * Based on the string we get by first performing a comparaison
   * between the userList (data.json content) preloaded against the
   * string provided, then we pass the results to the function
   * responsible for making visuals out of that result.
   */

  /**
   * `getUsersFromAtSign` gets its data from detection of what
   * is written after an @ sign randomly placed in the input field.
   */
  getUsersFromAtSign(s) {
    this.filteredUserList = this.filterContent(this.userList, s);
    this.constructMentionListDOM(this.filteredUserList);
  }

  /**
   * `getUsersFromString` gets its data if the input field is empty
   * and the user starts typing and the first character is upper case
   * in that case we start checking against a potential name/username.
   * With this behavior we try to mimick how Facebook decides to start
   * searching for a username against what the user has typed.
   */
  getUsersFromString(s) {
    if (s.charAt(0) === s.charAt(0).toUpperCase() && this.shouldCheckCase1 == true) {
      this.filteredUserList = this.filterContent(this.userList, s);
      this.constructMentionListDOM(this.filteredUserList);
    }
  }

  /**
   * `constructMentionListDOM` this function gets `data` as an array
   * of names and usernames, and parses them then appends them into
   * a visual list which is eventually the mention list/suggestion list.
   */
  constructMentionListDOM(data) {
    this.mlDOM = '';

    if (data.length === 0) {
      this.destroyMentionListDOM();
      this.shouldCheckCase1 = true;
      return console.log('No matches found');
    }

    for (let i = 0; i < data.length; i++) {
      this.mlDOM += `
        <div class="user-suggestion clearfix">
         <div class="user-photo-s">
           <img src='${data[i].avatar_url}'/>
         </div>
         <div class="user-details-s">
           <div class="user-name-s">${data[i].name}</div>
           <div class="user-nick-s">@${data[i].username}</div>
         </div>
        </div>
      `;

      this.mentionList.style.display = 'block';
    }

    this.mentionList.innerHTML = this.mlDOM;
    this.attachMentionListListeners();
  }

  /**
   * `destroyMentionListDOM` removes the DOM of the suggestion list
   * after we're done with it.
   * Examples of when this is called is:
   * - A name is clicked, and added to the input field, therefore there
   * is no need for it to stay on display.
   * - The user hits ESC button
   */
  destroyMentionListDOM() {
    this.mlDOM = '';
    this.mentionList.style.display = 'none';
    this.shouldCheckCase1 = false;
  }

  /**
   * `initData` loads the data from 'data.json' at the beginning
   * of the web page's life cycle.
   */
  initData() {
    const self = this;
    if (this.userList !== null) {
      return;
    }
    this.loadJSON('data/data.json', res => {
      self.userList = res;
    });
  }

  /**
   * initialize the logic, requires a HTML id for the
   * comment box
   */
  init(aCommentBox) {
    this.initData();
    this.commentBox = document.getElementById(aCommentBox);
    this.commentField = this.commentBox.querySelector('#commentField');
    this.mentionList = this.commentBox.querySelector('#mentionList');
    this.attachEventListeners();
  }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = HComment;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map