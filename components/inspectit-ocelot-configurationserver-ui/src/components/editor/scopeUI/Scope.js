import {InputText} from 'primereact/inputtext';
import {ListBox} from 'primereact/listbox';

import { cloneDeep } from 'lodash';
import PropTypes, { object } from 'prop-types';
import React from 'react';

import SelectorContainer from './newComponents/SelectorContainer';
import deepCopy from 'json-deep-copy';


class Scope extends React.Component {
  // the specific icon is set to green, when for e.x scopename, a classSelector, a methodSelector exist
  state = { icon_scopeName: false, icon_classSelector: false , icon_methodSelector: false}

  componentDidMount(){
    this.addEventListenerToBreadCrumbs();

    // do not read! Obsolete information and is not in use
    // TODO: manually styling, this must be set through a <style> for the classNames [p-listbox p-inputtext p-component] and [p-listbox-item]
    // const anotherArray = Array.from(document.getElementsByClassName('p-listbox p-inputtext p-component'));
    // anotherArray.map( element => element.style.width= '1400px');
    // const listItems = Array.from(document.getElementsByClassName('p-listbox-item'));
    // listItems.map( item => {
    //   item.style.borderBottom = '1px solid black';
    //   item.style.paddingBottom = '15px';
    // })
  }

  addEventListenerToBreadCrumbs = () => {
    const { scopeName } = this.props.scopeObject;
    // <BreadCrumb> does not enable onClick listener on the elements, we manually get the elements and at the wished functionality
    let breadCrumbArray = Array.from(document.getElementsByClassName('p-breadcrumb p-component')[0].getElementsByClassName('p-menuitem-link'));
    breadCrumbArray.map(element => {
      if( element.innerText === scopeName ) {
        element.addEventListener('click', this.handleBreadCrumbClick);
      }
    })
  }

  methodSelectorListTemplate = (methodSelector) => {

    const firstRow = { paddingRight: '15px', width: '125px'}

    return (
      <React.Fragment>
        <div style={{display: 'inline-flex'}}> 
          <p style={{fontWeight: 'bold', width:'125px'}}> method selector: </p>
          <p>returns the methods, which fullfill all of the options within this list item</p>
        </div>
        {Object.keys(methodSelector).map( key =>
          <React.Fragment>
          <div>
            {Array.isArray(methodSelector[key]) && (
              <div style={{display: '-webkit-box', marginBottom: '10px'}}>
                <p style={{ ...firstRow}}> {key} </p>
                { methodSelector[key].map(entry => 
                  <React.Fragment>
                    {typeof (entry) === 'object' && (
                      <div style={{display: '', border: '1px solid black', padding: '7px', marginRight: '10px'}} >
                        <p style={{margin: '0 0 5px 0'}}> {entry['matcher-mode']}</p>
                        <p style={{margin: '0 0 0 0'}}> {entry.name} </p>
                      </div>
                    )}

                    {typeof (entry) !== 'object' && (
                      <div style={{ border: '1px solid black', padding: '7px', marginRight: '10px'}}>
                        <p style={{margin: '0 0 0 0'}}> {entry} </p> 
                      </div>
                    )}
                    
                  </React.Fragment>
                )}
                
              </div>
            )}
          </div>

          <div>
            {!Array.isArray(methodSelector[key]) && (
              <div style={{display: 'inline-flex'}}>
                <p style={{...firstRow}}> {key} </p>
                <p> {methodSelector[key]} </p>
                {/* true boolean cant be displayed, so we write it out */}
                {methodSelector[key] === true && <p> true</p>} 
                {methodSelector[key] === false && <p> false </p>} 
              </div>
            )}
          </div>

          </React.Fragment>
        )}
      </React.Fragment>
    )
  }

  onGenericUpdate = ( updatedValue, optionType ) => {
    let { onUpdate, item } = this.props;
    let updatedItem = deepCopy(item);
    
    if(Array.isArray(updatedValue) === true) {
      if( updatedValue.length === 0 ) {
        delete updatedItem[optionType];
      } else {
        updatedItem[optionType] = updatedValue;
      }
    } else {  // assumption, the updateValue is a json thus Object.keys
      if ( Object.keys(updatedValue).length === 0) {
        delete updatedItem[optionType];
      } else {
        updatedItem[optionType] = updatedValue;
      }
    }
    onUpdate(updatedItem);
  }

  componentWillMount(){
    // this.groupAttributesFromItemUnderAnAlias();
  }

  render() {
    const { icon_scopeName, icon_classSelector , icon_methodSelector} = this.state;
    const { scopeObject, onUpdate, currentlyDisplayScopeName } = this.props;

    const scopeName = scopeObject.scopeName;
    const boxStyle = {background:'#EEEEEE', borderBottom: '1.5px solid white', padding: '25px'};
    const validCheckIcon = { border: '2px solid green', color: 'green', borderRadius:'15px' };
    const invalidCheckIcon = {border: '2px solid black', borderRadius:'15px', opacity: '0.1' };
    const marginBottom = '15px';
    const alignItems = 'center';

    const descriptionTextMaxWidth = '300px' // selector description max length, else the row expends to much

    // TODO: groupAlias, where does the information come from
    const groupAttributeAlias = 'class'

    return (
      <div className="this">
        <div >
          <div >
            {/* scopenameBox */}
            <div style={{ ...boxStyle}}>
              {/* scopename */}
              <div style={{display:'flex', alignItems}}>
              <h3 style={{marginTop: '0px'}} >scopename</h3>
              <InputText style={{marginLeft: '50px', width: '375px'}} value={currentlyDisplayScopeName} onChange={(e) => this.setState({value1: e.target.value})} />
              <span style={{marginLeft:'.5em'}}>{this.state.value1}</span>
             
              {/* checkIcon for scopeName*/}
                { !icon_scopeName && (
                  <i style={{...invalidCheckIcon, marginLeft: '5px' }}className="pi pi-check"></i>
                )}
                { icon_scopeName && (
                  <i style={{...validCheckIcon}}className="pi pi-check"></i>
                )}
              </div>
            </div>

            {/* classSelectorBox */}
            <div style={{ ...boxStyle}}>
              <h3>class selector</h3> 
              <div style={{display:'flex', alignItems, marginBottom}}>

                {/* descriptionText */}
                <div  style={{maxWidth: descriptionTextMaxWidth}}>
                  <span style={{display: 'inline-block'}}> 
                    create a selector on a single class or a set of classes. 
                    Only the classes, which fullfill all option's within your class selector will be utilized.
                  </span>
                </div>

                {/* placeholder for adding attributes via splitbutton or placeholder */}

                {/* checkIcon for classSelector */}
                { !icon_classSelector && (
                  <i style={{...invalidCheckIcon, marginLeft: '15px' }}className="pi pi-check"></i>
                )}
                { icon_classSelector && (
                  <i style={{...validCheckIcon}}className="pi pi-check"></i>
                )}
              </div>

              {/* classSelector here */}
              <div style={{width:'', background:'white', minHeight: '200px',  padding:'35px'}}>
                <SelectorContainer scopeObject={scopeObject} onUpdate={onUpdate} />
              </div>
            </div>

            {/* methodSelector box */}
            <div style={{ ...boxStyle}}>
              <h3 style={{marginTop: '0px', marginBottom}}>method selectors</h3>

              {/* descriptionText */}
              <div style={{display:'flex', alignItems, marginBottom}}>
                <div  style={{maxWidth: descriptionTextMaxWidth}}>
                  <span style={{display: 'inline-block'}}> 
                    hand-pick a method or group of methods by using a selector. Use the options to specify the selector. Each list-item wields a specific selector.
                  </span>
                </div>

                 {/* placeholder for adding attributes via splitbutton or placeholder */}
              
                {/* checkIcon for methodSelector */}
                { !icon_methodSelector && (
                  <i style={{...invalidCheckIcon , marginLeft: '15px'}}className="pi pi-check"></i>
                )}
                { icon_methodSelector && (
                  <i style={{...validCheckIcon}}className="pi pi-check"></i>
                )}
              </div>

              
              <ListBox value={scopeObject.methods} style={{ witdh: '800px' }} options={scopeObject.methods} onChange={(e) => this.setState({selectedCity: e.value})} 
              optionLabel="name" itemTemplate={this.methodSelectorListTemplate} />
              
            </div>

          </div>
        </div>
           
      </div>
    );
  }
}

export default Scope;
