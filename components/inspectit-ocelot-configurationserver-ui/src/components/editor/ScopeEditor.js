import {ListBox} from 'primereact/listbox';

import { cloneDeep, isEqual, set, unset } from 'lodash';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { InputText } from 'primereact/inputtext';
import { Menubar } from 'primereact/menubar';
import { Message } from 'primereact/message';
import { Row } from 'primereact/row';
import { TreeTable } from 'primereact/treetable';
import PropTypes from 'prop-types';
import React from 'react';

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
class ScopeEditor extends React.Component {

  constructor() {
    super();
    this.state = {
        city: null,
        cities: null,
        car: 'BMW'
    };
  }
      
  componentDidMount(){
    let scopes = this.props.config.inspectit.instrumentation.scopes
    let scopeNameList = [];
    Object.keys(scopes).map(name => {
      scopeNameList.push({label: name})
    })
    console.log(scopeNameList)
    this.setState({scopeNameList})
  }

  

  render() {
    const { loading, config, ...rest } = this.props;
    const { scopeNameList } = this.state;

    console.log('tom', scopeNameList);

    const cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];



  const cars = [
      {label: 's_jdbc_statement_execute'},
      {label: 's_jdbc_preparedstatement_execute'},
      {label: 's_jdbc_statement_executeBatch'},
      {label: 's_jdbc_preparedstatement_executeBatch'},
      {label: 's_apacheclient_doExecute'},
      {label: 's_httpurlconnection_getOutputStream'},
      {label: 's_servletapi_servlet_service'},
      {label: 's_servletapi_filter_doFilter'},
      {label: 's_servletapi_servletresponse_getOutputStream'},
      {label: 's_servletapi_servletresponse_getWriter'},      
  ];

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
 
        <div style={{ marginLeft: '50px', marginTop: '25px'}} className="content-section implementation">
 
            <h4>The following scopes exist within the selected file</h4>
            <ListBox value={this.state.car} filter={true} filterPlaceholder="Search" options={scopeNameList} onChange={(e) => this.setState({car: e.value})} itemTemplate={this.carTemplate}
                            style={{width:'500px'}} listStyle={{}}/>
        </div>
           
      </div>
    );
  }
}

ScopeEditor.propTypes = {
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

ScopeEditor.defaultProps = {
  loading: false,
};

export default ScopeEditor;
