import {Dropdown} from 'primereact/dropdown';

import {InputText} from 'primereact/inputtext';
import {ListBox} from 'primereact/listbox';
import {OrderList} from 'primereact/orderlist';

import { cloneDeep, isEqual, set, unset } from 'lodash';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Menubar } from 'primereact/menubar';
import { Message } from 'primereact/message';
import { Row } from 'primereact/row';
import { TreeTable } from 'primereact/treetable';
import PropTypes from 'prop-types';
import React from 'react';
import ClassMatcherCreateComponent from './newfiles/class_naming/ClassMatcherCreateComponent';
import ClassMatcherName from './newfiles/class_naming/ClassMatcherName';

// helper for a schema property type constants
const schemaType = {
  COMPOSITE: 'COMPOSITE',
  STRING: 'STRING',
  INTEGER: 'INTEGER',
  FLOAT: 'FLOAT',
  BOOLEAN: 'BOOLEAN',
  DURATION: 'DURATION',
  ENUM: 'ENUM',
};

const DEFAULT_EXPANDED_KEYS = { inspectit: true };

/**
 * Editor for showing the config file as the table tree.
 *
 * TODO what about duration
 * TODO what about enums (select box, but not used)
 * TODO what about the multiline strings
 */
class TreeTableEditor extends React.Component {

  constructor() {
    super();
    this.state = {
        icon_scopeName: false,
        icon_classSelector: false,
        icon_methodSelector: false,
        value: null,
        cars: null
    };

  }

  handleClick = () => {
    alert('oh noe')
  }
  

  render() {
    const citySelectItems = [
      {label: 'EQUALS_FULLY', value: 'EQUALS_FULLY'},
      {label: 'STARTS_WITH', value: 'STARTS_WITH'},
      {label: 'STARTS_WITH_IGNORE_CASE', value: 'STARTS_WITH_IGNORE_CASE'},
      {label: 'CONTAINS', value: 'CONTAINS'},
      {label: 'CONTAINS_IGNORE_CASE', value: 'CONTAINS_IGNORE_CASE'},
      {label: 'ENDS_WITH', value: 'ENDS_WITH'},
      {label: 'ENDS_WITH_IGNORE_CASE', value: 'ENDS_WITH_IGNORE_CASE'},
    ];

    // const background_bigDiv = "#ececee"; 
    // const background_uberSchriftDiv = "#fdfdfd";
    // const background_middleDiv  = "whitesmoke"
    // const background_extraField = "#fdfdfd";
    // const color_uberSchriftText = "#c06c84";
    // const color_elementSchrift = "darkslateblue";

    // const background_bigDiv = "ghostwhite";   
    // // const background_bigDiv = "#bccace";
    // const background_uberSchriftDiv = "#fa9581";
    // const background_middleDiv = "whitesmoke"; 
    // const background_extraField = "whitesmoke";
    // const color_uberSchriftText = "whitesmoke";
    // const color_elementSchrift = "slategrey";

    const background_bigDiv = "lightsteelblue";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "#fa9581";
    const background_middleDiv = "#8bacbd"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "whitesmoke";
    const color_elementSchrift = "whitesmoke";

    const classMatcherObject = {
      names: {
        0: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
        1: {matcherMode: 'STARTS_WITH', term: "prefix"},
        2: {matcherMode: 'ENDS_WITH', term: "suffix"},
      },
      interfaces: {
        0: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
        1: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
        2: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
      },
      annotations: {
        0: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
        1: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
        2: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
      },
      superclasses:{
        0: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
      }

    }

   

 

    return (
      <div className="this">
        <style jsx>{`
          .this {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-width: 760px;
          }
          .this :global(.p-menubar) {
            background-color: #f4f4f4;
          }
          .this :global(.p-menuitem-text) {
            font-size: smaller;
          }
          .this :global(.p-menuitem-icon) {
            font-size: smaller;
          }
          .errorBox {
            align-self: center;
            justify-content: center;
            flex: 1;
            display: flex;
            flex-direction: column;
            color: #bbb;
          }
          .this :global(.composite-row),
          .this :global(.composite-row) :global(.key-column) {
            color: grey;
            font-weight: normal;
          }
          .this :global(.key-column) {
            color: black;
            font-weight: bold;
          }
          .this :global(.value-column) {
            font-family: monospace;
          }
          .this :global(.edit-text) {
            align-self: center;
            align-items: center;
            margin-inline-end: 1em;
          }
          .this :global(.p-treetable .p-treetable-tbody > tr > td.p-cell-editing .p-button) {
            width: unset;
            min-width: 96px;
          }
        `}</style>
 
        <div style={{background:'', padding: '25px 25px 0 25px', height: '100%', width: '100%'}}>
          <div style={{ height: '100%', padding: '25px 25px 0 25px', width: '100%', borderRadius: '' , border: ''}}>

            {/* ######################################### primär slot ####### generic ########### myObject ######################################### */}

            <ClassMatcherCreateComponent/>
            <ClassMatcherName/>



          </div>
        </div>
           
      </div>
    );
  }
}

TreeTableEditor.propTypes = {
  /** The configuration object */
  config: PropTypes.object,
  /** The config file schema */
  schema: PropTypes.object,
  /** If there is loading in progress */
  loading: PropTypes.bool,
  /** If it's read only */
  readOnly: PropTypes.bool,
  /** Function to invoke for full config update */
  onUpdate: PropTypes.func,
};

TreeTableEditor.defaultProps = {
  loading: false,
};

export default TreeTableEditor;
