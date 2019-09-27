'use strict';

exports.__esModule = true;

var _popover = require('antd/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

var _radio = require('antd/lib/radio');

var _radio2 = _interopRequireDefault(_radio);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('antd/lib/popover/style/css');

require('antd/lib/icon/style/css');

require('antd/lib/radio/style/css');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _range = require('lodash/range');

var _range2 = _interopRequireDefault(_range);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _configUtils = require('../../utils/configUtils');

var _stuff = require('../../utils/stuff');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadioButton = _radio2.default.Button;
var RadioGroup = _radio2.default.Group;

exports.default = function (Widget) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
        _inherits(WidgetContainer, _Component);

        function WidgetContainer(props) {
            _classCallCheck(this, WidgetContainer);

            var _this = _possibleConstructorReturn(this, (WidgetContainer.__proto__ || Object.getPrototypeOf(WidgetContainer)).call(this, props));

            _this._getSetValueHandler = function (isSpecialRange, delta, widgetType) {
                var k = '' + widgetType + '#' + (isSpecialRange ? 'r' : delta);
                var h = _this._setValueHandlers[k];
                if (!h) {
                    h = _this._setValue.bind(_this, isSpecialRange, delta, widgetType);
                    _this._setValueHandlers[k] = h;
                }
                return h;
            };

            _this._getSetValueSrcHandler = function (delta) {
                var k = '' + delta;
                var h = _this._setValueSrcHandlers[k];
                if (!h) {
                    h = _this._onChangeValueSrc.bind(_this, delta);
                    _this._setValueSrcHandlers[k] = h;
                }
                return h;
            };

            _this._setValue = function (isSpecialRange, delta, widgetType, value) {
                if (isSpecialRange && Array.isArray(value)) {
                    var oldRange = [_this.props.value.get(0), _this.props.value.get(1)];
                    if (oldRange[0] != value[0]) _this.props.setValue(0, value[0], widgetType);
                    if (oldRange[1] != value[1]) _this.props.setValue(1, value[1], widgetType);
                } else {
                    _this.props.setValue(delta, value, widgetType);
                }
            };

            _this._onChangeValueSrc = function (delta, e) {
                var srcKey = e.target.value;
                _this.props.setValueSrc(delta, srcKey);
            };

            _this.shouldComponentUpdate = _reactAddonsShallowCompare2.default;

            _this.renderWidget = function (isSpecialRange, delta, valueSrc, widget, operatorDefinition) {
                var fieldDefinition = (0, _configUtils.getFieldConfig)(_this.props.field, _this.props.config);
                var widgetDefinition = (0, _configUtils.getFieldWidgetConfig)(_this.props.config, _this.props.field, _this.props.operator, widget, valueSrc);
                var valueLabel = (0, _configUtils.getValueLabel)(_this.props.config, _this.props.field, _this.props.operator, delta, null, isSpecialRange);
                var valueLabels = null;
                var textSeparators = null;
                if (isSpecialRange) {
                    valueLabels = [(0, _configUtils.getValueLabel)(_this.props.config, _this.props.field, _this.props.operator, 0), (0, _configUtils.getValueLabel)(_this.props.config, _this.props.field, _this.props.operator, 1)];
                    valueLabels = {
                        placeholder: [valueLabels[0].placeholder, valueLabels[1].placeholder],
                        label: [valueLabels[0].label, valueLabels[1].label]
                    };
                    textSeparators = operatorDefinition.textSeparators;
                }

                var widgetFactory = widgetDefinition.factory,
                    fieldWidgetProps = _objectWithoutProperties(widgetDefinition, ['factory']);

                var widgetType = widgetDefinition.type;

                if (!widgetFactory) return '?';

                var value = isSpecialRange ? [_this.props.value.get(0), _this.props.value.get(1)] : _this.props.value.get(delta);
                if (isSpecialRange && value[0] === undefined && value[1] === undefined) value = undefined;
                var widgetProps = Object.assign({}, fieldWidgetProps, {
                    config: _this.props.config,
                    field: _this.props.field,
                    operator: _this.props.operator,
                    delta: delta,
                    isSpecialRange: isSpecialRange,
                    value: value,
                    label: valueLabel.label,
                    placeholder: valueLabel.placeholder,
                    placeholders: valueLabels ? valueLabels.placeholder : null,
                    textSeparators: textSeparators,
                    setValue: _this._getSetValueHandler(isSpecialRange, delta, widgetType)
                });

                if (widget == 'field') {
                    //
                }

                return widgetFactory(widgetProps);
            };

            _this.renderValueSorces = function (delta, valueSources, valueSrc) {
                var fieldDefinition = (0, _configUtils.getFieldConfig)(_this.props.field, _this.props.config);
                var valueSourcesInfo = _this.props.config.settings.valueSourcesInfo;
                var valueSourcesPopupTitle = _this.props.config.settings.valueSourcesPopupTitle;
                //let valueSources = fieldDefinition.valueSources;
                //let valueSources = getValueSourcesForFieldOp(this.props.config, this.props.field, this.props.operator);

                if (!valueSources || Object.keys(valueSources).length == 1) return null;

                var content = _react2.default.createElement(
                    RadioGroup,
                    {
                        key: 'valuesrc-' + delta,
                        value: valueSrc || "value",
                        size: _this.props.config.settings.renderSize || "small",
                        onChange: _this._getSetValueSrcHandler(delta)
                    },
                    valueSources.map(function (srcKey) {
                        return _react2.default.createElement(
                            RadioButton,
                            {
                                key: srcKey,
                                value: srcKey
                                //checked={item.checked}
                            },
                            valueSourcesInfo[srcKey].label
                        );
                    })
                );

                return _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        _popover2.default,
                        { content: content, title: valueSourcesPopupTitle },
                        _react2.default.createElement(_icon2.default, { type: 'ellipsis' })
                    )
                );
            };

            _this._setValueHandlers = {};
            _this._setValueSrcHandlers = {};
            return _this;
        }

        _createClass(WidgetContainer, [{
            key: 'render',
            value: function render() {
                var _this2 = this;

                var settings = this.props.config.settings;
                var defaultWidget = (0, _configUtils.getWidgetForFieldOp)(this.props.config, this.props.field, this.props.operator);
                var widgets = (0, _configUtils.getWidgetsForFieldOp)(this.props.config, this.props.field, this.props.operator);
                var fieldDefinition = (0, _configUtils.getFieldConfig)(this.props.field, this.props.config);
                var operatorDefinition = (0, _configUtils.getOperatorConfig)(this.props.config, this.props.operator, this.props.field);
                if (typeof fieldDefinition === 'undefined' || typeof operatorDefinition === 'undefined') {
                    return null;
                }
                var isSpecialRange = operatorDefinition.isSpecialRange;
                var isSpecialRangeForSrcField = isSpecialRange && (this.props.valueSrc.get(0) == 'field' || this.props.valueSrc.get(1) == 'field');
                var isTrueSpecialRange = isSpecialRange && !isSpecialRangeForSrcField;
                var cardinality = isTrueSpecialRange ? 1 : (0, _stuff.defaultValue)(operatorDefinition.cardinality, 1);
                if (cardinality === 0) {
                    return null;
                }

                return _react2.default.createElement(
                    Widget,
                    { name: defaultWidget, config: this.props.config },
                    (0, _range2.default)(0, cardinality).map(function (delta) {
                        var valueSources = (0, _configUtils.getValueSourcesForFieldOp)(_this2.props.config, _this2.props.field, _this2.props.operator);
                        var valueSrc = _this2.props.valueSrc.get(delta) || null;
                        //if (!valueSrc && valueSources.length == 1) {
                        //    this.props.setValueSrc(delta, valueSources[0]);
                        //}
                        var widget = (0, _configUtils.getWidgetForFieldOp)(_this2.props.config, _this2.props.field, _this2.props.operator, valueSrc);
                        var widgetDefinition = (0, _configUtils.getFieldWidgetConfig)(_this2.props.config, _this2.props.field, _this2.props.operator, widget, valueSrc);
                        if (isSpecialRangeForSrcField) {
                            widget = widgetDefinition.singleWidget;
                            widgetDefinition = (0, _configUtils.getFieldWidgetConfig)(_this2.props.config, _this2.props.field, _this2.props.operator, widget, valueSrc);
                        }
                        var valueLabel = (0, _configUtils.getValueLabel)(_this2.props.config, _this2.props.field, _this2.props.operator, delta, valueSrc, isTrueSpecialRange);
                        var parts = [];
                        if (operatorDefinition.textSeparators) {
                            var sep = operatorDefinition.textSeparators[delta];
                            if (sep) {
                                parts.push(_react2.default.createElement(
                                    'div',
                                    { key: "widget-separators-" + delta, className: 'widget--sep' },
                                    settings.showLabels ? _react2.default.createElement(
                                        'label',
                                        null,
                                        '\xA0'
                                    ) : null,
                                    _react2.default.createElement(
                                        'span',
                                        null,
                                        sep
                                    )
                                ));
                            }
                        }

                        if (valueSources.length > 1) parts.push(_react2.default.createElement(
                            'div',
                            { key: "valuesrc-" + _this2.props.field + "-" + delta, className: 'widget--valuesrc' },
                            settings.showLabels ? _react2.default.createElement(
                                'label',
                                null,
                                '\xA0'
                            ) : null,
                            _this2.renderValueSorces(delta, valueSources, valueSrc)
                        ));

                        parts.push(_react2.default.createElement(
                            'div',
                            { key: "widget-" + _this2.props.field + "-" + delta, className: 'widget--widget' },
                            settings.showLabels ? _react2.default.createElement(
                                'label',
                                null,
                                valueLabel.label
                            ) : null,
                            _this2.renderWidget(isTrueSpecialRange, delta, valueSrc, widget, operatorDefinition)
                        ));

                        return parts;
                    })
                );
            }
        }]);

        return WidgetContainer;
    }(_react.Component), _class.propTypes = {
        config: _propTypes2.default.object.isRequired,
        value: _propTypes2.default.any.isRequired, //instanceOf(Immutable.List)
        valueSrc: _propTypes2.default.any.isRequired, //instanceOf(Immutable.List)
        field: _propTypes2.default.string.isRequired,
        operator: _propTypes2.default.string.isRequired,
        //actions
        setValue: _propTypes2.default.func,
        setValueSrc: _propTypes2.default.func
    }, _temp;
};