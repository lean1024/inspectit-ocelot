import ItemContainer from "./ItemContainer";

class SelectorContainer extends React.Component {

  render() {
    const { scopeObject } = this.props;
    
    return (
      <React.Fragment>
        <ItemContainer scopeObject={scopeObject} optionType={'type'} selectorType={'Class'} />
        <ItemContainer scopeObject={scopeObject} optionType={'interfaces'} selectorType={'Class'} />
        <ItemContainer scopeObject={scopeObject} optionType={'superclass'} selectorType={'Class'}/>
      </React.Fragment>
    )
  }

}

export default SelectorContainer;