
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import deepCopy from 'json-deep-copy';


class NameSelector extends React.Component {
  state = { optionTypeText: undefined}


  componentWillMount(){
    // const { optionType } = this.props;

    // switch(optionType) {
    //   // class option types
    //     case 'type':
    //       this.setState({optionTypeText: 'class name'});
    //       break;
    //     case 'interfaces':
    //       this.setState({ optionTypeText: 'interface'}) 
    //       break;
    //   // TODO: case annotation ? oder annotations plural
    //     case 'annotation':
    //       this.setState({ optionTypeText: 'annotation'})
    //       break;
    //     case 'superclass':
    //       this.setState({ optionTypeText: 'superclass'})
    //       break;
  
    //   // method option types
    //     case 'name':
    //       this.setState({optionTypeText: 'method name'})
    //       break;
    //     case 'visibility':
    //       this.setState({ optionTypeText: 'visibility'}) 
    //       break;
    //     // TODO: case annotation ? oder annotations plural
    //     case 'annotation':
    //       this.setState({optionTypeText: 'annotation'})
    //       break;
    //     case 'arguments':
    //       this.setState({optionTypeText: 'arguments'})
    //       break;
    //   }
  }

  // generisch attribute ( parameter 1 ist der OptionType , new Value)

  // onUpdate wird für input (attribute = name) und dropdown (attribute = matcher-mode) aufgerufen , newValue ist der Wert 
  // deepCopy um ein zu seperieren von config object, und dieses nicht mitzumodifizieren.
  
  onUpdate = (attribute, newValue) => {
    const { item, onUpdate } = this.props;
    const updated_item = deepCopy(item);
    updated_item[attribute] = newValue;
    onUpdate(updated_item);
  }


  // the item can be inside an array (interfaces)
  // the item can be not inside an array (type, superclass)
  // index is not undefined if the optionType is an array
  deleteItem = (e) => {
    let { item, onUpdate, optionType, attributesToDelete } = this.props;

    // Notziz diese Komponente ändert nur 2 Attribute Vorteil 
    let copiedItem = cloneDeep(item);  // alle anderen Attribute noch drinnen haben, annotations aber unberührt 


    // smart deletion of the keys
    delete copiedItem['name'];
    delete copiedItem['matcher-mode'];

    // notizen 
            // superclass { annotations } 
            // annotations [ , , , , , ];
    

    // { superclass , type , interface }                     // updatedValue { }            

    onUpdate(copiedItem)

    // delete scopeObject[optionType];


    // // removing the element out of the scopeObject
    // if ( isArray) {
    //   let targetArray = scopeObject[optionType];
    //   targetArray.splice(index,1);

    //   // when the array gets empty, we remove the whole optionType out of the scopeObject
    //   if (targetArray.length < 1 ) {
    //     delete scopeObject[optionType];
    //   } else {
    //     // updating the targetarray in the scopeObject;
    //     scopeObject[optionType] = targetArray;
    //   }
    // }

    // if ( !isArray ) {
    //   delete scopeObject[optionType];
    // }


    // updating the scopeObject
    // let scopeName = scopeObject.scopeName;
    // updateScopeObject(scopeName, scopeObject)
  }

  render() {

    const background_bigDiv = "#EEEEEE";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "white";
    const background_middleDiv = "white"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "darkslategrey";
    const color_elementSchrift = "black";

    const { item, index, optionText, onUpdate, optionType } = this.props;
    
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
      <React.Fragment>
        {/* if item.name is not defined the input still got displayed with the last known value, or with a value, thus we check wether a value exist  */}
        { item['matcher-mode'] && ( 
          <div style={{display: 'inline-grid'}}>
            <div style={{display: 'inline-flex',  marginBottom: '5px', position:'relative', background: background_middleDiv, padding: '10px 30px 0px 10px', borderRadius:'10px'}}>
              <p style={{ color: color_elementSchrift}}> ... {optionText}, that </p>
              <Dropdown style={{marginLeft:'10px', fontSize: '13px',  position: 'relative', height:'35px', bottom: '-5px'}} value={item['matcher-mode']} options={dropdownOptions} onChange={(e) => this.onUpdate('matcher-mode', e.value)} placeholder="EQUALS_FULLY"/>
              <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
              <InputText style={{ textAlign: 'middle', width: '250px', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={item.name} onChange={(e) => this.onUpdate('name', e.target.value)} />
              <i name='name' id={index}  onMouseOver={this.handleItemRemoveOver} onMouseLeave={this.handleItemRemoveLeave} onClick={this.deleteItem} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"/>
            </div>
          </div>
        )}
      </React.Fragment>
    )
  }

}

export default NameSelector;