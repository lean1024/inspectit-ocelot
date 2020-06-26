import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';


class SimpleOptionComponent extends React.Component {
  state = { hoveredItem: undefined , itemTemplate: undefined, cities: [] , annotationArrays: undefined };

  // the generic component needs to be specified. Setting up the text here.
  componentWillMount(){
    this.setAnnotationArrays();

    console.log('updateScopeObject2',this.props.updateScopeObject)

    const { optionType, selectorType } = this.props;

    switch(selectorType) {
      case 'Class':
        this.setState({selectorTypeText: 'classes'})
        break;
      case 'Method':
        this.setState({selectorTypeText: 'methods'})
    }

    // optionType will either be type, superclass, annotations, interfaces
    // since this component will be used for every optionType the written text should be adjusted



    // info# why do i introduce optionTypeText? This component should display the "optionType". The optionType for class name is
    // type. This cant be a text, so the component needs to re-write the text to "class name".
    switch(optionType) {
    // class option types
      case 'type':
        this.setState({upperText: `have a specific class name`, optionTypeText: 'class name'});
        break;
      case 'interfaces':
        this.setState({upperText: 'implement an interface', optionTypeText: 'interface'}) 
        break;
    // TODO: case annotation ? oder annotations plural
      case 'annotation':
        this.setState({upperText: 'have an annotation', optionTypeText: 'annotation'})
        break;
      case 'superclass':
        this.setState({upperText: 'inherit from a superclass', optionTypeText: 'superclass'})
        break;

    // method option types
      case 'name':
        this.setState({upperText: `have a specific method name`, optionTypeText: 'method name'})
        break;
      case 'visibility':
        this.setState({upperText: 'have any of the visibilities', optionTypeText: 'visibility'}) 
        break;
      // TODO: case annotation ? oder annotations plural
      case 'annotation':
        this.setState({upperText: 'have an annotation', optionTypeText: 'annotation'})
        break;
      case 'arguments':
        this.setState({upperText: 'have the following arguments', optionTypeText: 'arguments'})
        break;
    }

    // the generic component either displays simpleTemplate or visibilityTemplate or argumentsTemplate
    if ( optionType === 'visibility' || optionType === 'arguments') this.setState({itemTemplate: optionType})
    else this.setState({ itemTemplate: 'simpleTemplate'});
  }
  
  // the component needs highlighting for better UX.
  // the "add" and "remove" icons indicate which div they will remove with a red outline 

  // each template got a data-optiontype
  // each mouseOver icon got a data-tobehighlighted 
  // the function finds the corresponding div and highlights it
  handleMouseOver = (e) => {
    let tooltip = e.target.previousSibling;
    tooltip.style.visibility = 'visible'

    let optionType = e.target.dataset.tobehighlighted;
    let targetArray = Array.from(document.querySelectorAll('[data-optiontype]'));
    targetArray.map(element => {
      if ( element.dataset.optiontype === optionType ) {
        console.log(' ')
        console.log('#################')
        console.log(element)
        console.log(element.dataset.optiontype)
        console.log(optionType)
        element.style.border = '1px solid transparent';
        element.style.boxShadow = '0 0 0 3px red';
      }
    })
  } 

  handleMouseLeave = (e) => {
    let tooltip = e.target.previousSibling;
    tooltip.style.visibility = 'hidden';

    let optionType = e.target.dataset.tobehighlighted;
    let targetArray = Array.from(document.querySelectorAll('[data-optiontype]'));
    targetArray.map(element => {
      if ( element.dataset.optiontype === optionType ) 
      element.style.border = '1px solid black';
      element.style.boxShadow = '';
    })
  }

  handleItemRemoveOver = (e) => { 
    let optionDiv = e.target.parentElement
    optionDiv.style.boxShadow = '0 0 0 3px red';
    this.setState({hoveredItem:optionDiv })
  }
  handleItemRemoveLeave =  (e) => {
    const { hoveredItem } = this.state;
    // boxShadow to highlight which item gets removed. Boxshadow leaves a color behind.. weird interaction. Quick fix, background matching
    hoveredItem.style.boxShadow = '0 0 0 1px lightsteelblue';
    this.setState({hoveredItem: undefined})
  }

  handleAddItemOver = (e) => {
    e.target.nextSibling && (e.target.nextSibling.style.visibility = 'visible');

    // @delay functionality
    // let el=e.target.nextSibling
    // let delay= setTimeout(() => {el.style.visibility = 'visible';},1000);
    // console.log(delay);
    // el.addEventListener('mouseleave', (e) => {
    //   clearTimeout(delay);
    //   el.removeEventListener('onmouseleave');
    // });
  }

  handleAddItemLeave = (e) => {
    e.target.nextSibling && (e.target.nextSibling.style.visibility = 'hidden');
  }

  // the component needs a function to handle the onChange on inputs and dropdowns
  // creating 1 function to handle multiple inputs and dropdowns, by making use of data-attributes on the inputs and dropdowns to differentiate
  // using the selectorType to change the scopeObject either at class keys or at method keys
  handleChange = e => { 
    let { scopeObject, updateScopeObject, optionType, selectorType } = this.props;
    if ( selectorType === 'Class') {
      // optionType is either type, interfaces, annotations, superclass 
      // isArray is important to differentiate between an array key
      // index is for the position in the array, it it's an array
      let type = e.target.name;
      let index = e.target.id;
      let isArray = undefined;
      if (optionType === 'interfaces' || optionType === 'annotations') isArray=true;
  
      // the scopeObject is at the target key an array (e.x interfaces) and must be handled like one
      if(isArray) scopeObject[optionType][index][type] = e.target.value;
      // the scopeObject is at the target key not an array (type, superclass)
      if(!isArray) scopeObject[optionType][type] = e.target.value;
  
      let scopeName = scopeObject.scopeName; // not needed? dunno
      updateScopeObject(scopeName, scopeObject)
    } else if ( selectorType === 'Method') {
      let type = e.target.name;
      let index = e.target.id;
      let isArray = undefined;
      if (optionType === 'interfaces' || optionType === 'annotations') isArray=true;
  
      // the scopeObject is at the target key an array (e.x interfaces) and must be handled like one
      if(isArray) scopeObject[optionType][index][type] = e.target.value;
      // the scopeObject is at the target key not an array (type, superclass)
      if(!isArray) scopeObject[optionType][type] = e.target.value;
  
      let scopeName = scopeObject.scopeName; // not needed? dunno
      updateScopeObject(scopeName, scopeObject)
    }
  }

  // the item can be inside an array (interfaces)
  // the item can be not inside an array (type, superclass)
  // index is not undefined if the optionType is an array
  deleteItem = (e) => {
    let { scopeObject, updateScopeObject, optionType } = this.props;
    let index = e.target.id;
    let isArray = undefined;
    if (index) { isArray=true};

    // removing the element out of the scopeObject
    if ( isArray) {
      let targetArray = scopeObject[optionType];
      targetArray.splice(index,1);

      // when the array gets empty, we remove the whole optionType out of the scopeObject
      if (targetArray.length < 1 ) {
        delete scopeObject[optionType];
      } else {
        // updating the targetarray in the scopeObject;
        scopeObject[optionType] = targetArray;
      }
    }

    if ( !isArray ) {
      delete scopeObject[optionType];
    }


    // updating the scopeObject
    let scopeName = scopeObject.scopeName;
    updateScopeObject(scopeName, scopeObject)
  }

  // removing an optionType means to delete the corresponding key in scopeObject(type, interface, superclass )
  // TODO: anootation can be passed as optionType, but is only a nested key of type and interfaces
  removeOption = () => {
    let { scopeObject, updateScopeObject, optionType } = this.props;
    delete scopeObject[optionType];

    // updating the scopeObject
    let scopeName = scopeObject.scopeName;
    updateScopeObject(scopeName, scopeObject)
  }

  // div, which contains an item for an optionType
  itemTemplate = (entry, index) => {
    const background_bigDiv = "#EEEEEE";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "white";
    const background_middleDiv = "white"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "darkslategrey";
    const color_elementSchrift = "black";

    const { optionTypeText } = this.state;

    console.log('entryOOO', entry);

    // dropdown data
    const dropdownOptions = [
      {label: 'EQUALS_FULLY', value: 'EQUALS_FULLY'},
      {label: 'STARTS_WITH', value: 'STARTS_WITH'},
      {label: 'STARTS_WITH_IGNORE_CASE', value: 'STARTS_WITH_IGNORE_CASE'},
      {label: 'CONTAINS', value: 'CONTAINS'},
      {label: 'CONTAINS_IGNORE_CASE', value: 'CONTAINS_IGNORE_CASE'},
      {label: 'ENDS_WITH', value: 'ENDS_WITH'},
      {label: 'ENDS_WITH_IGNORE_CASE', value: 'ENDS_WITH_IGNORE_CASE'},
    ];
    return (
      // The components optionType div
      <div style={{display: 'inline-flex',  marginBottom: '5px', position:'relative', background: background_middleDiv, padding: '10px 30px 0px 10px', borderRadius:'10px'}}>
        <p style={{ color: color_elementSchrift}}> The {optionTypeText} </p>
        <Dropdown name='matcher-mode' id={index} style={{marginLeft:'10px', fontSize: '13px',  position: 'relative', height:'35px', bottom: '-5px'}} value={entry['matcher-mode']} options={dropdownOptions} onChange={this.handleChange} placeholder="EQUALS_FULLY"/>
        <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
        <InputText name='name' id={index} style={{ textAlign: 'middle', width: '250px', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={entry.name} onChange={this.handleChange} />
        <i name='name' id={index}  onMouseOver={this.handleItemRemoveOver} onMouseLeave={this.handleItemRemoveLeave} onClick={this.deleteItem} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"/>
      </div>
    )
  }


  setAnnotationArrays = () => {
    const { scopeObject } = this.props;
    let interfaceAnnotationArray = [];
    let typeAnnotationArray = [];
    let superclassAnnotationArray = [];

    scopeObject.interfaces && scopeObject.interfaces.map(entry => {
      if ( entry.annotations ) {
        entry.annotations.map(json => {
          interfaceAnnotationArray.push(json);
        })
      }
    })

    scopeObject.type && scopeObject.type.annotations && (typeAnnotationArray = scopeObject.type.annotations );
    scopeObject.superclass && scopeObject.superclass.annotations && ( superclassAnnotationArray  = scopeObject.superclass.annotations );

    this.setState({ annotationArrays: { interfaces: interfaceAnnotationArray , type: typeAnnotationArray, superclass: superclassAnnotationArray}}, () => console.log( 'hereLLL', this.state.annotationArrays));
  }

  // needs optionType
  annotationTemplate = () => {
    const background_bigDiv = "#EEEEEE";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "white";
    const background_middleDiv = "white"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "darkslategrey";
    const color_elementSchrift = "black";

    const { optionTypeText, annotationArrays } = this.state;
    const { optionType } = this.props;

    // dropdown data
    const dropdownOptions = [
      {label: 'EQUALS_FULLY', value: 'EQUALS_FULLY'},
      {label: 'STARTS_WITH', value: 'STARTS_WITH'},
      {label: 'STARTS_WITH_IGNORE_CASE', value: 'STARTS_WITH_IGNORE_CASE'},
      {label: 'CONTAINS', value: 'CONTAINS'},
      {label: 'CONTAINS_IGNORE_CASE', value: 'CONTAINS_IGNORE_CASE'},
      {label: 'ENDS_WITH', value: 'ENDS_WITH'},
      {label: 'ENDS_WITH_IGNORE_CASE', value: 'ENDS_WITH_IGNORE_CASE'},
    ];
    return (
      // The components optionType div
      <React.Fragment>
        { annotationArrays[optionType] && (
          <React.Fragment>
            <h4> The {optionTypeText } must be annotated.</h4>
            {annotationArrays[optionType].map( (entry, index) => 
              <div style={{display: 'inline-flex',  marginBottom: '5px', position:'relative', background: background_middleDiv, padding: '10px 30px 0px 10px', borderRadius:'10px'}}>
                <p style={{ color: color_elementSchrift}}> The Annotation </p>
                <Dropdown name='matcher-mode' id={index} style={{marginLeft:'10px', fontSize: '13px',  position: 'relative', height:'35px', bottom: '-5px'}} value={entry['matcher-mode']} options={dropdownOptions} onChange={this.handleChange} placeholder="EQUALS_FULLY"/>
                <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
                <InputText name='name' id={index} style={{ textAlign: 'middle', width: '250px', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={entry.name} onChange={this.handleChange} />
                <i name='name' id={index}  onMouseOver={this.handleItemRemoveOver} onMouseLeave={this.handleItemRemoveLeave} onClick={this.deleteItem} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"/>
              </div>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }

  checkBoxTemplate = () => {
    const { upperText, selectorTypeText } = this.state;
    const { scopeObject, optionType } = this.props;

    return (
      <div data-optiontype={optionType} style={{display: 'inline-flex'}}>
        <div className="p-col-6">
          <Checkbox inputId="cb1" value="PUBLIC" onChange={this.onCityChange} checked={this.state.cities.includes('PUBLIC')}></Checkbox>
          <label htmlFor="cb1" className="p-checkbox-label">PUBLIC</label>
        </div>
        <div className="p-col-6">
          <Checkbox inputId="cb2" value="PROTECTED" onChange={this.onCityChange} checked={this.state.cities.includes('PROTECTED')}></Checkbox>
          <label htmlFor="cb2" className="p-checkbox-label">PROTECTED</label>
        </div>
        <div className="p-col-6">
          <Checkbox inputId="cb3" value="PACKAGE" onChange={this.onCityChange} checked={this.state.cities.includes('PACKAGE')}></Checkbox>
          <label htmlFor="cb3" className="p-checkbox-label">PACKAGE</label>
        </div>
        <div className="p-col-6">
          <Checkbox inputId="cb3" value="PRIVATE" onChange={this.onCityChange} checked={this.state.cities.includes('PRIVATE')}></Checkbox>
          <label htmlFor="cb3" className="p-checkbox-label">PRIVATE</label>
        </div>
      </div>
    )
  }

  onCityChange = (e) => {
    let selectedCities = [...this.state.cities];
    if(e.checked)
      selectedCities.push(e.value);
    else
      selectedCities.splice(selectedCities.indexOf(e.value), 1);
    this.setState({cities: selectedCities});
  }

  simpleOptionTemplate = () => {
    const background_bigDiv = "#EEEEEE";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "white";
    const background_middleDiv = "white"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "darkslategrey";
    const color_elementSchrift = "black";

    const { upperText, selectorTypeText } = this.state;
    const { scopeObject, optionType } = this.props;
    let editingScope = false;
    const divStyle = { padding: '5px 10px 0 10px' ,height:'30px',  background: background_uberSchriftDiv, width: 'fit-content', outline:'', marginBottom: '15px', borderRadius: '10px' };
    const pStyle = { fontWeight: 'bold', marginTop: '0px' };

    return (
      <React.Fragment>
        <div data-optiontype={optionType} style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, borderRadius: '10px' , border: '1px solid black'}}>
          { !editingScope && (
            <div style={{...divStyle}}>
              <h4 style={{ ...pStyle}}>I want to target the {selectorTypeText} that {upperText} </h4>
            </div>  
          )}
          { editingScope && scopeObject && scopeObject[optionType] && (
            <div style={{...divStyle}}>
              <p style={{ ...pStyle}}>The classes must {upperText} </p>
            </div>
          )}
          <div style={{display: 'inline-grid'}}>
            {/* the component needs to differentiate between being an array optionType component or just 1 element component*/}
            { scopeObject[optionType] && Array.isArray(scopeObject[optionType]) && scopeObject[optionType].map((entry,index) => 
              this.itemTemplate(entry,index)
            )}
            { scopeObject[optionType] && !Array.isArray(scopeObject[optionType]) && this.itemTemplate(scopeObject[optionType])}
            { this.annotationTemplate()}

          </div>
        </div>
        
        <div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '5px',}}>
          <p style={{ visibility: 'hidden' , color:'red', position:'absolute', right:'35px', marginTop:'-3px'}}> remove this option </p>
          <i data-tobehighlighted={optionType} onClick={this.removeOption} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
        </div>
      </React.Fragment>
    )
  }

  argumentsTemplate = () => {

    return (
      <div data-optiontype='here'>

      </div>
    )
  }

  // methodWrapper = () => {
  //   const { selectorType, scopeObject } = this.props;
  //   return (
  //     <div>
  //       {scopeObject.methods && scopeObject.methods.map( json => 
  //         { Object.keys(json).map( methodEntry => 
  //           // hier muss unterschieden werden, welches Template geeignet ist für die darstellung des keys.
  //           <React.Fragment>
  //             {methodEntry === 'name' && this.simpleOptionTemplate()}
  //             {methodEntry === 'visibility' && this.checkBoxTemplate()}
  //             {methodEntry === 'argu' && this.simpleOptionTemplate()}

  //           </React.Fragment>
  //         )}
  //       )}
  //     </div>
  //   )
  // }

  // simpleOptionTemplate = () => {

  //   return (
  //     <div>
  //       <Frame>
  //         <template1 />
  //       </Frame>
  //     </div>
  //   )
  // }

  render(){
    
    const { upperText, selectorTypeText, itemTemplate } = this.state;
    const { scopeObject, optionType, template } = this.props;
    console.log('yeha');
    console.log(scopeObject);
    
    const background_bigDiv = "#EEEEEE";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "white";
    const background_middleDiv = "white"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "darkslategrey";
    const color_elementSchrift = "black";

    // xml parse, ( detects which option gets the "first" status, and the other will get the text "additionally")
    let checkIfFirstElement = 'names';
    let editingScope = false;

    const divStyle = { padding: '5px 10px 0 10px' ,height:'30px',  background: background_uberSchriftDiv, width: 'fit-content', outline:'', marginBottom: '15px', borderRadius: '10px' };
    const pStyle = { color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px' };
// {scopeObject && scopeObject.names && (  important
    return(
      <div style={{width: '715px'}}> 
        {scopeObject[optionType] && itemTemplate === 'simpleTemplate' && (
          template === 'simpleComponentTemplate' && this.simpleOptionTemplate()
        )}
        {scopeObject[optionType] && itemTemplate === 'visibility' && (
          template === 'checkBoxTemplate' && this.checkBoxTemplate()
        )}
        {scopeObject[optionType] && itemTemplate === 'arguments' && (
          template === 'argumentsTemplate' && this.argumentsTemplate()
        )}
      </div>
    )
  }
}

export default SimpleOptionComponent;