'use strict';

exports.__esModule = true;
exports.default = undefined;

var _slider = require('antd/lib/slider');

var _slider2 = _interopRequireDefault(_slider);

var _col = require('antd/lib/col');

var _col2 = _interopRequireDefault(_col);

var _inputNumber = require('antd/lib/input-number');

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp2;

require('antd/lib/slider/style/css');

require('antd/lib/col/style/css');

require('antd/lib/input-number/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

require('antd/lib/date-picker/style');

var _configUtils = require('../../utils/configUtils');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SliderWidget = (_temp2 = _class = function (_Component) {
  _inherits(SliderWidget, _Component);

  function SliderWidget() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SliderWidget);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SliderWidget.__proto__ || Object.getPrototypeOf(SliderWidget)).call.apply(_ref, [this].concat(args))), _this), _this.state = {}, _this.shouldComponentUpdate = _reactAddonsShallowCompare2.default, _this.handleChange = function (val) {
      if (val === '') val = undefined;
      _this.props.setValue(val);
    }, _this.defaultProps = {
      min: 0,
      max: 100,
      step: 10
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SliderWidget, [{
    key: 'render',
    value: function render() {
      var fieldDefinition = (0, _configUtils.getFieldConfig)(this.props.field, this.props.config);
      var fieldSettings = fieldDefinition.fieldSettings || {};
      var customProps = this.props.customProps || {};

      var value = this.props.value != undefined ? this.props.value : null;
      var min = fieldSettings.min === null ? this.defaultProps.min : fieldSettings.min;
      var max = fieldSettings.max === null ? this.defaultProps.max : fieldSettings.max;
      var step = fieldSettings.step === undefined ? this.defaultProps.step : fieldSettings.step;
      var marks = fieldSettings.marks === undefined ? this.defaultProps.marks : fieldSettings.marks;

      return _react2.default.createElement(
        _col2.default,
        { style: { display: 'inline-flex' } },
        _react2.default.createElement(
          _col2.default,
          { style: { float: 'left', marginRight: '5px' } },
          _react2.default.createElement(_inputNumber2.default, _extends({
            size: this.props.config.settings.renderSize || "small",
            ref: 'num',
            value: value,
            min: min,
            max: max,
            step: step,
            placeholder: this.props.placeholder,
            onChange: this.handleChange
          }, customProps))
        ),
        _react2.default.createElement(
          _col2.default,
          { style: { float: 'left', width: customProps.width || '300px' } },
          _react2.default.createElement(_slider2.default, _extends({
            ref: 'slider',
            value: value,
            tipFormatter: function tipFormatter(val) {
              return val != undefined ? val.toString() : undefined;
            },
            min: min,
            max: max,
            included: false,
            step: step,
            marks: marks,
            onChange: this.handleChange
          }, customProps))
        ),
        _react2.default.createElement(_col2.default, { style: { clear: 'both' } })
      );
    }
  }]);

  return SliderWidget;
}(_react.Component), _class.propTypes = {
  setValue: _propTypes2.default.func.isRequired,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  step: _propTypes2.default.number,
  placeholder: _propTypes2.default.string,
  config: _propTypes2.default.object.isRequired,
  field: _propTypes2.default.string.isRequired,
  value: _propTypes2.default.number,
  customProps: _propTypes2.default.object
}, _temp2);
exports.default = SliderWidget;