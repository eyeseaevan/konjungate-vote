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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vote.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Vote.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      vote: {
        vote: '',
        address: '',
        signature: ''
      },
      errors: [],
      tasks: [],
      update_vote: {}
    };
  },
  mounted: function mounted() {
    this.readVotes();
  },
  methods: {
    deleteVote: function deleteVote(index) {
      var _this = this;

      var conf = confirm("Do you ready want to delete your vote?");

      if (conf === true) {
        axios["delete"]('/vote/' + this.votes[index].id).then(function (response) {
          _this.tasks.splice(index, 1);
        })["catch"](function (error) {});
      }
    },
    initAddVote: function initAddVote() {
      $("#add_vote_model").modal("show");
    },
    createVote: function createVote() {
      var _this2 = this;

      axios.post('/vote', {
        vote: this.vote.vote,
        address: this.vote.address,
        signature: this.vote.signature
      }).then(function (response) {
        _this2.reset();

        _this2.votes.push(response.data.vote);

        $("#add_vote_model").modal("hide");
      })["catch"](function (error) {
        _this2.errors = [];

        if (error.response.data.errors && error.response.data.errors.vote) {
          _this2.errors.push(error.response.data.errors.vote[0]);
        }

        if (error.response.data.errors && error.response.data.errors.address) {
          _this2.errors.push(error.response.data.errors.address[0]);
        }

        if (error.response.data.errors && error.response.data.errors.signature) {
          _this2.errors.push(error.response.data.errors.signature[0]);
        }
      });
    },
    reset: function reset() {
      this.vote.vote = '';
      this.vote.address = '';
      this.vote.signature = '';
    },
    readVotes: function readVotes() {
      var _this3 = this;

      axios.get('http://127.0.0.1:8000/vote').then(function (response) {
        _this3.votes = response.data.votes;
      });
    },
    initUpdate: function initUpdate(index) {
      this.errors = [];
      $("#update_vote_model").modal("show");
      this.update_vote = this.votes[index];
    },
    updateVote: function updateVote() {
      var _this4 = this;

      axios.patch('/vote/' + this.update_vote.id, {
        vote: this.vote.vote,
        address: this.vote.address,
        signature: this.vote.signature
      }).then(function (response) {
        $("#update_vote_model").modal("hide");
      })["catch"](function (error) {
        _this4.errors = [];

        if (error.response.data.errors.name) {
          _this4.errors.push(error.response.data.errors.vote[0]);
        }

        if (error.response.data.errors.address) {
          _this4.errors.push(error.response.data.errors.address[0]);
        }

        if (error.response.data.errors.signature) {
          _this4.errors.push(error.response.data.errors.signature[0]);
        }
      });
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vote.vue?vue&type=template&id=40e744d5&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/components/Vote.vue?vue&type=template&id=40e744d5& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-12" }, [
        _c("div", { staticClass: "panel panel-default" }, [
          _c("div", { staticClass: "panel-heading" }, [
            _vm._m(0),
            _vm._v(" "),
            _c("br"),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-success ",
                staticStyle: { padding: "5px" },
                on: {
                  click: function($event) {
                    return _vm.initAddTask()
                  }
                }
              },
              [_vm._v("\n               Add New Assignment\n               ")]
            )
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "panel-body" }, [
            _vm.tasks.length > 0
              ? _c(
                  "table",
                  {
                    staticClass:
                      "table table-bordered table-striped table-responsive"
                  },
                  [
                    _c(
                      "tbody",
                      [
                        _vm._m(1),
                        _vm._v(" "),
                        _vm._l(_vm.votes, function(vote, index) {
                          return _c("tr", [
                            _c("td", [_vm._v(_vm._s(index + 1))]),
                            _vm._v(" "),
                            _c("td", [
                              _vm._v(
                                "\n                           " +
                                  _vm._s(vote.vote) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _vm._v(
                                "\n                           " +
                                  _vm._s(vote.address) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _vm._v(
                                "\n                           " +
                                  _vm._s(vote.signature) +
                                  "\n                        "
                              )
                            ]),
                            _vm._v(" "),
                            _c("td", [
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-success btn-xs",
                                  staticStyle: { padding: "8px" },
                                  on: {
                                    click: function($event) {
                                      return _vm.initUpdate(index)
                                    }
                                  }
                                },
                                [
                                  _c("span", {
                                    staticClass: "glyphicon glyphicon-edit"
                                  })
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "button",
                                {
                                  staticClass: "btn btn-danger btn-xs",
                                  staticStyle: { padding: "8px" },
                                  on: {
                                    click: function($event) {
                                      return _vm.deleteTask(index)
                                    }
                                  }
                                },
                                [
                                  _c("span", {
                                    staticClass: "glyphicon glyphicon-trash"
                                  })
                                ]
                              )
                            ])
                          ])
                        })
                      ],
                      2
                    )
                  ]
                )
              : _vm._e()
          ])
        ])
      ])
    ]),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: { tabindex: "-1", role: "dialog", id: "add_task_model" }
      },
      [
        _c(
          "div",
          { staticClass: "modal-dialog", attrs: { role: "document" } },
          [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(2),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _vm.errors.length > 0
                  ? _c("div", { staticClass: "alert alert-danger" }, [
                      _c(
                        "ul",
                        _vm._l(_vm.errors, function(error) {
                          return _c("li", [_vm._v(_vm._s(error))])
                        }),
                        0
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "form-group" }, [
                  _c("label", { attrs: { for: "names" } }, [_vm._v("Vote:")]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.vote.vote,
                        expression: "vote.vote"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: {
                      type: "text",
                      name: "vote",
                      id: "vote",
                      placeholder: "Vote"
                    },
                    domProps: { value: _vm.vote.vote },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.vote, "vote", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group" }, [
                  _c("label", { attrs: { for: "names" } }, [
                    _vm._v("Address:")
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.vote.address,
                        expression: "vote.address"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: {
                      type: "text",
                      name: "address",
                      id: "address",
                      placeholder: "Address"
                    },
                    domProps: { value: _vm.vote.address },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.vote, "address", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group" }, [
                  _c("label", { attrs: { for: "names" } }, [
                    _vm._v("Signature:")
                  ]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.vote.signature,
                        expression: "vote.signature"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: {
                      type: "text",
                      name: "sig",
                      id: "sig",
                      placeholder: "Signature"
                    },
                    domProps: { value: _vm.vote.signature },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.vote, "signature", $event.target.value)
                      }
                    }
                  })
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "modal-footer" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-default",
                    attrs: { type: "button", "data-dismiss": "modal" }
                  },
                  [_vm._v("Close")]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary",
                    attrs: { type: "button" },
                    on: { click: _vm.createTask }
                  },
                  [_vm._v("Submit")]
                )
              ])
            ])
          ]
        )
      ]
    ),
    _vm._v(" "),
    _c(
      "div",
      {
        staticClass: "modal fade",
        attrs: { tabindex: "-1", role: "dialog", id: "update_task_model" }
      },
      [
        _c(
          "div",
          { staticClass: "modal-dialog", attrs: { role: "document" } },
          [
            _c("div", { staticClass: "modal-content" }, [
              _vm._m(3),
              _vm._v(" "),
              _c("div", { staticClass: "modal-body" }, [
                _vm.errors.length > 0
                  ? _c("div", { staticClass: "alert alert-danger" }, [
                      _c(
                        "ul",
                        _vm._l(_vm.errors, function(error) {
                          return _c("li", [_vm._v(_vm._s(error))])
                        }),
                        0
                      )
                    ])
                  : _vm._e(),
                _vm._v(" "),
                _c("div", { staticClass: "form-group" }, [
                  _c("label", [_vm._v("Vote:")]),
                  _vm._v(" "),
                  _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.update_vote.vote,
                        expression: "update_vote.vote"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { type: "text", placeholder: "Vote" },
                    domProps: { value: _vm.update_vote.vote },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(_vm.update_vote, "vote", $event.target.value)
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group" }, [
                  _c("label", { attrs: { for: "description" } }, [
                    _vm._v("Address:")
                  ]),
                  _vm._v(" "),
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.update_vote.address,
                        expression: "update_vote.address"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { cols: "30", rows: "5", placeholder: "Address" },
                    domProps: { value: _vm.update_vote.address },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.update_vote,
                          "address",
                          $event.target.value
                        )
                      }
                    }
                  })
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "form-group" }, [
                  _c("label", { attrs: { for: "description" } }, [
                    _vm._v("Signature:")
                  ]),
                  _vm._v(" "),
                  _c("textarea", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.update_vote.signature,
                        expression: "update_vote.signature"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { cols: "30", rows: "5", placeholder: "Signature" },
                    domProps: { value: _vm.update_vote.signature },
                    on: {
                      input: function($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.$set(
                          _vm.update_vote,
                          "signature",
                          $event.target.value
                        )
                      }
                    }
                  })
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "modal-footer" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-default",
                    attrs: { type: "button", "data-dismiss": "modal" }
                  },
                  [_vm._v("Close")]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary",
                    attrs: { type: "button" },
                    on: { click: _vm.updateTask }
                  },
                  [_vm._v("Submit")]
                )
              ])
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h3", [
      _c("span", { staticClass: "glyphicon glyphicon-dashboard" }),
      _vm._v(" Proposal Dashboard ")
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("tr", [
      _c("th", [
        _vm._v("\n                           No.\n                        ")
      ]),
      _vm._v(" "),
      _c("th", [
        _vm._v("\n                           Vote\n                        ")
      ]),
      _vm._v(" "),
      _c("th", [
        _vm._v("\n                           Address\n                        ")
      ]),
      _vm._v(" "),
      _c("th", [
        _vm._v(
          "\n                           Signature\n                        "
        )
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      ),
      _vm._v(" "),
      _c("h4", { staticClass: "modal-title" }, [_vm._v("Cast New Vote")])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "button",
        {
          staticClass: "close",
          attrs: {
            type: "button",
            "data-dismiss": "modal",
            "aria-label": "Close"
          }
        },
        [_c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")])]
      ),
      _vm._v(" "),
      _c("h4", { staticClass: "modal-title" }, [_vm._v("Update Vote")])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./resources/js/components/Vote.vue":
/*!******************************************!*\
  !*** ./resources/js/components/Vote.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Vote.vue?vue&type=template&id=40e744d5& */ "./resources/js/components/Vote.vue?vue&type=template&id=40e744d5&");
/* harmony import */ var _Vote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vote.vue?vue&type=script&lang=js& */ "./resources/js/components/Vote.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Vote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/Vote.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/components/Vote.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/components/Vote.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Vote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Vote.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vote.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Vote_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/Vote.vue?vue&type=template&id=40e744d5&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/Vote.vue?vue&type=template&id=40e744d5& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Vote.vue?vue&type=template&id=40e744d5& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/components/Vote.vue?vue&type=template&id=40e744d5&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Vote_vue_vue_type_template_id_40e744d5___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ 1:
/*!************************************************!*\
  !*** multi ./resources/js/components/Vote.vue ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /smoothmine/laravel/resources/js/components/Vote.vue */"./resources/js/components/Vote.vue");


/***/ })

/******/ });