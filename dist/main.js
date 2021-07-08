/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n(function () {\n  var inputValueDisElm = document.querySelector('.tweet-name');\n  var addBtnDisElm = document.querySelector('.addBtn');\n  var filterInputDisElm = document.querySelector('.filter');\n  var olDisElm = document.querySelector('.collection');\n  var errorMsgDisElm = document.querySelector('.errorMsg');\n  var msgDisElm = document.querySelector('.msg');\n  var keyNum = document.querySelector('.keyNum span');\n  var num = 0;\n  var tweetData = getDataFromLocalStorage(); // load all event\n\n  var loadAllEventListener = function loadAllEventListener() {\n    window.addEventListener('DOMContentLoaded', getData.bind(null, tweetData));\n    inputValueDisElm.addEventListener('keydown', checkWordLimit);\n    addBtnDisElm.addEventListener('click', addTweet);\n    olDisElm.addEventListener('click', modifyOrDeleteTweet);\n    filterInputDisElm.addEventListener('keyup', searchTweet);\n  }; // show message if tweet found or not\n\n\n  function showMessage() {\n    var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';\n    msgDisElm.textContent = msg;\n  } // tweet getting from localStorage\n\n\n  function getDataFromLocalStorage() {\n    var items = '';\n\n    if (localStorage.getItem('TweetItems') === null) {\n      items = [];\n    } else {\n      items = JSON.parse(localStorage.getItem('TweetItems'));\n    }\n\n    return items;\n  } // saving tweet in localStorage\n\n\n  function saveDataToLocalStorage(item) {\n    var items = '';\n\n    if (localStorage.getItem('TweetItems') === null) {\n      items = [];\n      items.push(item);\n      localStorage.setItem('TweetItems', JSON.stringify(items));\n    } else {\n      items = JSON.parse(localStorage.getItem('TweetItems'));\n      items.push(item);\n      localStorage.setItem('TweetItems', JSON.stringify(items));\n    }\n  } //tweet deleting form localStorage\n\n\n  function deleteItemFromLocalStorage(id) {\n    var items = JSON.parse(localStorage.getItem('TweetItems'));\n    var result = items.filter(function (TweetItem) {\n      return TweetItem.id !== id;\n    });\n    localStorage.setItem('TweetItems', JSON.stringify(result));\n\n    if (result.length === 0) {\n      location.reload();\n    }\n  } // getting data form store and populate ul\n\n\n  function getData(tweetList) {\n    if (tweetList.length > 0) {\n      showMessage();\n      var li = '';\n      tweetList.forEach(function (tweet) {\n        li = document.createElement('li');\n        li.className = 'collection-item mb-2';\n        li.id = \"tweet-\".concat(tweet.id);\n        li.innerHTML = \"\\n                        <span>\".concat(tweet.tweetName, \"</span>\\n                        <button class=\\\"btn btn-primary btn-sm tweet-edit\\\">Edit</button>\\n                        <button class=\\\"btn btn-danger btn-sm  tweet-delete\\\">Delete</button>\\n                         \").concat(tweet.date, \" \").concat(tweet.time, \" \").concat(tweet.checkTimeFromNow, \"\\n                \");\n        olDisElm.append(li);\n      });\n    } else {\n      showMessage('No item to show');\n    }\n  } // counting word and if maximum then no word add to input filed\n\n\n  var checkWordLimit = function checkWordLimit(e) {\n    if (num < 15 && e.keyCode !== 8) {\n      num++;\n    } else if (num > 0 && e.keyCode === 8) {\n      num--;\n      addBtnDisElm.removeAttribute('disabled');\n    } else if (num >= 15) {\n      e.preventDefault();\n      addBtnDisElm.setAttribute('disabled', 'disabled');\n    }\n\n    keyNum.textContent = num;\n  };\n\n  function inValidInput(name) {\n    return name === '';\n  } // adding tweet\n\n\n  var addTweet = function addTweet(e) {\n    e.preventDefault();\n    var name = inputValueDisElm.value;\n    var isInputOk = inValidInput(name);\n\n    if (isInputOk) {\n      errorMsgDisElm.style.display = '';\n      errorMsgDisElm.textContent = 'Enter text between 1-15';\n      errorMsgDisElm.style.backgroundColor = 'yellow';\n      errorMsgDisElm.style.color = 'black';\n      setTimeout(function () {\n        errorMsgDisElm.textContent = '';\n        errorMsgDisElm.style.display = 'none';\n      }, 2000);\n    } else {\n      var tweetName = name.trim();\n      var date = dayjs().format('MMM/DD/YYYY');\n      var time = dayjs().format('LT');\n      var checkTime = dayjs().format();\n      var checkTimeFromNow = dayjs(checkTime).fromNow();\n      var id;\n\n      if (tweetData.length === 0) {\n        id = 0;\n      } else {\n        id = tweetData[tweetData.length - 1].id + 1;\n      }\n\n      var data = {\n        id: id,\n        tweetName: tweetName,\n        date: date,\n        time: time,\n        checkTimeFromNow: checkTimeFromNow\n      };\n      olDisElm.innerHTML = '';\n      tweetData.push(data);\n      getData(tweetData);\n      saveDataToLocalStorage(data);\n      num = 0;\n      keyNum.textContent = num;\n      inputValueDisElm.value = '';\n    }\n  }; // edit,update and delete tweet from view and call deleteItemFromLocalStorage(id) for delete in localStorage\n\n\n  var modifyOrDeleteTweet = function modifyOrDeleteTweet(e) {\n    var target = e.target.parentElement;\n    var id = parseInt(target.id.split('-')[1]);\n\n    if (e.target.classList.contains('tweet-delete')) {\n      e.target.parentElement.parentElement.removeChild(target);\n      var result = tweetData.filter(function (tweet) {\n        return tweet.id !== id;\n      });\n      tweetData = result;\n      deleteItemFromLocalStorage(id);\n    } else if (e.target.classList.contains('tweet-edit')) {\n      var foundTweet = findTweet(id); //i have to select the item to edit\n\n      populateEditItem(foundTweet); //update tweet\n\n      updateTweetItem(foundTweet.id);\n    }\n  };\n\n  function findTweet(id) {\n    var foundTweet = tweetData.find(function (TweetItem) {\n      return TweetItem.id === id;\n    });\n\n    if (!foundTweet) {\n      alert('You tweet is not Found');\n      return;\n    }\n\n    return foundTweet;\n  }\n\n  function populateEditItem(foundTweet) {\n    inputValueDisElm.value = foundTweet.tweetName;\n    addBtnDisElm.style.display = 'none';\n    var updateBtn = \"<button type='submit' class='btn btn-primary btn-block middle2 w-50 update-tweet'>update</button>\";\n    document.querySelector('form').insertAdjacentHTML('beforeend', updateBtn);\n    var checkCharCount = foundTweet.tweetName.length;\n    num = checkCharCount;\n    keyNum.textContent = checkCharCount; // document.querySelector('.edit-tweet').style.display = 'none'\n  }\n\n  function updateTweetItem(id) {\n    document.querySelector('.update-tweet').addEventListener('click', function (e) {\n      e.preventDefault();\n      var isInputOk = inValidInput(inputValueDisElm.tweetName);\n\n      if (isInputOk) {\n        alert('input is not valid');\n      } else {\n        tweetData = tweetData.map(function (TweetItem) {\n          if (TweetItem.id === id) {\n            return _objectSpread(_objectSpread({}, TweetItem), {}, {\n              tweetName: inputValueDisElm.value\n            });\n          } else {\n            return TweetItem;\n          }\n        });\n      }\n\n      olDisElm.innerHTML = '';\n      getData(tweetData);\n      inputValueDisElm.value = '';\n      addBtnDisElm.style.display = 'block';\n      document.querySelector('.update-tweet').remove(); //save updated array to localStorage\n\n      localStorage.setItem('TweetItems', JSON.stringify(tweetData));\n      num = 0;\n      keyNum.textContent = num;\n    });\n  } // search tweet from view\n\n\n  var searchTweet = function searchTweet(e) {\n    var text = e.target.value.toLowerCase();\n    var itemLength = 0;\n    document.querySelectorAll('.collection .collection-item').forEach(function (item) {\n      var nameOfTweet = item.firstElementChild.textContent.toLowerCase();\n\n      if (nameOfTweet.indexOf(text) === -1) {\n        item.style.display = 'none';\n      } else {\n        item.style.display = 'block';\n        itemLength++;\n      }\n    });\n\n    if (itemLength > 0) {\n      showMessage('');\n    } else {\n      showMessage('No item found');\n    }\n  };\n\n  loadAllEventListener();\n})(); // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))\n\n//# sourceURL=webpack://my-webpack-project/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;