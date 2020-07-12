import ItemContainer from "./ItemContainer";

// interface, type, superclass, method ebene
function SelectorContainer({scopeObject, onUpdate}) {
  return (
    <React.Fragment>
      <h4> The classes must fullfill all of the following entrys: </h4>
      { Object.keys(scopeObject).map( (optionType, selectorContainerIndex) => 
        <React.Fragment> 
        {/* HINT: selectorContainerIndex is used within the upperheader to visualize the ... and releation between the optionTypes */}
        {optionType !== 'methods' && <ItemContainer onUpdate={onUpdate} item={scopeObject} optionType={optionType} selectorType={'Class'} selectorContainerIndex={selectorContainerIndex}/>}
        {optionType === 'methods' && <ItemContainer onUpdate={onUpdate} item={scopeObject} optionType={optionType} selectorType={'Class'} selectorContainerIndex={selectorContainerIndex}/>}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default SelectorContainer;