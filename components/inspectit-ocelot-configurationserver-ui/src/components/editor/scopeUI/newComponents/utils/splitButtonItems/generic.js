
  createSplitButtonItems = () => {
    const { parentAttribute, item, onUpdate } = this.props; 
    let splittButtonItems = getSplitButtonsItems(parentAttribute, item); // .command key must be added + item must be passed to createAttribute
    splittButtonItems = this.enableCreateAttributeWithinSplitItemEntries(splittButtonItems);
    
    // adjusting the single items
    splittButtonItems.map(splittButtonItem => {
      if(this.splittButtonItemIsInvalid(splittButtonItem)) splittButtonItem = this.adjustInvalidSplitButtonItem(splittButtonItem);
    })
  }

  // we got generic splitButtonItems, but they are missing the this.props.item information
  // we duplicate the splitButtonItems into updatedSplittButtonItems and pass the item into the createAttribute via the requiered .command key of <SplitButton />
  enableCreateAttributeWithinSplitItemEntries = (splittButtonItems) => {
    const { parentAttribute, item, onUpdate } = this.props; 
    // updatedSplittButtonItems = splittButtonItems ( for each key, but 'createAttribute )
    let updatedSplittButtonItems = [];
    splittButtonItems && splittButtonItems.map(splittItem => {
      let updatedSplitItem = {};
      Object.keys(splittItem).map( key => { 
        // adding required .command key 
        if ( key === 'createAttribute' ) {
          updatedSplitItem.command = (e) => {
            let updatedItem = deepCopy(item);
            updatedItem = splittItem.createAttribute(updatedItem); // passing the required item to createAttribute
            onUpdate(updatedItem)
          }
        } else { // copy
          updatedSplitItem[key] = splittItem[key];
        }
      }) 
      updatedSplittButtonItems.push(updatedSplitItem);
    })
    // result
    return updatedSplittButtonItems;
  }

  // component context is required to know existing item.attributes
  // Iteration through each entry
  splittButtonItemIsInvalid = (splittButtonItem) => {
    const { parentAttribute, item, onUpdate } = this.props; 
    helper_invalidActions.map(invalidAction => {
      if (splittButtonItem.actionId === invalidActionId ) { // eine Action stimmt überrein. Disabele das splitMenuItem, wenn eine restriction verletzt wurde.
        Object.keys(item).map( attribute => {
          if (invalidAttributes.includes(attribute)) {
            // here can happen a set of generic reactions on a specific condition, 
            splittButtonItem =this.adjustSplitButtonItemIfInvalid(splittButtonItem)
          }
        })
      }
    })
    return splittButtonItem;
  }

  adjustInvalidSplitButtonItem = (splittButtonItem) => {
    splittButtonItem.disabled = true,
    splittButtonItem.label = splittButtonItem.invalidLabelText;
    return splittButtonItem;
  }
