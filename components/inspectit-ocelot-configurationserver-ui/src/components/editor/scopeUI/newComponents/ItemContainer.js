import UpperHeader from "./UpperHeader";
import Item from "./Item";
import InterfaceListContainer from "./InterfaceListContainer"

// Either the container displays a single <Item> or an List of <Item>
class ItemContainer extends React.Component {

  state={annotationArrays:[]}

  componentWillMount () {
    this.setAnnotationArrays
  }

  //   updatedValue beschreibt die Inhalte von interfaces, type , superclass
  onItemUpdate = ( updatedValue  ) => {
    let { updateScopeObject, scopeObject } = this.props;
    if (index !== null) {

    } else {

    }
    console.log('ItemContainer - bbb ')
    console.log('ItemContainer - scopeobject', scopeObject, 'optionType', optionType, 'updatedValue', updatedValue);
    scopeObject[optionType] = updatedValue;
    console.log(scopeObject);
    updateScopeObject(scopeObject);
  }

  render() {
    const { scopeObject, optionType, selectorType, selectorContainerIndex, updateScopeObject  } = this.props;
    const { annotationArrays } = this.state;

    console.log('selectorContainerIndex',selectorContainerIndex);

    console.log('')
    console.log('################## item')
    console.log('')
    console.log('selectorType',selectorType);
    
    return (
      scopeObject[optionType] && (
        <React.Fragment> 
          <UpperHeader selectorType={selectorType} optionType={optionType} selectorContainerIndex={selectorContainerIndex} />
          {/* list of items */}
          { Array.isArray(scopeObject[optionType]) && <InterfaceListContainer onItemUpdate={this.onItemUpdate} index={selectorContainerIndex} items={scopeObject[optionType]} optionType={optionType} selectorType={selectorType} />}

          {/* single item */}
          { !Array.isArray(scopeObject[optionType]) && (
            <React.Fragment>
              <Item item={scopeObject[optionType]} optionType={optionType} selectorType={selectorType} onItemUpdate={this.onItemUpdate}/>
            </React.Fragment>
          )}
        </React.Fragment>
      )
    )
  }

}

export default ItemContainer;