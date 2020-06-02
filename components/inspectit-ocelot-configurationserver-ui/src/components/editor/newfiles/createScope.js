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

    // this.carservice = new CarService();
    // this.carTemplate = this.carTemplate.bind(this);
  }

  toggle() {
      this.setState({disabled: !this.state.disabled});
  }



  listItemMethod(options) {

      return (
          <div className="p-clearfix" style={{witdh:'900px', padding: '5px 0 5px 0', borderBottom:'4px solid #F0F0F0'}}>
          {Object.keys(options).map(option => 
            options[option] === false && (
              <img src={`/images/${option}.png`} style={{ opacity: 0.1 , margin: '2px 0 2px 2px', marginLeft: '25px', width:80 }} />
            ) ||        
            options[option] !== false && (
              <img src={`/images/${options[option]}.png`} style={{  display: 'inline-block', margin: '2px 0 2px 2px', marginLeft: '25px', width:80, outline: '2px solid grey' }} />
            )
          )}

                {/* {console.log(options)}
                <Button> oh </Button>
                {Object.keys(options).map(option => {
                <Button> nose </Button>
                {console.log(options[option])}

                  options[option] === false && (
                    <img src="/images/name.png" style={{ visibility: 'hidden', margin: '2px 0 2px 2px', marginLeft: '15px', width:50 }} />
                  )
                  options[option] !== false && (
                    <img src={`/images/${options[option]}.png`} style={{  display: 'inline-block', margin: '2px 0 2px 2px', marginLeft: '15px', width:50 }} />
                  )
                })} */}
                  {/* <img src="/images/name.png" style={{ display: 'inline-block', margin: '2px 0 2px 2px', marginLeft: '15px', width:50 }} />
                  <img src="/images/visibility.png" style={{ display: 'inline-block', margin: '2px 0 2px 2px', marginLeft: '15px', width:50 }} />
                  <img src="/images/interface.png" style={{ display: 'inline-block', margin: '2px 0 2px 2px', marginLeft: '15px', width:32 }} />
                  <img src="/images/object.png" style={{ display: 'inline-block', margin: '2px 0 2px 2px', marginLeft: '20px', width:32 }} />
                  <img src="/images/at-symbol.jpg" style={{ display: 'inline-block', margin: '2px 0 2px 2px', marginLeft: '15px', width:32 }} /> */}
          </div>
      );
  }
  

  render() {
    const { icon_scopeName, icon_classSelector, icon_methodSelector } = this.state;

  const options = [
    {name: 'name', visibility: 'visibility', interface: 'interface', object:'object', annotation: 'annotation', },
    {name: 'name', visibility: false, interface: false, object: false, annotation: 'annotation', },
    {name: false, visibility: 'visibility', interface: false, object:'object', annotation: false, },
    {name: false, visibility: false, interface: 'interface', object:false, annotation: false, },
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
 
        <div className="content-section implementation">
          <div className="content-section implementation">
            <div style={{background:'ghostwhite', border: '1.5px solid #EEEEEE', padding: '25px'}}>
              <div style={{display:'flex', alignItems:'center'}}>
              <h3 style={{marginTop: '0px'}} className="first">scopename</h3>
              <InputText style={{marginLeft: '50px'}}value={this.state.value1} onChange={(e) => this.setState({value1: e.target.value})} />
              <span style={{marginLeft:'.5em'}}>{this.state.value1}</span>
             
              { !icon_scopeName && (
                <i style={{border: '2px solid black', borderRadius:'15px', opacity: '0.1', marginLeft: '5px' }}className="pi pi-check"></i>
              )}
              { icon_scopeName && (
                <i style={{border: '2px solid green', borderRadius:'15px' }}className="pi pi-check"></i>
              )}
              
              </div>
            </div>

            <div style={{background:'ghostwhite', border: '1.5px solid #EEEEEE', padding: '25px'}}>
              <h3 style={{marginTop: '0px'}} >class selector</h3> 
              <div style={{display:'flex', alignItems:'center'}}>
                  <div  style={{maxWidth:'300px'}}>
                  <span style={{display: 'inline-block'}}> 
                    create a selector on a single class or a set of classes. 
                    Only the classes, which fullfill all option's within your class selector will be utilized.
                  </span>
                </div>
              <Button style={{display: 'inline-block', marginLeft:'50px', padding:'10px'}}label="create class selector" />
              { !icon_classSelector && (
                <i style={{border: '2px solid black', borderRadius:'15px', opacity: '0.1', marginLeft: '15px' }}className="pi pi-check"></i>
              )}
              { icon_classSelector && (
                <i style={{border: '2px solid green', borderRadius:'15px' }}className="pi pi-check"></i>
              )}
              </div>
            </div>

            <div style={{background:'ghostwhite', border: '1.5px solid #EEEEEE', padding: '25px'}}>
              <h3 style={{marginTop: '0px', marginBottom: '0px'}}>method selectors</h3>
              <div style={{display: 'flex'}}>
              <p>
                hand-pick a method or group of methods by using a selector. Use the options to specify the selector. Each list-item wields a specific selector.
                {/* target a group of methods 
                target one method 
                target a set of methods 
                target specifig methods
                create a selector on a single method or a set of methods. 
                
                Each selector determines a set of method. The found methods of the selectors will be combined. */}
                </p>
              { !icon_methodSelector && (
                <i style={{border: '2px solid black', borderRadius:'15px', opacity: '0.1', marginLeft: '15px', position: 'relative', top: '15px' , display: 'table' }}className="pi pi-check"></i>
              )}
              { icon_methodSelector && (
                <i style={{border: '2px solid green', borderRadius:'15px' , display: 'table',  marginLeft: '15px', position: 'relative', top: '15px'}}className="pi pi-check"></i>
              )}
              </div>
              <div>


                <div className="content-section implementation">
                    <div className="p-grid">
                        <div className="p-col-12 p-md-8"  >
                          <OrderList 
                              value={options} 
                              dragdrop={true} 
                              itemTemplate={this.listItemMethod}
                              responsive={true} listStyle={{height: '35em'}}
                              onChange={(e) => this.setState({options: e.value})} />
                        </div>
                    </div>
                </div>
            </div>

            </div>

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
