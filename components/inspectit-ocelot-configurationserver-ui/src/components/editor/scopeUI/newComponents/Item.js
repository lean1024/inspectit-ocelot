import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';

import NameSelector from "./NameSelector";
import LowerHeader from "./LowerHeader";
import AnnotationContainer from './AnnotationContainer';
import deepCopy from 'json-deep-copy';

import {SplitButton} from 'primereact/splitbutton';
import { getSplitButtonsItems , enableCreateAttributeWithinSplitItemEntries} from './utils/splitButtonItems/getSplitButtonItems';
import { invalidActions, splittButtonItemIsInvalid, adjustInvalidSplitButtonItem } from './utils/splitButtonItems/invalidLabelsTopDown';

class Item extends React.Component {
  state = { splitMenuItems: [] }

  componentBorderRef = React.createRef();

  componentWillMount() {
    const {parentAttribute, item } = this.props;
    
    // let updated_SplitButtonItems = this.updated_SplitButtonItems();
    // this.setState({splitButtonItems: updated_SplitButtonItems})
  }

  // updated_SplitButtonItems = () => {
  //   const {parentAttribute, item } = this.props;
  //   let updatedSplittButtonArray =  getSplitButtonsItems(parentAttribute, item);
  //   if( updatedSplittButtonArray ) updatedSplittButtonArray.map(json => json.command = this.addAttribute) ;
  //   return updatedSplittButtonArray;
  // }

  // funktionalität 
  addAttribute = () => {
    // parentAttribute is not used, but here to illustrate what is happening between the parentAttribute and its new attribute
    const {parentAttribute, item, onUpdate } = this.props;
    let updatedItem = deepCopy(item);  // parentAttribute => 'interface' | item => {name: ..., matcher-mode: ... } 
    // adding now annotations
    
    let genericAttribute = 'annotations'
    let genericExampleEntry = [{ name: '' , ['matcher-mode']: 'EQUALS_FULLY' }];
    updatedItem[genericAttribute] = genericExampleEntry;
    alert('heha')
    onUpdate(updatedItem);
  }

  handleMouseOver = (e) => {
    let tooltip = e.target.previousSibling;
    tooltip.style.visibility = 'visible'
    const element = this.componentBorderRef.current
    element.style.border = '1px solid transparent';
    element.style.boxShadow = '0 0 0 3px red';
  } 

  handleMouseLeave = (e) => {
    let tooltip = e.target.previousSibling;
    tooltip.style.visibility = 'hidden';
    const element = this.componentBorderRef.current
    element.style.border = '1px solid black';
    element.style.boxShadow = '';
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




  createSplitButtonItems = () => {
    const { parentAttribute, item, onUpdate } = this.props; 
    let splittButtonItems = getSplitButtonsItems(parentAttribute, item); // .command key must be added + item must be passed to createAttribute
    splittButtonItems = enableCreateAttributeWithinSplitItemEntries(splittButtonItems, item, onUpdate);
    
    // adjusting the single items
    splittButtonItems.map(splittButtonItem => {
      const invalidActionJson = splittButtonItemIsInvalid(item, splittButtonItem)  // returns object with required information for the following actions or false
      console.log('xuxa')
      console.log(invalidActionJson);
      if(invalidActionJson) splittButtonItem = adjustInvalidSplitButtonItem(splittButtonItem, invalidActionJson);
    })

    return splittButtonItems;
  }

  render() {
    const background_bigDiv = "#EEEEEE";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "white";
    const background_middleDiv = "white"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "darkslategrey";
    const color_elementSchrift = "black";



    const { item, parentAttribute, index, onUpdate } = this.props;
    // const { splitButtonItems } = this.state;

    // The Class must implement all of the following interfaces

    // The Interface must { have a name } 
    // The interface must { an annotation } which [ fully equals ] the term [  ] ;

    let entry = item;
    let editingScope = false;

    let optionText;
    parentAttribute === 'interfaces' ? optionText = 'The interface has a name' : optionText = 'has a name';

    const splitButtonItems = this.createSplitButtonItems();

    return (
      <div>
        <div ref={this.componentBorderRef} style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, borderRadius: '10px' , border: '1px solid black'}}>
          {parentAttribute !== 'interfaces' && <LowerHeader optionType={parentAttribute} />}
          <NameSelector onUpdate={onUpdate} style={{background: 'yellow'}} item={item} index={index} optionText={optionText} optionType={parentAttribute} />
          {item.annotations && <AnnotationContainer onUpdate={this.onUpdateAnnotations} items={item.annotations} optionType={parentAttribute} />}
          <SplitButton tooltip="TODO: tooltip? or not" style={{position:'absolute', top:'10px' , right:'10px'}} label="add " icon="pi pi-plus" onClick={this.save} model={splitButtonItems}></SplitButton>
        </div>
        
        <div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '5px',}}>
          <p style={{ visibility: 'hidden' , color:'red', position:'absolute', right:'35px', marginTop:'-3px'}}> remove this option </p>
          <i data-tobehighlighted={parentAttribute} onClick={this.removeOption} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
        </div>




      </div>
    )
  }

}

export default Item;