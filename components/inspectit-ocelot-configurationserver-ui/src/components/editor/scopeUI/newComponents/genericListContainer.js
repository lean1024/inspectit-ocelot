

// parent attribute = 'interfaces', type, superclass, method, or anything
function GenericListContainer( {items, parentAttribute, onUpdate,} ) {

  const onUpdateListItem = ( updatedValue , index ) => {
    let updatedItems = items;

    if ( Object.keys(updatedValue).length == 0) { 
      // the { } updatedValue is empty, thus it can be removed from the array 
      updatedItems = updatedItems.filter( (item, filterIndex ) => {
        if (filterIndex !== index ) return item;
      })
    } else { 
      // updatedValue is not empty, and must be modified within the index postion in the array
      updatedItems[index] = updatedValue;
    }
    onUpdate(updatedItems);
  }

  return (
    <React.Fragment>
      { this.children}
    </React.Fragment>
  )
}

export default GenericListContainer;