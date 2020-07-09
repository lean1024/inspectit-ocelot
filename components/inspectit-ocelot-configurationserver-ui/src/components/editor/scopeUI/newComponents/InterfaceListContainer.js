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
    let { onItemUpdate, items } = this.props;
    let updated_items = items;

    // onUpdate wird in anschluss delete gerufen
    if ( Object.keys(updatedValue).length == 0) {
      // TODO: filter 
    } else { // onUpdate wird in aktuallsierung aufgerufen
      updated_items[0] = updatedValue;
    }

    onItemUpdate(updated_items);
  }

  render() {
    const { items, optionType, selectorType, selectorContainerIndex , onItemUpdate} = this.props;
 
    return (
      <React.Fragment>
        <div data-optiontype={optionType} style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: '#EEEEE', borderRadius: '10px' , border: '1px solid black'}}>
          <LowerHeader optionType={optionType} />
          { items.map( (element, index) => 
            <Item onItemUpdate={  (updateObj) => this.onUpdateListItem(updateObj, index)} index={index} item={element} optionType={optionType} selectorType={selectorType} />
          )}

        </div>
      </React.Fragment>
    )
  }

}

export default InterfaceListContainer;