import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';

import NameSelector from "./NameSelector";
import LowerHeader from "./LowerHeader";
import AnnotationContainer from './AnnotationContainer';
import deepCopy from 'json-deep-copy';


class Item extends React.Component {

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

  // superclass: { name - matcher-mode , annotations } 

  // löschen und onChange 
  onUpdateAnnotations = (updatedAnnotations) => {
    const { item , onUpdate } = this.props;
    const updated_item = deepCopy(item);
    if( updatedAnnotations.length === 0) {
       delete updated_item.annotations;
    } else {
      updated_item.annotations = updatedAnnotations;
    }
    onUpdate(updated_item);
  }

  // // Objekt transformieren und zurück transformieren 
  // // generische Schnittstelle 
  // // TODO: obsolete wenn keine generische schnittstelle
  // onUpdateNameSelector = (updatedNameSelector) => {
  //   // Änderungen müssen hier getan werden, name
  //   // name - matcher-mode , annotations unberührt 
  //   // superclass { }   ,  { name, matcher-mode } 
  //   const { item , onItemUpdate } = this.props;
  //   const updated_item = deepCopy(item);
  //   updated_item 

  //   onItemUpdate(updatedItem);
  // }


  render() {
    const background_bigDiv = "#EEEEEE";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "white";
    const background_middleDiv = "white"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "darkslategrey";
    const color_elementSchrift = "black";

    console.log('')
    console.log('')
    console.log('')
    console.log('################## item')
    console.log(item);

    const { item, optionType, selectorType, index, onUpdate } = this.props;

    // The Class must implement all of the following interfaces

    // The Interface must { have a name } 
    // The interface must { an annotation } which [ fully equals ] the term [  ] ;

    let entry = item;
    let editingScope = false;

    let optionText;
    optionType === 'interfaces' ? optionText = 'The interface has a name' : optionText = 'has a name';

    return (
      <div>
        <div data-optiontype={optionType} style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, borderRadius: '10px' , border: '1px solid black'}}>
          {optionType !== 'interfaces' && <LowerHeader optionType={optionType} />}
          <NameSelector onUpdate={onUpdate} style={{background: 'yellow'}} item={item} index={index} optionText={optionText} optionType={optionType} selectorType={selectorType} />
          {item.annotations && <AnnotationContainer onUpdate={this.onUpdateAnnotations} items={item.annotations} optionType={optionType} selectorType={selectorType}/>}
        </div>
        
        <div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '5px',}}>
          <p style={{ visibility: 'hidden' , color:'red', position:'absolute', right:'35px', marginTop:'-3px'}}> remove this option </p>
          <i data-tobehighlighted={optionType} onClick={this.removeOption} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
        </div>




      </div>
    )
  }

}

export default Item;