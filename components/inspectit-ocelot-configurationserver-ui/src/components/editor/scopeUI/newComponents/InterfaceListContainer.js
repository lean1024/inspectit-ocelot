import UpperHeader from "./UpperHeader";
import Item from "./Item";
import LowerHeader from "./LowerHeader";

// Either the container displays a single <Item> or an List of <Item>
class InterfaceListContainer extends React.Component {
  state={annotationArrays:[]}

  // das Item muss sich nicht um den Index kümmern 
  // onItemDelete 
  // 
  // 
  // [   {}   ,  {} ,   {}   , {}   ]

  onUpdateListItem = ( updatedValue , index ) => {
    let { onUpdate, items } = this.props;
    let updatedItems = items;

    if ( Object.keys(updatedValue).length == 0) { // the { } updatedValue is empty, thus it can be removed from the array 
      updatedItems = updatedItems.filter( (item, filterIndex ) => {
        if (filterIndex !== index ) return item;
      })
    } else { // updatedValue is not empty, and must be modified within the index postion in the array
      updatedItems[index] = updatedValue;
    }
    onUpdate(updatedItems);
  }

  render() {
    // parent attribute = 'interfaces'
    const { items, parentAttribute, selectorType, selectorContainerIndex } = this.props;
 
    return (
      <React.Fragment>
        <div data-optiontype={parentAttribute} style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: '#EEEEE', borderRadius: '10px' , border: '1px solid black'}}>
          <LowerHeader optionType={parentAttribute} />
          { items.map( (element, index) => 
            <Item onUpdate={(updateObj) => this.onUpdateListItem(updateObj, index)} index={index} item={element} parentAttribute={parentAttribute} selectorType={selectorType} />
          )}

        </div>
      </React.Fragment>
    )
  }

}

export default InterfaceListContainer;