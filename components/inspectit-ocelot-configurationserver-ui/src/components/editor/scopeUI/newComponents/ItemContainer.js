import UpperHeader from "./UpperHeader";
import Item from "./Item";
import InterfaceListContainer from "./InterfaceListContainer"
import deepCopy from "json-deep-copy";

// Either the container displays a single <Item> or an List of <Item>
class ItemContainer extends React.Component {

  state={annotationArrays:[]}

  componentWillMount () {
    this.setAnnotationArrays
  }

  // updatedValue can be generic, a json {} , or an array [] - we can handle it
  // Following question is to be answered, on how this method can be generic. The goal of this function is (here) to fit in the updatedValue into the scopeObject { interfaces: ..., type: ..., superclass: ..., genericAttribute, ..., )
  // Following operation is to work in a generic way.  item[optionType] - because the updatedValue does not include the optionType we solve this by using Jonas his recursion onUpdate={(updatedValue) => this.onItemUpdate(updatedValue, optionType)} 
  // with this, we can get the correct optionType, into this "onGenericUpdate".
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

  //   updatedValue beschreibt die Inhalte von interfaces, type , superclass
  onItemUpdate = ( updatedValue , optionType ) => {
    let { onUpdate, item } = this.props;
    let updatedScopeObject = deepCopy(item);
    if (Object.keys(updatedValue).length === 0) {
      delete updatedScopeObject[optionType];
    } else {
      updatedScopeObject[optionType] = updatedValue;
    }
    onUpdate(updatedValue); 
  }

  // löschen und onChange 
  onUpdateInteraces = (updatedInterfaces) => {
    const { item , onUpdate } = this.props;
    const updated_item = deepCopy(item);
    if( updatedInterfaces.length === 0) {
        delete updated_item.interfaces;
    } else {
      updated_item.interfaces = updatedInterfaces;
    }
    // this onUpdate takes the whole item and updates it
    onUpdate(updated_item);
  }

  render() {
    const { item, optionType, selectorType, selectorContainerIndex, onUpdate  } = this.props;
    const { annotationArrays } = this.state;
    
    return (
      item[optionType] && (
        <React.Fragment> 
          <UpperHeader selectorType={selectorType} optionType={optionType} selectorContainerIndex={selectorContainerIndex} />
          {/* list of items */}
          { Array.isArray(item[optionType]) && <InterfaceListContainer onUpdate={this.onUpdateInteraces} index={selectorContainerIndex} items={item[optionType]} parentAttribute={optionType} />}

          {/* single item */}
          { !Array.isArray(item[optionType]) && (
            <React.Fragment>
              <Item item={item[optionType]} parentAttribute={optionType} onUpdate={(updatedValue) => this.onGenericUpdate(updatedValue, optionType)}/>
            </React.Fragment>
          )}
        </React.Fragment>
      )
    )
  }

}

export default ItemContainer;