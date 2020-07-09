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
          optionType !== 'methods' && <ItemContainer updateScopeObject={updateScopeObject} scopeObject={scopeObject} optionType={optionType} selectorType={'Class'} selectorContainerIndex={selectorContainerIndex}/>
        )}
        {/* <ItemContainer scopeObject={scopeObject} optionType={'type'} selectorType={'Class'} />
        <ItemContainer scopeObject={scopeObject} optionType={'interfaces'} selectorType={'Class'} />
        <ItemContainer scopeObject={scopeObject} optionType={'superclass'} selectorType={'Class'}/> */}
      </React.Fragment>
    )
  }

}

export default SelectorContainer;