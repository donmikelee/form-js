// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/index.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/* VARIABLES */

/* Collecting all importent elements */
var form = document.getElementById("form");
var tableBody = document.querySelector("tbody");
var submit = document.getElementById("submit");
var inputs = document.querySelectorAll("input");
var selects = document.querySelectorAll("select");
var errorMessages = document.querySelectorAll(".error-message");
var errorMessagesSelect = document.querySelectorAll(".error-message-select");
formInputs = {
  title: inputs[0],
  author: inputs[1]
};
formSelects = {
  priority: selects[0],
  genre: selects[1]
};
var _formInputs = formInputs,
    title = _formInputs.title,
    author = _formInputs.author;
var _formSelects = formSelects,
    priority = _formSelects.priority,
    genre = _formSelects.genre;
/* ************************************* */

/* EXPLAINING ALL FUNCTIONS */

/* When window load up, getDataToTable function gets all data from localStorage and create table*/

var getDataToTable = function getDataToTable(data) {
  data = {
    title: JSON.parse(localStorage.getItem("title")),
    author: JSON.parse(localStorage.getItem("author")),
    priority: JSON.parse(localStorage.getItem("priority")),
    genre: JSON.parse(localStorage.getItem("genre"))
  };
  var _data = data,
      title = _data.title,
      author = _data.author,
      priority = _data.priority,
      genre = _data.genre;

  if (title !== null) {
    for (i = 0; i < title.length; i++) {
      var newDataArray = [];
      newDataArray.push(title[i], author[i], priority[i], genre[i]);
      var row = tableBody.insertRow(i);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = title[i];
      cell2.innerHTML = author[i];
      cell3.innerHTML = priority[i];
      cell4.innerHTML = genre[i];
    }
  } else {
    console.log("Brak danych do pobrania");
  }
};
/* Creates table from inputs and selects values after submitting form */


var createTable = function createTable(data) {
  data = {
    title: document.getElementById("book-title").value.trim(),
    author: document.getElementById("author-name").value.trim(),
    priority: document.getElementById("priority").value.trim(),
    genre: document.getElementById("book-genre").value.trim()
  };
  var _data2 = data,
      title = _data2.title,
      author = _data2.author,
      priority = _data2.priority,
      genre = _data2.genre;
  var dataArray = [title, author, priority, genre];
  var row = document.createElement("tr");

  for (i = 0; i < dataArray.length; i++) {
    var cell = document.createElement("td");
    cell.innerHTML = dataArray[i];
    row.appendChild(cell);
  }

  tableBody.appendChild(row);
};
/* Cleares all inputs and selects values */


var clearInputs = function clearInputs() {
  var _iterator = _createForOfIteratorHelper(inputs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var input = _step.value;
      input.value = "";
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var _iterator2 = _createForOfIteratorHelper(selects),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var select = _step2.value;
      select.value = "";
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
};
/* To keep values in array, this funciton initials array to localStorage */


var setData = function setData() {
  if (localStorage.getItem("title") == null) {
    localStorage.setItem("title", "[]");
    localStorage.setItem("author", "[]");
    localStorage.setItem("priority", "[]");
    localStorage.setItem("genre", "[]");
  }
};
/* It displays error messages above inputs */


var displayErrors = function displayErrors() {
  for (i = 0; i < inputs.length; i++) {
    var isError = inputs[i].hasAttribute("error");

    if (isError) {
      errorMessages[i].innerHTML = "Title should be at least 1 character long";
      inputs[i].classList.add("error");
    }

    if (isError && i === 1) {
      inputs[i].classList.add("error");
      errorMessages[i].innerHTML = "Author should be at least 3 characters long";
    }

    if (!isError) {
      inputs[i].classList.remove("error");
      errorMessages[i].innerHTML = "";
    }
  }
};
/* It displays error messages above selects*/


var displayErrorsSelect = function displayErrorsSelect() {
  for (i = 0; i < selects.length; i++) {
    var isError = selects[i].hasAttribute("error");

    if (isError) {
      errorMessagesSelect[i].innerHTML = "Choose number of priority from the list";
      selects[i].classList.add("error");
    }

    if (isError && i === 1) {
      errorMessagesSelect[i].innerHTML = "Choose genre from the list";
      selects[i].classList.add("error");
    }

    if (!isError) {
      selects[i].classList.remove("error");
      errorMessagesSelect[i].innerHTML = "";
    }
  }
};
/* First takes arrays from localStorage, then grabs all values and sends it into localStorage*/


var setDatatoStorage = function setDatatoStorage(data) {
  data = {
    title: document.getElementById("book-title").value.trim(),
    author: document.getElementById("author-name").value.trim(),
    priority: document.getElementById("priority").value.trim(),
    genre: document.getElementById("book-genre").value.trim()
  };
  var _data3 = data,
      title = _data3.title,
      author = _data3.author,
      priority = _data3.priority,
      genre = _data3.genre;
  var titleArray = JSON.parse(localStorage.getItem("title"));
  titleArray.push(title);
  var authorArray = JSON.parse(localStorage.getItem("author"));
  authorArray.push(author);
  var priorityArray = JSON.parse(localStorage.getItem("priority"));
  priorityArray.push(priority);
  var genreArray = JSON.parse(localStorage.getItem("genre"));
  genreArray.push(genre);
  localStorage.setItem("title", JSON.stringify(titleArray));
  localStorage.setItem("author", JSON.stringify(authorArray));
  localStorage.setItem("priority", JSON.stringify(priorityArray));
  localStorage.setItem("genre", JSON.stringify(genreArray));
};
/* It blocks button or makes it able for user */


var enableButton = function enableButton() {
  setInterval(function () {
    var titleValue = title.value.trim();
    var authorValue = author.value.trim();

    if (titleValue.length > 0 && authorValue.length >= 3 && priority.value.length > 0 && genre.value.length > 0) {
      submit.classList.remove("disabled");
    } else {
      submit.classList.add("disabled");
    }
  }, 100);
};
/* ************************************* */

/*EVENT LISTENERS*/

/*Every listener on inputs or selects purpose is validation*/


title.addEventListener("focusout", function (event) {
  var titleValue = event.target.value.trim();

  if (titleValue.length < 1) {
    title.setAttribute("error", "");
    form.setAttribute("error", "");
    displayErrors();
  } else {
    title.removeAttribute("error");
    form.removeAttribute("error");
    displayErrors();
  }
});
author.addEventListener("focusout", function (event) {
  var authorValue = event.target.value.trim();

  if (authorValue.length < 3) {
    author.setAttribute("error", "");
    displayErrors();
  } else {
    author.removeAttribute("error");
    displayErrors();
  }
});
priority.addEventListener("focusout", function (event) {
  var priorityValue = event.target.value;

  if (!priorityValue) {
    priority.setAttribute("error", "");
    displayErrorsSelect();
  } else {
    priority.removeAttribute("error");
    displayErrorsSelect();
  }
});
priority.addEventListener("change", function (event) {
  var priorityValue = event.target.value;

  if (priorityValue) {
    priority.removeAttribute("error");
    displayErrorsSelect();
  }
});
genre.addEventListener("focusout", function (event) {
  var genreValue = event.target.value;

  if (!genreValue) {
    genre.setAttribute("error", "");
    displayErrorsSelect();
  } else {
    genre.removeAttribute("error");
    displayErrorsSelect();
  }
});
genre.addEventListener("change", function (event) {
  var genreValue = event.target.value;

  if (genreValue) {
    genre.removeAttribute("error");
    displayErrorsSelect();
  }
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  setData();
  createTable();
  setDatatoStorage();
  clearInputs();
});
window.addEventListener("load", function () {
  getDataToTable();
});
enableButton();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63449" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map