import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';


class ClassMatcherName extends React.Component {
    // state 
    // scopeObject                { names: {}, interfaces:{}, annotations:{}, superclasses:{} }
    // checkIfFirstElement      "I want to target [0],  Additionally those must have [!0]"

  state = { hoveredItem: undefined };

  componentWillMount(){
    const { option } = this.props;
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
  // handleItemRemoveLeave =  (e) => e.target.parentElement.style.boxShadow = '0 0 0 3px red'

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
    let type = e.target.name;
    let index = e.target.id;
    console.log('')
    console.log('')
    console.log('')
    console.log('scopeObject',scopeObject)
    scopeObject[option][index][type] = e.target.value;
    let scopeName = scopeObject.scopeName;
    updateScopeObject(scopeName, scopeObject)
  }

  deleteItem = (e) => {
    let { scopeObject, updateScopeObject, option } = this.props;
    let index = e.target.id;

    // removing the element
    let targetArray = scopeObject[option];
    targetArray.splice(index,1);

    // removing option, if empty
    if (targetArray.length < 1 ) {
      delete scopeObject[option];
    } else {
      // updating the targetarray in the scopeObject;
      scopeObject[option] = targetArray;
    }


    // updating the scopeObject
    let scopeName = scopeObject.scopeName;
    updateScopeObject(scopeName, scopeObject)
  }

  removeOption = () => {
    let { scopeObject, updateScopeObject, option } = this.props;
    delete scopeObject[option];

    // updating the scopeObject
    let scopeName = scopeObject.scopeName;
    updateScopeObject(scopeName, scopeObject)
  }

  render(){
    // const { scopeObject } = this.state;
    const { upperText, type } = this.state;
    const { scopeObject, option } = this.props;
    console.log('')
    console.log('')
    console.log('ClassMatcherName scopeObject', scopeObject)
 

  // data
    const citySelectItems = [
        {label: 'EQUALS_FULLY', value: 'EQUALS_FULLY'},
        {label: 'STARTS_WITH', value: 'STARTS_WITH'},
        {label: 'STARTS_WITH_IGNORE_CASE', value: 'STARTS_WITH_IGNORE_CASE'},
        {label: 'CONTAINS', value: 'CONTAINS'},
        {label: 'CONTAINS_IGNORE_CASE', value: 'CONTAINS_IGNORE_CASE'},
        {label: 'ENDS_WITH', value: 'ENDS_WITH'},
        {label: 'ENDS_WITH_IGNORE_CASE', value: 'ENDS_WITH_IGNORE_CASE'},
    ];
    
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
// {scopeObject && scopeObject.names && (  important
    return(
      <React.Fragment> 
      
{scopeObject[option] && (
          <React.Fragment>
            <div id='nameDiv' style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, borderRadius: '10px' , border: '4px solid floralwhite'}}>
              { !editingScope && (
                <div style={{padding: '5px 10px 0 10px' ,height:'30px',  background: background_uberSchriftDiv, width: 'fit-content', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                  <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>I want to target the classes that {upperText} </p>
                </div>  
              )}
              { !editingScope && checkIfFirstElement !== 'names'  && (
                <div style={{padding: '5px 10px 0 10px' ,height:'30px',  background: background_uberSchriftDiv, width: 'fit-content', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                  <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>Additionally those classes must have a specific class name</p>
                </div>
              )}
              { editingScope && scopeObject && scopeObject[option] && (
                <div style={{padding: '5px 10px 0 10px' ,height:'30px',  background: background_uberSchriftDiv, width: 'fit-content', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                  <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>The classes must {upperText} </p>
                </div>
              )}
              <div style={{display: 'inline-grid'}}>
                {/* { scopeObject && scopeObject[option] && scopeObject[option].map((entry, index) =>               Für Interfaces, Annotations, immer eine Liste 
                <React.Fragment>
                  <div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background: background_middleDiv, padding: '15px 30px 15px 15px', borderRadius:'10px'}}>
                    <p style={{ color: color_elementSchrift}}> The class name</p>
                    <Dropdown name='matcherMode' id={index} style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={entry.matcherMode} options={citySelectItems} onChange={this.handleChange} placeholder="EQUALS_FULLY"/>
                    <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
                    <InputText name='term' id={index} style={{ textAlign: 'middle', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={entry.term} onChange={this.handleChange} />
                    <i onMouseOver={this.handleItemRemoveOver} onMouseLeave={this.handleItemRemoveLeave} onClick={this.handleClick} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
                  </div>
                </React.Fragment>
                )} */}

                { Array.isArray(scopeObject[option]) && eigeneFunction }

                { scopeObject[option] && scopeObject[option].map((entry,index) => 
                  <div style={{display: 'inline-flex',  marginBottom: '5px', position:'relative', background: background_middleDiv, padding: '10px 30px 0px 10px', borderRadius:'10px'}}>
                    <p style={{ color: color_elementSchrift}}> The {type} </p>
                    <Dropdown name='matcher-mode' id={index} style={{marginLeft:'10px', fontSize: '13px',  position: 'relative', height:'35px', bottom: '-5px'}} value={entry['matcher-mode']} options={citySelectItems} onChange={this.handleChange} placeholder="EQUALS_FULLY"/>
                    <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
                    <InputText name='name' id={index} style={{ textAlign: 'middle', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={entry.name} onChange={this.handleChange} />
                    <i name='name' id={index}  onMouseOver={this.handleItemRemoveOver} onMouseLeave={this.handleItemRemoveLeave} onClick={this.deleteItem} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"/>
                  </div>
                )}
              </div>
              {/* <div style={{ display:'flex', padding: '25px' , height:'80px', outline:'',  marginBottom: '5px',  width:'588px' , borderRadius:'10px', border: `2px solid ${background_middleDiv}`}}>
                <i onMouseOver={this.handleAddItemOver} onMouseLeave={this.handleAddItemLeave} onClick={this.handleClick} style={{ position: '', bottom:'', left: '', fontSize:'30px',  color:'whitesmoke'}} className="pi pi-plus-circle"></i>
                <p style={{visibility:'hidden', position:'relative', bottom:'15px', marginLeft:'25px', color:'ghostwhite', fontSize:'18px'}}> add additional constrain that the class name must match</p>
              </div> */}
            </div>
            <div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '5px',}}>
              <p style={{ visibility: 'hidden' , color:'red', position:'absolute', right:'35px', marginTop:'-3px'}}> remove this option </p>
              <i onClick={this.removeOption} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
            </div>
          </React.Fragment>
        )}
      
        {/* {scopeObject && scopeObject.names && checkIfFirstElement[0] !== 'name' && (
          <React.Fragment>
            <div  id='nameDiv'style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
              <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'85px', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>Additionally those classes must have a specific class name</p>
              </div>
              { Object.keys(scopeObject.names).map(entry =>
              <React.Fragment>
                <div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background: background_middleDiv, padding: '15px 30px 15px 15px', borderRadius:'10px'}}>
                  <p style={{ color: color_elementSchrift}}> The wanted name of the class </p>
                  <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={scopeObject.names[entry].matcherMode} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
                  <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
                  <InputText style={{textAlign: 'middle', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={scopeObject.names[entry].term} onChange={(e) => this.setState({value: e.target.value})} />
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
        )} */}
       
        </React.Fragment>
      )
    }
}

function mapStateToProps(state) {
  // const { scopeObject } = state.configuration;
  // return {
  //   scopeObject,
  // }
};

ClassMatcherName.defaultProps = {
  
};

export default connect(mapStateToProps)(ClassMatcherName);