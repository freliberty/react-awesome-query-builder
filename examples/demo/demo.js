import React, {Component} from 'react';
import {Query, Builder, Preview, Utils} from 'react-awesome-query-builder';
const {queryBuilderFormat, queryString, mongodbFormat} = Utils;
import config from './config';
var stringify = require('json-stringify-safe');
import '../../css/reset.scss';
import '../../css/styles.scss';
//import '../../css/compact_styles.scss';
import '../../css/denormalize.scss';
const Immutable = require('immutable');
const transit = require('transit-immutable-js');
import { fromJS } from 'immutable';

// https://github.com/ukrbublik/react-awesome-query-builder/issues/69
var seriazlieAsImmutable = true;

var serializeTree, loadTree, initValue;
if (!seriazlieAsImmutable) {
    serializeTree = function(tree) {
        return JSON.stringify(tree.toJS());
    };
    loadTree = function(serTree) {
        let tree = JSON.parse(serTree);
        return fromJS(tree, function (key, value) {
          let outValue;
          if (key == 'value' && value.get(0) && value.get(0).toJS !== undefined)
            outValue = Immutable.List.of(value.get(0).toJS());
          else
            outValue = Immutable.Iterable.isIndexed(value) ? value.toList() : value.toOrderedMap();
          return outValue;
        });
    };
    initValue = '{"type":"group","id":"9a99988a-0123-4456-b89a-b1607f326fd8","children1":{"a98ab9b9-cdef-4012-b456-71607f326fd9":{"type":"rule","id":"a98ab9b9-cdef-4012-b456-71607f326fd9","properties":{"field":"members.subname","operator":"equal","value":["1"],"valueSrc":["value"],"operatorOptions":null,"valueType":["text"]},"path":["9a99988a-0123-4456-b89a-b1607f326fd8","a98ab9b9-cdef-4012-b456-71607f326fd9"]},"b9b8ab8a-0123-4456-b89a-b16d73248538":{"type":"rule","id":"b9b8ab8a-0123-4456-b89a-b16d73248538","properties":{"field":"members.numbbb","operator":"equal","value":["2"],"valueSrc":["value"],"operatorOptions":null,"valueType":["text"]},"path":["9a99988a-0123-4456-b89a-b1607f326fd8","b9b8ab8a-0123-4456-b89a-b16d73248538"]}},"properties":{"conjunction":"ANDSUBDOC","not":false},"path":["9a99988a-0123-4456-b89a-b1607f326fd8"]}'
} else {
    serializeTree = transit.toJSON;
    loadTree = transit.fromJSON;
    initValue = '["~#iM",["type","group","id","9a99988a-0123-4456-b89a-b1607f326fd8","children1",["~#iOM",["a98ab9b9-cdef-4012-b456-71607f326fd9",["^0",["type","rule","id","a98ab9b9-cdef-4012-b456-71607f326fd9","properties",["^0",["field","members.subname","operator","equal","value",["~#iL",["1"]],"valueSrc",["^2",["value"]],"operatorOptions",null,"valueType",["^2",["text"]]]],"path",["^2",["9a99988a-0123-4456-b89a-b1607f326fd8","a98ab9b9-cdef-4012-b456-71607f326fd9"]]]],"b9b8ab8a-0123-4456-b89a-b16d73248538",["^0",["type","rule","id","b9b8ab8a-0123-4456-b89a-b16d73248538","properties",["^0",["field","members.numbbb","operator","equal","value",["^2",["2"]],"valueSrc",["^2",["value"]],"operatorOptions",null,"valueType",["^2",["text"]]]],"path",["^2",["9a99988a-0123-4456-b89a-b1607f326fd8","b9b8ab8a-0123-4456-b89a-b16d73248538"]]]]]],"properties",["^0",["conjunction","ANDSUBDOC","not",false]],"path",["^2",["9a99988a-0123-4456-b89a-b1607f326fd8"]]]]'
}


/*
let ruleset = {
    "condition": "AND",
    "rules": [
        {
            "id": "name",
            "field": "name",
            "type": "string",
            "input": "text",
            "operator": "less",
            "value": "test name"
        },
        {
            "condition": "OR",
            "rules": [
                {
                    "id": "category",
                    "field": "date",
                    "type": "date",
                    "input": "date",
                    "operator": "equal",
                    "value": "2012-01-12"
                },
                {
                    "id": "category",
                    "field": "name",
                    "type": "string",
                    "input": "text",
                    "operator": "equal",
                    "value": "1"
                }
            ]
        }
    ]
}
*/


export default class DemoQueryBuilder extends Component {
    getChildren(props) {
        const jsonStyle = { backgroundColor: 'darkgrey', margin: '10px', padding: '10px' } 
        return (
            <div style={{padding: '10px'}}>
                <div className="query-builder">
                    <Builder {...props} />
                </div>
                <br />
                <div>
                  stringFormat: 
                  <pre style={jsonStyle}>
                    {stringify(queryString(props.tree, props.config), undefined, 2)}
                  </pre>
                </div>
                <hr/>
                <div>
                  humanStringFormat: 
                  <pre style={jsonStyle}>
                    {stringify(queryString(props.tree, props.config, true), undefined, 2)}
                  </pre>
                </div>
                <hr/>
                <div>
                  mongodbFormat: 
                    <pre style={jsonStyle}>
                      {stringify(mongodbFormat(props.tree, props.config), undefined, 2)}
                    </pre>
                </div>
                <hr/>
                <div>
                  queryBuilderFormat: 
                    <pre style={jsonStyle}>
                      {stringify(queryBuilderFormat(props.tree, props.config), undefined, 2)}
                    </pre>
                </div>
                <hr/>
                <div>
                  Tree: 
                  <pre style={jsonStyle}>
                    {stringify(props.tree, undefined, 2)}
                  </pre>
                </div>
                <hr/>
                <div>
                  Serialized Tree: 
                  <div style={jsonStyle}>
                    {serializeTree(props.tree)}
                  </div>
                </div>
            </div>
        )
    }

    render() {
        const {tree, ...config_props} = config;
                
        return (
            <div>
                <Query 
                    value={loadTree(initValue)}
                    {...config_props} 
                    get_children={this.getChildren}
                > </Query>
            </div>
        );
    }
}
