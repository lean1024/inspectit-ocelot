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

  handleClick = () => {
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

            {classMatcherObject.names && (
              <React.Fragment>
                <div style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
                  <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'85px', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                    <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>I want to target the classes that have a specific class name</p>
                  </div>
                  { Object.keys(classMatcherObject.names).map(entry =>
                  <React.Fragment>
                    <div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background: background_middleDiv, padding: '15px 30px 15px 15px', borderRadius:'10px'}}>
                      <p style={{ color: color_elementSchrift}}> The wanted name of the class </p>
                      <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={classMatcherObject.names[entry].matcherMode} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
                      <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
                      <InputText style={{marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={classMatcherObject.names[entry].term} onChange={(e) => this.setState({value: e.target.value})} />
                      <i onClick={this.handleClick} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
                    </div>
                  </React.Fragment>
                  )}
                <div style={{padding: '25px' , height:'85px', outline:'',  marginBottom: '15px',  width:'712px' , borderRadius:'10px', border: `2px solid ${background_middleDiv}`}}>
                  <i onClick={this.handleClick} style={{ position: '', bottom:'', left: '', fontSize:'30px',  color:'whitesmoke'}} className="pi pi-plus-circle"></i>
                </div>
                </div>
                <div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '25px',}}>
                  <i style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
                </div>
              </React.Fragment>
            )}



            {/* #################################################################################################### */}


            <div style={{  marginBottom: '50px',  position:'relative', height: '357px', padding: '25px', background: 'lightgrey', width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
              <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>I want to target the classes that </p>
                <div style={{ display:'inline-grid', position: 'relative', bottom: '45px', left:'300px'}}>
                  <Button label="have a specific class name" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}></Button>
                  <Button label="implement an interface" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                  <Button label="have an annotation" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                  <Button label="inherit from a superclass" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}></Button>
                </div>
              </div>

            </div>

            {/* #################################################################################################### */}
            <p style={{ color: 'red', margin:'auto', marginTop:'25px', marginBottom:'25px', width:'40%'}}>  ( skip to confirm, if no additional specification is needed )</p>
            <div style={{  marginBottom: '50px',  position:'relative', height: '357px', padding: '25px', background: 'lightgrey', width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
              <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>Additionally those classes must </p>
                <div style={{ display:'inline-grid', position: 'relative', bottom: '45px', left:'300px'}}>
                  <Button label="have a specific class name" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}></Button>
                  <Button label="implement an interface" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                  <Button label="have an annotation" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                  <Button label="inherit from a superclass" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}></Button>
                </div>
              </div>

            </div>


            {/* #################################################################################################### */}

            <div style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
              <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'85px', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>I want to target the classes that have a specific class name</p>
              </div>
              <div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background: background_middleDiv, padding: '15px 30px 15px 15px', borderRadius:'10px'}}>
                <p style={{ color: color_elementSchrift}}> The wanted name of the class </p>
                <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={this.state.city} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
                <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
                <InputText style={{marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
                <i onClick={this.handleClick} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
              </div>
              <div style={{padding: '25px' , height:'85px', outline:'',  marginBottom: '15px',  width:'712px' , borderRadius:'10px', border: `2px solid ${background_middleDiv}`}}>
                <i onClick={this.handleClick} style={{ position: '', bottom:'', left: '', fontSize:'30px',  color:'whitesmoke'}} className="pi pi-plus-circle"></i>
              </div>
            </div>
            <div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '25px',}}>
              <i style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
            </div>

            <div style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
              <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'85px', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>I want to target the classes that have a specific class name</p>
              </div>
              <div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background: background_middleDiv, padding: '15px 30px 15px 15px', borderRadius:'10px'}}>
                <p style={{ color: color_elementSchrift}}> The wanted name of the class </p>
                <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={this.state.city} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
                <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
                <InputText style={{marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
                <i onClick={this.handleClick} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
              </div>
              <div style={{padding: '25px' , height:'85px', outline:'',  marginBottom: '15px',  width:'712px' , borderRadius:'10px', border: `2px solid ${background_middleDiv}`}}>
                <i onClick={this.handleClick} style={{ position: '', bottom:'', left: '', fontSize:'30px',  color:'whitesmoke'}} className="pi pi-plus-circle"></i>
              </div>
            </div>
            <div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '25px',}}>
              <i style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
            </div>




            {/* #################################################################################################### */}

            <div style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: 'lightgrey', width: '100%', borderRadius: '5px' , border: '2px solid grey'}}>
              <div style={{padding: '25px' , height:'85px', outline:'3px solid black', marginBottom: '15px'}}>
                <p style={{ color: 'grey' , marginTop: '0px'}}>Additionally those classed must have a specific class name</p>
              </div>
              <div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background:'red', padding: '15px 30px 15px 15px', borderRadius:'5px'}}>
                <p style={{ color: 'grey'}}> The wanted name of the class </p>
                <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={this.state.city} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
                <p style={{ color: 'grey' ,  marginLeft: '10px' }}>the term</p>
                <InputText style={{marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
                <i onClick={this.handleClick} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
              </div>
              <div style={{padding: '25px' , height:'85px', outline:'3px solid black',  marginBottom: '15px'}}>
                <i onClick={this.handleClick} style={{ position: '', bottom:'', left: '', fontSize:'30px',  color:'darkgrey'}} className="pi pi-plus-circle"></i>
              </div>
            </div>
            <div style={{ position: 'relative', height: '20px' , display: 'flex', outline: '3px solid black', marginBottom: '25px'}}>
              <i style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
            </div>

            <div style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: 'lightgrey', width: '100%', borderRadius: '5px' , border: '2px solid grey'}}>
              <div style={{padding: '25px' , height:'85px', outline:'3px solid black', marginBottom: '15px'}}>
                <p style={{ color: 'grey' , marginTop: '0px'}}>Additionally those classed must implement an interface</p>
              </div>
              <div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background:'red', padding: '15px 30px 15px 15px', borderRadius:'5px'}}>
                <p style={{ color: 'grey'}}> The wanted name of the interface </p>
                <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={this.state.city} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
                <p style={{ color: 'grey' ,  marginLeft: '10px' }}>the term</p>
                <InputText style={{marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
                <i onClick={this.handleClick} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
              </div>
              <div style={{padding: '25px' , height:'85px', outline:'3px solid black',  marginBottom: '15px'}}>
                <i onClick={this.handleClick} style={{ position: '', bottom:'', left: '', fontSize:'30px',  color:'darkgrey'}} className="pi pi-plus-circle"></i>
              </div>
            </div>
            <div style={{ position: 'relative', height: '20px' , display: 'flex', outline: '3px solid black', marginBottom: '25px'}}>
              <i style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
            </div>

            <div style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: 'lightgrey', width: '100%', borderRadius: '5px' , border: '2px solid grey'}}>
              <div style={{padding: '25px' , height:'85px', outline:'3px solid black', marginBottom: '15px'}}>
                <p style={{ color: 'grey' , marginTop: '0px'}}>Additionally those classed must have an annotation</p>
              </div>
              <div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background:'red', padding: '15px 30px 15px 15px', borderRadius:'5px'}}>
                <p style={{ color: 'grey'}}> The wanted name of the annotation </p>
                <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={this.state.city} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
                <p style={{ color: 'grey' ,  marginLeft: '10px' }}>the term</p>
                <InputText style={{marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
                <i onClick={this.handleClick} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
              </div>
              <div style={{padding: '25px' , height:'85px', outline:'3px solid black',  marginBottom: '15px'}}>
                <i onClick={this.handleClick} style={{ position: '', bottom:'', left: '', fontSize:'30px',  color:'darkgrey'}} className="pi pi-plus-circle"></i>
              </div>
            </div>
            <div style={{ position: 'relative', height: '20px' , display: 'flex', outline: '3px solid black', marginBottom: '25px'}}>
              <i style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
            </div>

            <div style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: 'lightgrey', width: '100%', borderRadius: '5px' , border: '2px solid grey'}}>
              <div style={{padding: '25px' , height:'85px', outline:'3px solid black', marginBottom: '15px'}}>
                <p style={{ color: 'grey' , marginTop: '0px'}}>Additionally those classed must inherit from a superclass</p>
              </div>
              <div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background:'red', padding: '15px 30px 15px 15px', borderRadius:'5px'}}>
                <p style={{ color: 'grey'}}> The wanted name of the superclass </p>
                <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={this.state.city} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
                <p style={{ color: 'grey' ,  marginLeft: '10px' }}>the term</p>
                <InputText style={{marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
                <i onClick={this.handleClick} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
              </div>
              <div style={{padding: '25px' , height:'85px', outline:'3px solid black',  marginBottom: '15px'}}>
                <i onClick={this.handleClick} style={{ position: '', bottom:'', left: '', fontSize:'30px',  color:'darkgrey'}} className="pi pi-plus-circle"></i>
              </div>
            </div>
            <div style={{ position: 'relative', height: '20px' , display: 'flex', outline: '3px solid black', marginBottom: '25px'}}>
              <i style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
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
