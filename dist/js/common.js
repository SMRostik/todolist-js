"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

(function () {
  window.onload = function () {
    var ToolPanelElement =
    /*#__PURE__*/
    function () {
      function ToolPanelElement(context, id, options) {
        _classCallCheck(this, ToolPanelElement);

        this.sel = document.querySelector(id);
        this.options = options;
        this.current_option = this._getFirstOptionKey();
        this.context = context;
        this.display();
      }

      _createClass(ToolPanelElement, [{
        key: "_addEventBtn",
        value: function _addEventBtn() {
          this.sel.querySelector(".select__body").classList.toggle("select__body_active");
        }
      }, {
        key: "_addEventBody",
        value: function _addEventBody(e) {
          this.sel.querySelector(".select__btn").setAttribute("data-value", e.target.getAttribute('data-value'));
          this.sel.querySelector(".select__btn").innerHTML = e.target.textContent || e.target.innerText;
          this.sel.querySelector(".select__body").classList.toggle("select__body_active"); //this._filter(e.target.getAttribute('data-value'));

          this.current_option = e.target.getAttribute('data-value');

          this._selectElem();
        }
      }, {
        key: "_filter",
        value: function _filter(value) {}
      }, {
        key: "_selectElem",
        value: function _selectElem() {
          this.context.showPosts();
        }
      }, {
        key: "_getFirstOptionKey",
        value: function _getFirstOptionKey() {
          for (var i in this.options) {
            return i;
          }
        }
      }, {
        key: "getNameOption",
        value: function getNameOption(id) {
          return this.options[id];
        }
      }, {
        key: "display",
        value: function display() {
          this.sel.innerHTML = "<button data-value=\"".concat(this._getFirstOptionKey(), "\" class=\"select__btn\">").concat(this.getNameOption(this._getFirstOptionKey()), "</button>");
          var body = "<ul class=\"select__body modal__sel-body\">";

          for (var key in this.options) {
            body += "\n\t\t\t\t\t<li data-value=\"".concat(key, "\" class=\"select__item\">").concat(this.options[key], "</li>");
          }

          body += "</ul>";
          this.sel.innerHTML += body;
          this._addEventBtn = this._addEventBtn.bind(this);
          this._addEventBody = this._addEventBody.bind(this);
          this.sel.querySelector(".select__btn").addEventListener("click", this._addEventBtn);
          this.sel.querySelector(".select__body").addEventListener("click", this._addEventBody);
        }
      }]);

      return ToolPanelElement;
    }(); // class ToolPanelElementWork extends ToolPanelElement{
    // 	constructor(id, controller){
    // 		super(id);
    // 		this.contrl = controller;
    // 	}
    // 	_filter(value){
    // 	}
    // }


    var ToolSearch =
    /*#__PURE__*/
    function () {
      function ToolSearch(context, id) {
        _classCallCheck(this, ToolSearch);

        this.sel = document.querySelector(id);
        this.context = context;
        this.searchText = "";
        this._addEventSearch = this._addEventSearch.bind(this);
        this.sel.addEventListener("keyup", this._addEventSearch);
      }

      _createClass(ToolSearch, [{
        key: "_addEventSearch",
        value: function _addEventSearch() {
          this.updateValue();
          this.context.showPosts();
        }
      }, {
        key: "updateValue",
        value: function updateValue() {
          this.searchText = this.sel.value;
        }
      }, {
        key: "search",
        value: function search(data) {
          var arr = [];

          for (var key in data) {
            if (data[key]["title"].toLowerCase().indexOf(this.searchText.toLowerCase()) != -1) {
              arr.push(key);
            }
          }

          return arr;
        }
      }]);

      return ToolSearch;
    }();

    var ToolModal =
    /*#__PURE__*/
    function () {
      function ToolModal(context, id) {
        _classCallCheck(this, ToolModal);

        this.context = context;
        this.sel = document.querySelector(id);
      }

      _createClass(ToolModal, [{
        key: "enable",
        value: function enable() {
          this.sel.classList.remove("modal_display");
          this.sel.querySelector(".js-save-btn").addEventListener("click", this.post);
        }
      }, {
        key: "disable",
        value: function disable() {
          this.sel.classList.add("modal_display");
          this.sel.querySelector(".js-save-btn").removeEventListener("click", this.post);
          this.sel.querySelector(".title").value = "";
          this.sel.querySelector(".description").value = "";
        }
      }]);

      return ToolModal;
    }();

    var ToolModalChange =
    /*#__PURE__*/
    function (_ToolModal) {
      _inherits(ToolModalChange, _ToolModal);

      function ToolModalChange(context, id) {
        var _this;

        _classCallCheck(this, ToolModalChange);

        _this = _possibleConstructorReturn(this, _getPrototypeOf(ToolModalChange).call(this, context, id));
        _this.post = _this.post.bind(_assertThisInitialized(_this));
        _this.disable = _this.disable.bind(_assertThisInitialized(_this));

        _this.sel.querySelector(".js-cancel-btn").addEventListener("click", _this.disable);

        _this.enable = _this.enable.bind(_assertThisInitialized(_this));
        return _this;
      }

      _createClass(ToolModalChange, [{
        key: "enable",
        value: function enable(data) {
          this.sel.classList.remove("modal_display");
          this.sel.querySelector(".js-save-btn").addEventListener("click", this.post);
          this.sel.querySelector(".title").value = data['title'];
          this.sel.querySelector(".description").value = data['description'];
        }
      }, {
        key: "post",
        value: function post() {
          var data = {
            'title': this.sel.querySelector(".title").value,
            'description': this.sel.querySelector(".description").value,
            'priority': this.sel.querySelector(".select__btn").getAttribute("data-value"),
            'done_status': 1
          };
          this.context.changePostById(this.postId, data);
          this.disable();
          this.context.showPosts();
        }
      }, {
        key: "setPostId",
        value: function setPostId(id) {
          this.postId = id;
        }
      }]);

      return ToolModalChange;
    }(ToolModal);

    var ToolModalCreate =
    /*#__PURE__*/
    function (_ToolModal2) {
      _inherits(ToolModalCreate, _ToolModal2);

      function ToolModalCreate(context, id, button) {
        var _this2;

        _classCallCheck(this, ToolModalCreate);

        _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ToolModalCreate).call(this, context, id));
        _this2.post = _this2.post.bind(_assertThisInitialized(_this2));
        _this2.disable = _this2.disable.bind(_assertThisInitialized(_this2));

        _this2.sel.querySelector(".js-cancel-btn").addEventListener("click", _this2.disable);

        _this2.enable = _this2.enable.bind(_assertThisInitialized(_this2));
        _this2.button = document.querySelector(button);

        _this2.button.addEventListener("click", _this2.enable);

        return _this2;
      }

      _createClass(ToolModalCreate, [{
        key: "post",
        value: function post() {
          var data = {
            'title': this.sel.querySelector(".title").value,
            'description': this.sel.querySelector(".description").value,
            'priority': this.sel.querySelector(".select__btn").getAttribute("data-value"),
            'done_status': 1
          };
          this.context.addPost(data);
          this.disable();
          this.context.showPosts();
        }
      }]);

      return ToolModalCreate;
    }(ToolModal);

    var ModelPost =
    /*#__PURE__*/
    function () {
      function ModelPost(key) {
        _classCallCheck(this, ModelPost);

        this.key = key; //localStorage.removeItem(key);
      }

      _createClass(ModelPost, [{
        key: "getPosts",
        value: function getPosts() {
          if (localStorage.getItem(this.key) == null) return [];
          var data = JSON.parse(localStorage.getItem(this.key));

          for (var key in data) {
            data[key]["priority_text"] = this.getPriorityName(data[key]["priority"]);
          }

          return data; //return localStorage.getItem(this.key) != null? JSON.parse(localStorage.getItem(this.key)): [];
        }
      }, {
        key: "getPostById",
        value: function getPostById(id) {
          var data = this.getPosts();
          return data[id];
        }
      }, {
        key: "delPost",
        value: function delPost(idPost) {
          var posts = this.getPosts();
          posts.splice(idPost, 1);
          localStorage.setItem(this.key, JSON.stringify(posts));
        }
      }, {
        key: "changeWorkStatus",
        value: function changeWorkStatus(idPost, value) {
          var posts = this.getPosts();
          posts[idPost]["done_status"] = value;
          localStorage.setItem(this.key, JSON.stringify(posts));
        }
      }, {
        key: "addPost",
        value: function addPost(data) {
          var posts = this.getPosts();
          posts.push(data); //localStorage.removeItem(this.key);

          console.log("addPost");
          localStorage.setItem(this.key, JSON.stringify(posts));
        }
      }, {
        key: "getPriorityName",
        value: function getPriorityName(id) {
          switch (+id) {
            case 1:
              return "Higt";

            case 2:
              return "Normal";

            case 3:
              return "Low";

            default:
              return "";
          }
        }
      }, {
        key: "changePostById",
        value: function changePostById(id, data) {
          var posts = this.getPosts();
          posts[id] = {
            'title': data['title'],
            'description': data['description'],
            'priority': data['priority'],
            'done_status': 1
          };
          localStorage.setItem(this.key, JSON.stringify(posts));
        }
      }]);

      return ModelPost;
    }();

    var ViewPost =
    /*#__PURE__*/
    function () {
      function ViewPost() {
        _classCallCheck(this, ViewPost);
      }

      _createClass(ViewPost, [{
        key: "showPosts",
        value: function showPosts(content, data) {
          content.innerHTML = "";
          var done_status;

          for (var key in data) {
            done_status = data[key]['done_status'] == 2 ? " content__item_done" : "";
            content.innerHTML += "\n\t\t\t\t\t<div class=\"content__item".concat(done_status, "\">\n\t\t\t\t\t\t<div class=\"content__title\">").concat(data[key]['title'], "</div>\n\t\t\t\t\t\t<div class=\"content__description\">").concat(data[key]['description'], "</div>\n\t\t\t\t\t\t<div class=\"down-panel content__down-panel\">\n\t\t\t\t\t\t\t<div class=\"down-panel__left\">\n\t\t\t\t\t\t\t\t<div class=\"down-panel__priorot\">").concat(data[key]['priority_text'], "</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class=\"down-panel__right\">\n\t\t\t\t\t\t\t\t<div class=\"action down-panel__action\">\n\t\t\t\t\t\t\t\t\t<button class=\"action__btn\">...</button>\n\t\t\t\t\t\t\t\t\t<ul data-post-id=\"").concat(key, "\" class=\"action__body\">\n\t\t\t\t\t\t\t\t\t\t<li class=\"action__item action__done\">Done</li>\n\t\t\t\t\t\t\t\t\t\t<li class=\"action__item action__edit\">Edit</li>\n\t\t\t\t\t\t\t\t\t\t<li class=\"action__item action__delete\">Delete</li>\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>");
          }
        }
      }, {
        key: "showPost",
        value: function showPost(content, data) {
          content.innerHTML += "\n\t\t\t\t<div class=\"content__item\">\n\t\t\t\t\t<div class=\"content__title\">".concat(data['title'], "</div>\n\t\t\t\t\t<div class=\"content__description\">").concat(data['description'], "</div>\n\t\t\t\t</div>");
        }
      }]);

      return ViewPost;
    }();

    var ControllerPost =
    /*#__PURE__*/
    function () {
      function ControllerPost(model, view) {
        _classCallCheck(this, ControllerPost);

        this.model = model;
        this.view = view;
        this.content = document.querySelector(".content");
        this.modal_select = new ToolPanelElement(this, "#modal_select", {
          1: "High",
          2: "Normal",
          3: "Low"
        });
        this.status_work = new ToolPanelElement(this, "#status_work", {
          0: "All",
          1: "Open",
          2: "Done"
        });
        this.status_priority = new ToolPanelElement(this, "#status_priority", {
          0: "All",
          1: "High",
          2: "Normal",
          3: "Low"
        });
        this.search = new ToolSearch(this, "#search");
        this.toolModal = new ToolModalCreate(this, "#modal", ".js-create-btn");
        this.toolModalChange = new ToolModalChange(this, "#modal");
      }

      _createClass(ControllerPost, [{
        key: "addPost",
        value: function addPost(data) {
          this.model.addPost(data);
        }
      }, {
        key: "showPosts",
        value: function showPosts() {
          var data = this.model.getPosts();
          var newData = [];

          for (var key in data) {
            if ((this.status_work.current_option == 0 || data[key]["done_status"] == this.status_work.current_option) && (this.status_priority.current_option == 0 || data[key]["priority"] == this.status_priority.current_option) && this.search.search(data).indexOf(key) != -1) {
              newData[key] = data[key];
            }
          }

          this.view.showPosts(this.content, newData);
        }
      }, {
        key: "updateSearsh",
        value: function updateSearsh() {
          this.search.updateValue();
        }
      }, {
        key: "delPost",
        value: function delPost(idPost) {
          this.model.delPost(idPost);
          this.showPosts();
        }
      }, {
        key: "changeWorkStatus",
        value: function changeWorkStatus(idPost, value) {
          this.model.changeWorkStatus(idPost, value);
          this.showPosts();
        }
      }, {
        key: "changePost",
        value: function changePost(id) {
          this.toolModalChange.setPostId(id);
          this.toolModalChange.enable(this.model.getPostById(id));
        }
      }, {
        key: "changePostById",
        value: function changePostById(id, data) {
          this.model.changePostById(id, data);
        }
      }]);

      return ControllerPost;
    }();

    var contrPost = new ControllerPost(new ModelPost("posts"), new ViewPost());
    contrPost.showPosts();
    document.addEventListener("click", function (e) {
      var id = e.target.parentNode.getAttribute("data-post-id");

      if (e.target.classList.contains('action__done')) {
        contrPost.changeWorkStatus(id, 2);
      } else if (e.target.classList.contains('action__edit')) {
        contrPost.changePost(e.target.parentNode.getAttribute("data-post-id"));
      } else if (e.target.classList.contains('action__delete')) {
        contrPost.delPost(id);
      } else if (e.target.classList.contains('action__btn')) {
        e.target.parentNode.querySelector('.action__body').classList.toggle("action__body_active"); //.classList.add("action__body_active");
      }
    });
  };
})();