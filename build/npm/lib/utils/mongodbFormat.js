'use strict';

exports.__esModule = true;
exports.mongodbFormat = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _uuid = require('./uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _stuff = require('./stuff');

var _configUtils = require('./configUtils');

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _pick = require('lodash/pick');

var _pick2 = _interopRequireDefault(_pick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongodbFormat = exports.mongodbFormat = function mongodbFormat(item, config) {
    var _not = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var type = item.get('type');
    var properties = item.get('properties');
    var children = item.get('children1');
    var id = item.get('id');

    if (type === 'group' && children && children.size) {
        var resultQuery = {};
        var conjunction = properties.get('conjunction');
        var conjunctionDefinition = config.conjunctions[conjunction];
        var not = _not ? !properties.get('not') : properties.get('not');
        if (not) {
            conjunction = conjunctionDefinition.reversedConj;
            conjunctionDefinition = config.conjunctions[conjunction];
        }
        var mongoConj = conjunctionDefinition.mongoConj;

        var list = children.map(function (currentChild) {
            return mongodbFormat(currentChild, config, not);
        }).filter(function (currentChild) {
            return typeof currentChild !== 'undefined';
        });
        if (!list.size) return undefined;

        if (list.size == 1) {
            resultQuery = list.first();
        } else {
            resultQuery[mongoConj] = list.toList();
        }

        if (typeof conjunctionDefinition.mongoConjFormat !== 'undefined') {
            return conjunctionDefinition.mongoConjFormat(resultQuery);
        }
        return resultQuery;
    } else if (type === 'rule') {
        var operator = properties.get('operator');
        var options = properties.get('operatorOptions');
        var field = properties.get('field');
        var value = properties.get('value');
        var valueSrc = properties.get('valueSrc');
        var valueType = properties.get('valueType');

        if (field == null || operator == null) return undefined;

        var fieldDefinition = (0, _configUtils.getFieldConfig)(field, config) || {};
        var operatorDefinition = (0, _configUtils.getOperatorConfig)(config, operator, field) || {};
        var reversedOp = operatorDefinition.reversedOp;
        var revOperatorDefinition = (0, _configUtils.getOperatorConfig)(config, reversedOp, field) || {};
        var fieldType = fieldDefinition.type;
        var cardinality = (0, _stuff.defaultValue)(operatorDefinition.cardinality, 1);
        var widget = (0, _configUtils.getWidgetForFieldOp)(config, field, operator);
        var _fieldWidgetDefinition = (0, _omit2.default)((0, _configUtils.getFieldWidgetConfig)(config, field, operator, widget), ['factory']);
        var typeConfig = config.types[fieldDefinition.type] || {};
        // let operatorOptions = options ? options.toJS() : null;
        // if (operatorOptions && !Object.keys(operatorOptions).length)
        //     operatorOptions = null;

        if (_not) {
            var _ref = [reversedOp, operator];
            operator = _ref[0];
            reversedOp = _ref[1];
            var _ref2 = [revOperatorDefinition, operatorDefinition];
            operatorDefinition = _ref2[0];
            revOperatorDefinition = _ref2[1];
        }

        //format field
        if (fieldDefinition.tableName) {
            var regex = new RegExp(field.split(config.settings.fieldSeparator)[0]);
            field = field.replace(regex, fieldDefinition.tableName);
        }

        //format value
        //let valueTypes = [];
        var hasUndefinedValues = false;
        value = value.map(function (currentValue, ind) {
            if (currentValue === undefined) {
                hasUndefinedValues = true;
                return undefined;
            }
            var valueSrc = properties.get('valueSrc') ? properties.get('valueSrc').get(ind) : null;
            var valueType = properties.get('valueType') ? properties.get('valueType').get(ind) : null;
            var widget = (0, _configUtils.getWidgetForFieldOp)(config, field, operator, valueSrc);
            var fieldWidgetDefinition = (0, _omit2.default)((0, _configUtils.getFieldWidgetConfig)(config, field, operator, widget, valueSrc), ['factory']);
            if (valueSrc == 'field') {
                console.error("Field as right-hand operand is not supported for mongodb export");
                return undefined;
            } else {
                if (typeof fieldWidgetDefinition.mongoFormatValue === 'function') {
                    var _fn = fieldWidgetDefinition.mongoFormatValue;
                    var _args = [currentValue, (0, _pick2.default)(fieldDefinition, ['fieldSettings', 'listValues']), (0, _omit2.default)(fieldWidgetDefinition, ['formatValue', 'mongoFormatValue'])];
                    return _fn.apply(undefined, _args);
                }
                return currentValue;
            }
            //valueTypes.push(valueType);
        });
        if (value.size < cardinality || hasUndefinedValues) return undefined;
        var formattedValue = cardinality > 1 ? value.toArray() : cardinality == 1 ? value.first() : null;

        //build rule
        var fn = operatorDefinition.mongoFormatOp;
        var args = [field, operator, formattedValue];
        var ruleQuery = fn.apply(undefined, args);

        return ruleQuery;
    }
    return undefined;
};