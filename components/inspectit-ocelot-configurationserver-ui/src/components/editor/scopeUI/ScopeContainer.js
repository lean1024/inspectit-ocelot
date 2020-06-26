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

import GenericSelectorComponent  from './classMatcher/GenericSelectorComponent '
import SimpleOptionComponent from './classMatcher/SimpleOptionComponent';
import SelectorContainer from './newComponents/SelectorContainer';


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

class ScopeContainer extends React.Component {
  state = { showScopeEditOverview: true, showGenericSelectorComponent: false, showMethodSelector: false , }

  componentWillUnmount () {
  }


  componentDidMount(){

    console.log('hiery');
    console.log(this.props.scopeObject)
    this.addEventListenerToBreadCrumbs();
    // TODO: manually styling, this must be set through a <style> for the classNames [p-listbox p-inputtext p-component] and [p-listbox-item]
    // const anotherArray = Array.from(document.getElementsByClassName('p-listbox p-inputtext p-component'));
    // anotherArray.map( element => element.style.width= '1400px');
    // const listItems = Array.from(document.getElementsByClassName('p-listbox-item'));
    // listItems.map( item => {
    //   item.style.borderBottom = '1px solid black';
    //   item.style.paddingBottom = '15px';
    // })
  }

  displayScope = () => this.setState({showScopeEditOverview: true, showGenericSelectorComponent: false, showMethodSelector: false});

  // scope name was clicked
  handleBreadCrumbClick = () => {
    const { updateBreadCrumbs, scopeObject } = this.props;
    const { scopeName } = scopeObject;
    const breadCrumbItems = [{'label': 'Scope Overview'}, {'label': scopeName }];

    updateBreadCrumbs(breadCrumbItems)
    this.displayScope();
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

  showGenericSelectorComponent = () => {
    this.setState({ 
      showScopeEditOverview: false,
      showGenericSelectorComponent: true,
    })
  }

  setSelectorType = selectorType => this.setState({ selectorType})

  displayTheGivenView = (view) => {
    switch (view) {
      case 'showScopeEditOverview': 
        this.setState( {
          showScopeEditOverview:  !this.state.showScopeView,
          showBusinessTransactionView: false,
          showTreeTableView: false,
        });
        break;
      case 'showScopeView': 
        this.state.displayScopeEditor === 'none' ? this.setState({ displayScopeEditor: 'flex'}) : this.setState({ displayScopeEditor: 'none'});
        this.setState( {
          showScopeView:  !this.state.showScopeView,
          showBusinessTransactionView: false,
          showTreeTableView: false,
        });
        break;
      case 'showScopeView': 
        this.state.displayScopeEditor === 'none' ? this.setState({ displayScopeEditor: 'flex'}) : this.setState({ displayScopeEditor: 'none'});
        this.setState( {
          showScopeView:  !this.state.showScopeView,
          showBusinessTransactionView: false,
          showTreeTableView: false,
        });
        break;
    }
  }

  render(){
    const { showScopeEditOverview, showGenericSelectorComponent, selectorType } = this.state;
    const { config, scopeObject, updateBreadCrumbs, updateScopeObject } = this.props;


    return(
      <React.Fragment>
        { showScopeEditOverview && (
          <Scope showGenericSelectorComponent={this.showGenericSelectorComponent} setSelectorType={this.setSelectorType} updateBreadCrumbs={updateBreadCrumbs} scopeObject={scopeObject} updateScopeObject={updateScopeObject} />
        )}

        { showGenericSelectorComponent && (
          <GenericSelectorComponent scopeObject={scopeObject} updateScopeObject={updateScopeObject} selectorType={selectorType} />
        )}

      </React.Fragment>
    )
  }
}

class Scope extends React.Component {

  constructor() {
    super();
    this.state = {
        icon_scopeName: false,
        icon_classSelector: false,
        icon_methodSelector: false,
        classSelectorArray: [],

        selectedCity: null,
        selectedCities: null,
        selectedCar: 'BMW'
    };

    // this.carservice = new CarService();
    // this.carTemplate = this.carTemplate.bind(this);
  }

  componentWillMount() {
    this.setClassSelectorArray();
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

  handleClassSelectorButton = () => {
    const { showGenericSelectorComponent, setSelectorType, updateBreadCrumbs, scopeObject } = this.props;
    const { scopeName } = scopeObject;
    const breadCrumbItems = [{'label': 'Scope Overview'}, {'label': scopeName }, {'label': 'Class Selector'}];
    updateBreadCrumbs(breadCrumbItems)
    showGenericSelectorComponent();
    setSelectorType('Class');
  }

  handleMethodSelectorButton = () => {
    const { showGenericSelectorComponent, setSelectorType, updateBreadCrumbs, scopeObject } = this.props;
    const { scopeName } = scopeObject;
    const breadCrumbItems = [{'label': 'Scope Overview'}, {'label': scopeName }, {'label': 'Method Selector'}];
    updateBreadCrumbs(breadCrumbItems)
    showGenericSelectorComponent();
    setSelectorType('Method');
  }

  methodSelectorListTemplate = (methodSelector) => {

    const firstRow = { paddingRight: '15px', width: '125px'}
    // console.log(methodSelector)
    // console.log('#######################')
    // console.log('')

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

  // <Listbox options={X} must be an array, scopeObject is not
  setClassSelectorArray = () => {
    const { scopeObject } = this.props;
    let classSelectorArray = [];
    Object.keys(scopeObject).map(key => {
      if (key === 'interfaces' || key === 'type' || key === 'superclass'){
        // json entry
        let entry = { [key]: scopeObject[key]}
        classSelectorArray.push(entry)
      }
    })
    this.setState({classSelectorArray})
  }

  classSelectorListTemplate = (classSelector) => {
    // interfaces : [ array ]
    // type       : 
    // superclass :
    const { scopeObject, updateScopeObject } = this.props;
    const selectorType = 'Class';
    const firstRow = { paddingRight: '15px', width: '125px'}

    console.log('updateScopeObject1',updateScopeObject)

    return (
      <React.Fragment>
        <typeTemplate />
        <interfacesTemplate />
        <superclassTemplate />
      </React.Fragment>
    )
  }


  render() {
    const { icon_scopeName, icon_classSelector, icon_methodSelector, classSelectorArray } = this.state;
    const { showGenericSelectorComponent, scopeObject, updateScopeObject } = this.props;

    console.log('hierBBB', scopeObject)

    const options = [
      {name: 'name', visibility: 'visibility', interface: 'interface', object:'object', annotation: 'annotation', },
      {name: 'name', visibility: false, interface: false, object: false, annotation: 'annotation', },
      {name: false, visibility: 'visibility', interface: false, object:'object', annotation: false, },
      {name: false, visibility: false, interface: 'interface', object:false, annotation: false, },
    ];
 
    const cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
    ];

    const cars = [
      {label: 'Audi', value: 'Audi'},
      {label: 'BMW', value: 'BMW'},
      {label: 'Fiat', value: 'Fiat'},
      {label: 'Honda', value: 'Honda'},
      {label: 'Jaguar', value: 'Jaguar'},
      {label: 'Mercedes', value: 'Mercedes'},
      {label: 'Renault', value: 'Renault'},
      {label: 'VW', value: 'VW'},
      {label: 'Volvo', value: 'Volvo'}
    ];

    const scopeName = scopeObject.scopeName;

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
            <div style={{background:'#EEEEEE', borderBottom: '1.5px solid white', padding: '25px'}}>
              <div style={{display:'flex', alignItems:'center'}}>
              <h3 style={{marginTop: '0px'}} className="first">scopename</h3>
              <InputText style={{marginLeft: '50px', width: '375px'}} value={scopeObject.scopeName} onChange={(e) => this.setState({value1: e.target.value})} />
              <span style={{marginLeft:'.5em'}}>{this.state.value1}</span>
             
              { !icon_scopeName && (
                <i style={{border: '2px solid black', borderRadius:'15px', opacity: '0.1', marginLeft: '5px' }}className="pi pi-check"></i>
              )}
              { icon_scopeName && (
                <i style={{border: '2px solid green', borderRadius:'15px' }}className="pi pi-check"></i>
              )}
              
              </div>
            </div>

            <div style={{background:'#EEEEEE', borderBottom: '1.5px solid white', padding: '25px'}}>
              <h3 style={{marginTop: '0px'}} >class selector</h3> 
              <div style={{display:'flex', alignItems:'center', marginBottom: '10px'}}>
                  <div  style={{maxWidth:'300px'}}>
                  <span style={{display: 'inline-block'}}> 
                    create a selector on a single class or a set of classes. 
                    Only the classes, which fullfill all option's within your class selector will be utilized.
                  </span>
                </div>
              <div>
                <Button onClick={this.handleClassSelectorButton} style={{display: 'inline-block', marginLeft:'50px', padding:'10px'}}label="create class selector" />

              </div>
              { !icon_classSelector && (
                <i style={{border: '2px solid black', borderRadius:'15px', opacity: '0.1', marginLeft: '15px' }}className="pi pi-check"></i>
              )}
              { icon_classSelector && (
                <i style={{border: '2px solid green', borderRadius:'15px' }}className="pi pi-check"></i>
              )}
              </div>
              {/* classSelector here */}
              <div style={{width:'1200px', background:'white', minHeight: '200px',  padding:'35px'}}>
                <SelectorContainer scopeObject={scopeObject}/>
{/* <SimpleOptionComponent selectorType={'Class'} scopeObject={scopeObject} updateScopeObject={updateScopeObject}  optionType={'type'} template={'simpleComponentTemplate'} />
<SimpleOptionComponent selectorType={'Class'} scopeObject={scopeObject} updateScopeObject={updateScopeObject}  optionType={'interfaces'}  template={'simpleComponentTemplate'} />
<SimpleOptionComponent selectorType={'Class'} scopeObject={scopeObject} updateScopeObject={updateScopeObject}  optionType={'superclass'}  template={'simpleComponentTemplate'} /> */}
              </div>
              {/* <ListBox value={classSelectorArray} style={{ witdh: '800px' }} options={classSelectorArray} onChange={(e) => this.setState({selectedCity: e.value})} 
              optionLabel="name" itemTemplate={this.classSelectorListTemplate} /> */}
            </div>

            <div style={{background:'#EEEEEE', borderBottom: '1.5px solid white', padding: '25px'}}>
              <h3 style={{marginTop: '0px', marginBottom: '15px'}}>method selectors</h3>

              <div style={{display:'flex', alignItems:'center', marginBottom: '15px'}}>
                  <div  style={{maxWidth:'300px'}}>
                  <span style={{display: 'inline-block'}}> 
                    hand-pick a method or group of methods by using a selector. Use the options to specify the selector. Each list-item wields a specific selector.
                  </span>
                </div>
              <Button onClick={this.handleMethodSelectorButton} style={{display: 'inline-block', marginLeft:'50px', padding:'10px'}}label="create method selector" />
              { !icon_classSelector && (
                <i style={{border: '2px solid black', borderRadius:'15px', opacity: '0.1', marginLeft: '15px' }}className="pi pi-check"></i>
              )}
              { icon_classSelector && (
                <i style={{border: '2px solid green', borderRadius:'15px' }}className="pi pi-check"></i>
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

ScopeContainer.propTypes = {
  selectorType: undefined,
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

ScopeContainer.defaultProps = {
  loading: false,
};

export default ScopeContainer;
