import ItemContainer from "./ItemContainer";

class SelectorContainer extends React.Component {

  groupIsAttributesIntoArray = () => {} 

  componentWillMount() {

  }

  render() {
    const { scopeObject, updateScopeObject } = this.props;
    
    return (
      // <React.Fragment>
      //   <ItemContainer scopeObject={scopeObject} optionType={'type'} selectorType={'Class'} />
      //   <ItemContainer scopeObject={scopeObject} optionType={'interfaces'} selectorType={'Class'} />
      //   <ItemContainer scopeObject={scopeObject} optionType={'superclass'} selectorType={'Class'}/>
      // </React.Fragment>
      <React.Fragment>
        <h4> The classes must fullfill all of the following entrys: </h4>
        
        { Object.keys(scopeObject).map( (optionType, selectorContainerIndex) => 
          <React.Fragment> 
          {/* HINT: selectorContainerIndex is used within the upperheader to visualize the ... and releation between the optionTypes */}
          {optionType !== 'methods' && <ItemContainer onUpdate={updateScopeObject} item={scopeObject} optionType={optionType} selectorType={'Class'} selectorContainerIndex={selectorContainerIndex}/>}
          {optionType === 'methods' && <ItemContainer onUpdate={updateScopeObject} item={scopeObject} optionType={optionType} selectorType={'Class'} selectorContainerIndex={selectorContainerIndex}/>}
          </React.Fragment>
        )}
        {/* <ItemContainer scopeObject={scopeObject} optionType={'type'} selectorType={'Class'} />
        <ItemContainer scopeObject={scopeObject} optionType={'interfaces'} selectorType={'Class'} />
        <ItemContainer scopeObject={scopeObject} optionType={'superclass'} selectorType={'Class'}/> */}
      </React.Fragment>
    )
  }

}

export default SelectorContainer;