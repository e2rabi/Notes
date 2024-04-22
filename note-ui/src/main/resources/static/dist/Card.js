"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _BaseComponant2 = _interopRequireDefault(require("./BaseComponant.js"));
var _dec, _class, _templateObject;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function customElement(tag) {
  return function (target) {
    customElements.define(tag, Card);
  };
}
;
var Card = (_dec = customElement("app-card", Card), _dec(_class = /*#__PURE__*/function (_BaseComponant) {
  function Card() {
    _classCallCheck(this, Card);
    return _callSuper(this, Card);
  }
  _inherits(Card, _BaseComponant);
  return _createClass(Card, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      _get(_getPrototypeOf(Card.prototype), "css", this)(_templateObject || (_templateObject = _taggedTemplateLiteral(["Card.css"])));
      this.render();
    }
  }, {
    key: "propagateEvent",
    value: function propagateEvent(cardId, eventType) {
      if (app.notes.length > 0) {
        // dispatch event to render the card page
        document.dispatchEvent(new CustomEvent(eventType, {
          detail: {
            noteId: cardId
          }
        }));
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;
      var template = document.getElementById("card");
      template.innerHTML = " <div class=\"cards\">\n          <div key=\"".concat(this.getAttribute("id"), "\" class=\"card ").concat(this.getAttribute("color"), "\">\n              <p class=\"tip\" id=\"card-title\">").concat(this.getAttribute("title"), "\n                <i class=\"fa fa-heart ").concat(this.getAttribute("isFavorit") == "true" ? "card-favorit" : "", "\" aria-hidden=\"true\"></i>\n                <i class=\"fa fa-trash ").concat(this.getAttribute("isRemoved") == "true" ? "card-removed" : "card-active", "\" aria-hidden=\"true\"></i>\n                <i class=\"fa fa-thumb-tack ").concat(this.getAttribute("isPinned") == "true" ? "card-pinned" : "card-active", "\" aria-hidden=\"true\"></i>\n              </p>\n              <p class=\"second-text\">").concat(this.getAttribute("description"), "</p>\n              <div class=\"card-buttons\" id=\"cardEdit\">\n              <i action=\"reminder\"class=\"fa fa-bell-o card-buttons-icons\" aria-hidden=\"true\"></i>\n              <i action=\"edit\" class=\"fa fa-pencil-square-o card-buttons-icons\" aria-hidden=\"true\"></i>\n              <i action=\"addImage\" class=\"fa fa-picture-o card-buttons-icons\" aria-hidden=\"true\"></i>\n              <i action=\"archive\" class=\"fa fa-file-archive-o card-buttons-icons\" aria-hidden=\"true\"></i>\n              <i action=\"favorit\" class=\"fa ").concat(this.getAttribute("isFavorit") == "true" ? "fa-star" : "fa-star-o", "  card-buttons-icons\" aria-hidden=\"true\"></i>\n              <i action=\"trash\" class=\"fa ").concat(this.getAttribute("isRemoved") == "true" ? "fa-trash" : "fa-trash-o", "  card-buttons-icons\" aria-hidden=\"true\"></i>\n              <i action=\"pin\" class=\"fa fa-thumb-tack  card-buttons-icons\" aria-hidden=\"true\"></i>\n              </div>\n          </div>\n      </div>\n      ");
      var content = template.content.cloneNode(true);
      if (this.root.children.length <= 1) {
        content.getElementById('cardEdit').addEventListener('click', function (event) {
          if (event.target.tagName == 'I') {
            var action = event.target.getAttribute("action");
            switch (action.toUpperCase()) {
              case "TRASH":
                _this.propagateEvent(_this.getAttribute("id"), 'CARD_IS_REMOVED');
                break;
              case "PIN":
                _this.propagateEvent(_this.getAttribute("id"), 'CARD_IS_PINNED');
                break;
              case "FAVORIT":
                _this.propagateEvent(_this.getAttribute("id"), 'CARD_IS_FAVORIT');
                break;
            }
          }
        });
        this.root.appendChild(content);
      }
    }
  }]);
}(_BaseComponant2["default"])) || _class); //customElements.define("app-card",Card)
