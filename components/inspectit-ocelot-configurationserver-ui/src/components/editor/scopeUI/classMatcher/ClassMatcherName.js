import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';


class ClassMatcherName extends React.Component {
  state = { hoveredItem: undefined };

  componentWillMount(){
    const { option } = this.props;

    // option will either be type, superclass, annotations, interfaces
    // since this component will be used for every option the written text should be adjusted
    switch(option) {
      case 'type':
        this.setState({upperText: 'have a specific class name', type: 'class name'
        })
        break;
      case 'interfaces':
        this.setState({upperText: 'implement an interface', type: 'interface'}) 
        break;
      case 'annotation':
        this.setState({upperText: 'have an annotation', type: 'annotation'})
        break;
      case 'superclass':
        this.setState({upperText: 'inherit from a superclass', type: 'superclass'})
        break;
    }
  }
    
  // the "add" and "remove" icons indicate which div they will remove with a red outline 
  // adding highlighting functionallity
  handleMouseOver = (e) => {
    let tooltip = e.target.previousSibling;
    let optionDiv = document.getElementById('nameDiv');
    optionDiv.style.border = '4px solid red';
    tooltip.style.visibility = 'visible'
  } 
  handleMouseLeave = (e) => {
    let tooltip = e.target.previousSibling;
    let optionDiv = document.getElementById('nameDiv');
    tooltip.style.visibility = 'hidden';
    optionDiv.style.border = '4px solid floralwhite';
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

  // 1 function to handle multiple inputs and dropdowns
  handleChange = e => { 
    let { scopeObject, updateScopeObject, option } = this.props;
    // type is either type, interfaces, annotations, superclass 
    // isArray is important to differentiate between an array key
    // index is for the position in the array, it it's an array
    let type = e.target.name;
    let index = e.target.id;
    let isArray = undefined;
    if (option === 'interfaces' || option === 'annotations') isArray=true;

    // the scopeObject is at the target key an array (e.x interfaces) and must be handled like one
    if(isArray) scopeObject[option][index][type] = e.target.value;
    // the scopeObject is at the target key not an array (type, superclass)
    if(!isArray) scopeObject[option][type] = e.target.value;

    let scopeName = scopeObject.scopeName; // not needed? dunno
    updateScopeObject(scopeName, scopeObject)
  }

  // the item can be inside an array (interfaces)
  // the item can be not inside an array (type, superclass)
  // index is not undefined if the option is an array
  deleteItem = (e) => {
    let { scopeObject, updateScopeObject, option } = this.props;
    let index = e.target.id;
    let isArray = undefined;
    if (index) { isArray=true};

    // removing the element out of the scopeObject
    if ( isArray) {
      let targetArray = scopeObject[option];
      targetArray.splice(index,1);

      // when the array gets empty, we remove the whole option out of the scopeObject
      if (targetArray.length < 1 ) {
        delete scopeObject[option];
      } else {
        // updating the targetarray in the scopeObject;
        scopeObject[option] = targetArray;
      }
    }

    if ( !isArray ) {
      delete scopeObject[option];
    }


    // updating the scopeObject
    let scopeName = scopeObject.scopeName;
    updateScopeObject(scopeName, scopeObject)
  }

  // removing an option means to delete the corresponding key in scopeObject(type, interface, superclass )
  // TODO: anootation can be passed as option, but is only a nested key of type and interfaces
  removeOption = () => {
    let { scopeObject, updateScopeObject, option } = this.props;
    delete scopeObject[option];

    // updating the scopeObject
    let scopeName = scopeObject.scopeName;
    updateScopeObject(scopeName, scopeObject)
  }

  // div, which contains an item for an option
  itemTemplate = (entry, index) => {
    const { type } = this.state;
    const background_bigDiv = "lightsteelblue";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "#fa9581";
    const background_middleDiv = "#8bacbd"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "whitesmoke";
    const color_elementSchrift = "whitesmoke";

    // data
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
      <div style={{display: 'inline-flex',  marginBottom: '5px', position:'relative', background: background_middleDiv, padding: '10px 30px 0px 10px', borderRadius:'10px'}}>
        <p style={{ color: color_elementSchrift}}> The {type} </p>
        <Dropdown name='matcher-mode' id={index} style={{marginLeft:'10px', fontSize: '13px',  position: 'relative', height:'35px', bottom: '-5px'}} value={entry['matcher-mode']} options={dropdownOptions} onChange={this.handleChange} placeholder="EQUALS_FULLY"/>
        <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
        <InputText name='name' id={index} style={{ textAlign: 'middle', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={entry.name} onChange={this.handleChange} />
        <i name='name' id={index}  onMouseOver={this.handleItemRemoveOver} onMouseLeave={this.handleItemRemoveLeave} onClick={this.deleteItem} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"/>
      </div>
    )
  }

  render(){
    const { upperText, type } = this.state;
    const { scopeObject, option } = this.props;
    
    const background_bigDiv = "lightsteelblue";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "#fa9581";
    const background_middleDiv = "#8bacbd"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "whitesmoke";
    const color_elementSchrift = "whitesmoke";

    // xml parse, ( detects which option gets the "first" status, and the other will get the text "additionally")
    let checkIfFirstElement = 'names';
    let editingScope = false;

    const divStyle = { padding: '5px 10px 0 10px' ,height:'30px',  background: background_uberSchriftDiv, width: 'fit-content', outline:'', marginBottom: '15px', borderRadius: '10px' };
    const pStyle = { color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px' };
// {scopeObject && scopeObject.names && (  important
    return(
      <React.Fragment> 
        {scopeObject[option] && (
          <React.Fragment>
            <div id='nameDiv' style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, borderRadius: '10px' , border: '4px solid floralwhite'}}>
              { !editingScope && (
                <div style={{...divStyle}}>
                  <p style={{ ...pStyle}}>I want to target the classes that {upperText} </p>
                </div>  
              )}
              { editingScope && scopeObject && scopeObject[option] && (
                <div style={{...divStyle}}>
                  <p style={{ ...pStyle}}>The classes must {upperText} </p>
                </div>
              )}
              <div style={{display: 'inline-grid'}}>
                {/* itemTemplate */}
                { scopeObject[option] && Array.isArray(scopeObject[option]) && scopeObject[option].map((entry,index) => 
                  this.itemTemplate(entry,index)
                )}
                { scopeObject[option] && !Array.isArray(scopeObject[option]) && this.itemTemplate(scopeObject[option])}
              </div>
            </div>
            <div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '5px',}}>
              <p style={{ visibility: 'hidden' , color:'red', position:'absolute', right:'35px', marginTop:'-3px'}}> remove this option </p>
              <i onClick={this.removeOption} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default ClassMatcherName;