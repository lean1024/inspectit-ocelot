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
import Scope from './scopeUI/ScopeContainer';
import { BreadCrumb } from 'primereact/breadcrumb';

import deepCopy from 'json-deep-copy'


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
        car: 'BMW',
        showOverview: true,
        breadCrumbItems: [
          { label: 'Scope Overview' },
        ],
        scopeObject: { inspectit:  {instrumentation: {scopes: {}}}}
    };
  }

  displayOverview = () => this.setState({ showOverview: true})
      
  setScopeNamesFromConfig = () => {
    if( this.props.config.inspectit &&  this.props.config.inspectit.instrumentation && this.props.config.inspectit.instrumentation.scopes) {
      let scopes = this.props.config.inspectit.instrumentation.scopes;
      let scopeNameList = [];
      Object.keys(scopes).map(name => {
        scopeNameList.push({label: name})
      })
      this.setState({scopeNameList})
    }
  }

  handleBreadCrumbClick = () => {
    this.setState({ breadCrumbItems: [{ label: 'Scope Overview' }]});
    console.log('##################################')
    this.displayOverview();
  }

  // <BreadCrumb> does not enable onClick listener on the elements, this manually adding.
  addEventListenerToBreadCrumbs = () => {
    // Array.from(htmlCollection)
    let breadCrumbArray = Array.from(document.getElementsByClassName('p-breadcrumb p-component')[0].getElementsByClassName('p-menuitem-link'));
    console.log(breadCrumbArray);
    breadCrumbArray.map(element => {
      if( element.innerText === 'Scope Overview' ) {
        element.addEventListener('click', this.handleBreadCrumbClick);
      }
    })

  }

  componentDidMount(){
    // if is necessary, since config object is empty. The component does always "exist" since we only hide it with display: 'none
    // display none is because #info1
    this.addEventListenerToBreadCrumbs();

  }

  componentWillReceiveProps(){
    // I had it placed inside componentDidMount. But sometimes the yml|value|config would be empty on mount ...?
    this.setScopeNamesFromConfig();
  }


  handleOnEdit = (e) => {
    this.setState({ showOverview: false})
  }

  handleDoubleClick = (e) => {
    const name = e.target.dataset.name;
    const { config } = this.props;

    // getting the correct single scopeObject to pass as props
    let scopeObject = config.inspectit.instrumentation.scopes[name];
    scopeObject['scopeName'] = name;
    // scopeObject = this.createArrayInScopeObject(scopeObject);

    const breadCrumbItems = [{'label': 'Scope Overview'}, {'label': name }];
    this.setState({ scopeObject, showOverview: false, breadCrumbItems})
  }

  // type and superclass are not nested inside an array. Each option should look same in the json. This can then be used in a single component
  // createArrayInScopeObject = (scopeObject) => {
  //   if ( scopeObject.type ) {
  //     let type = deepCopy(scopeObject.type);
  //     scopeObject.type = [type];
  //   }
  //   if ( scopeObject.superclass ) {
  //     let superclass = deepCopy(scopeObject.superclass);
  //     scopeObject.superclass = [superclass];
  //   }
  //   return scopeObject;
  // }

  // // type and superclass are not nested inside an array in the original schema. Removing the array to match original schema.
  // removeArrayInScopeObject = (scopeObject) => {
  //   if ( Array.isArray(scopeObject.type) ) {
  //     let type = deepCopy(scopeObject.type[0]);
  //     scopeObject.type = type;
  //   }
  //   if ( Array.isArray(scopeObject.superclass) ) {
  //     let superclass = deepCopy(scopeObject.superclass[0]);
  //     scopeObject.superclass = superclass;
  //   }
  //   return scopeObject;
  // }

  updateBreadCrumbs = breadCrumbItems => this.setState({ breadCrumbItems});
  
  carTemplate = (option) => {
    return (
        <div >
          <p data-name={option.label} onDoubleClick={this.handleDoubleClick}> {option.label} </p>
        </div>
    );
  }

  updateScopeObject = ( scopeObject) => {
    // updating the scopeObject in state
    // this variable is being passed down, and must be updated
    // this variable is only setted in the doubleClick elsewise.
    console.log('vorher',scopeObject)
  
    let copy = deepCopy(scopeObject)
    this.setState({ scopeObject: copy})

    
    let { onUpdate, config } = this.props;
    // scopeObject = this.removeArrayInScopeObject(scopeObject);
    
    let scopeName = scopeObject.scopeName;
    // the cloned scopeObject got the scopeName to reference, which scope it to be updated and still haves it. 
    // the updated value should not contain the scopeName thus we remove it.
    if (scopeObject.scopeName ) delete scopeObject['scopeName'];
    config.inspectit.instrumentation.scopes[scopeName] = scopeObject;
    onUpdate(config);
    console.log('nacher',scopeObject)
  }

  render() {
    const { loading, config, ...rest } = this.props;
    const { scopeNameList, showOverview, scopeObject, breadCrumbItems } = this.state;
    console.log('breadCrumbItems: ');
    console.log(breadCrumbItems);

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


        <div>
          <BreadCrumb model={breadCrumbItems} />
          {
            showOverview && (
              <div style={{ marginLeft: '50px', marginTop: '25px'}} className="content-section implementation">
                <h4 >The following scopes exist within the selected file</h4>
                <ListBox value={this.state.car} filter={true} filterPlaceholder="Search" options={scopeNameList} onChange={(e) => this.setState({car: e.value})} itemTemplate={this.carTemplate}
                  style={{width:'500px'}} listStyle={{}}/>
                <div style={{ margin: '25px'}}>
                  <Button onClick={this.createOption} label="create new" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                  <Button onClick={this.handleOnEdit} label="edit" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                  <Button onDoubleClick={this.deleteOption} label="delete" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                </div>
              </div>
          )}
          { !showOverview && (
            <Scope config={config} scopeObject={scopeObject} updateBreadCrumbs={this.updateBreadCrumbs} updateScopeObject={this.updateScopeObject} />
            )} 
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
