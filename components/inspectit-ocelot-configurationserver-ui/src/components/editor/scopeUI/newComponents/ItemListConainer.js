
class ItemListContainer extends React.Component {

  render() {
    const { scopeObject } = this.props;
    
    return (
      <React.Fragment>
        { scopeObject[optionType].map( (element, index) => 
          <Item index={index} item={element} optionType={optionType} selectorType={selectorType} />
        )}
      </React.Fragment>
    )
  }

}

export default ItemListContainer;