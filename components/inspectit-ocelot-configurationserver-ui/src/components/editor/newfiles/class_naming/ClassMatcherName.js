import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import { connect } from 'react-redux';


class ClassMatcherName extends React.Component {
    // state 
    // classMatcherObject                { names: {}, interfaces:{}, annotations:{}, superclasses:{} }
    // checkIfFirstElement      "I want to target [0],  Additionally those must have [!0]"

  state = { hoveredItem: undefined };

  componentDidMount(){
    document.addEventListener('keydown', (e) => e.key=='f' && console.log(this.props))
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
    console.log(this.state)
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
    
  render(){
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

    const { classMatcherObject } = this.props;
    // const classMatcherObject = {
    //   names: {
    //       0: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
    //       1: {matcherMode: 'STARTS_WITH', term: "prefix"},
    //       2: {matcherMode: 'ENDS_WITH', term: "suffix"},
    //   },
    //   interfaces: {
    //       0: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
    //       1: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
    //       2: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
    //   },
    //   annotations: {
    //       0: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
    //       1: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
    //       2: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
    //   },
    //   superclasses:{
    //       0: {matcherMode: 'EQUALS_FULLY', term: "yourService"},
    //   }
    // }

    // xml parse, ( detects which option gets the "first" status, and the other will get the text "additionally")
    const checkIfFirstElement = ['name', 'interface', 'annotation', 'superclass'];
    return(
      <React.Fragment> 
      {classMatcherObject && classMatcherObject.names && (
          <React.Fragment>
            <div id='nameDiv' style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
              {checkIfFirstElement[0] === 'name' && (
                <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'85px', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                  <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>I want to target the classes that have a specific class name</p>
                </div>  
              )}
              {checkIfFirstElement[0] !== 'name' && (
                <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'85px', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                  <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>Additionally those classes must have a specific class name</p>
                </div>
              )}
              { Object.keys(classMatcherObject.names).map(entry =>
              <React.Fragment>
                <div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background: background_middleDiv, padding: '15px 30px 15px 15px', borderRadius:'10px'}}>
                  <p style={{ color: color_elementSchrift}}> The wanted name of the class </p>
                  <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={classMatcherObject.names[entry].matcherMode} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
                  <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
                  <InputText style={{ textAlign: 'middle', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={classMatcherObject.names[entry].term} onChange={(e) => this.setState({value: e.target.value})} />
                  <i onMouseOver={this.handleItemRemoveOver} onMouseLeave={this.handleItemRemoveLeave} onClick={this.handleClick} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
                </div>
              </React.Fragment>
              )}
            <div style={{ display:'flex', padding: '25px' , height:'85px', outline:'',  marginBottom: '15px',  width:'712px' , borderRadius:'10px', border: `2px solid ${background_middleDiv}`}}>
              <i onMouseOver={this.handleAddItemOver} onMouseLeave={this.handleAddItemLeave} onClick={this.handleClick} style={{ position: '', bottom:'', left: '', fontSize:'30px',  color:'whitesmoke'}} className="pi pi-plus-circle"></i>
              <p style={{visibility:'hidden', position:'relative', bottom:'15px', marginLeft:'25px', color:'ghostwhite', fontSize:'18px'}}> add additional constrain that the class name must match</p>
            </div>
            </div>
            <div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '25px',}}>
              <p style={{ visibility: 'hidden' , color:'red', position:'absolute', right:'35px', marginTop:'-3px'}}> remove this option </p>
              <i onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
            </div>
          </React.Fragment>
        )}
      
        {/* {classMatcherObject && classMatcherObject.names && checkIfFirstElement[0] !== 'name' && (
          <React.Fragment>
            <div  id='nameDiv'style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
              <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'85px', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>Additionally those classes must have a specific class name</p>
              </div>
              { Object.keys(classMatcherObject.names).map(entry =>
              <React.Fragment>
                <div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background: background_middleDiv, padding: '15px 30px 15px 15px', borderRadius:'10px'}}>
                  <p style={{ color: color_elementSchrift}}> The wanted name of the class </p>
                  <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={classMatcherObject.names[entry].matcherMode} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
                  <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
                  <InputText style={{textAlign: 'middle', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={classMatcherObject.names[entry].term} onChange={(e) => this.setState({value: e.target.value})} />
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
  const { classMatcherObject } = state.configuration;
  return {
    classMatcherObject,
  }
};

ClassMatcherName.defaultProps = {
  classMatcherObject: undefined
};

export default connect(mapStateToProps)(ClassMatcherName);