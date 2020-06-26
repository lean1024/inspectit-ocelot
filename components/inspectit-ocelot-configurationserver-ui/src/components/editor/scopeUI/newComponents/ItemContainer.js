import Header from "./Header";
import Item from "./Item";

// Either the container displays a single <Item> or an List of <Item>
class ItemContainer extends React.Component {

  state={annotationArrays:[]}

  componentWillMount () {
    this.setAnnotationArrays
  }

  setAnnotationArrays = () => {
    const { scopeObject } = this.props;
    let interfaceAnnotationArray = [];
    let typeAnnotationArray = [];
    let superclassAnnotationArray = [];

    scopeObject.interfaces && scopeObject.interfaces.map(entry => {
      if ( entry.annotations ) {
        entry.annotations.map(json => {
          interfaceAnnotationArray.push(json);
        })
      }
    })

    co

    scopeObject.type && scopeObject.type.annotations && (typeAnnotationArray = scopeObject.type.annotations );
    scopeObject.superclass && scopeObject.superclass.annotations && ( superclassAnnotationArray  = scopeObject.superclass.annotations );

    this.setState({ annotationArrays: { interfaces: interfaceAnnotationArray , type: typeAnnotationArray, superclass: superclassAnnotationArray}}, () => console.log( 'hereLLL', this.state.annotationArrays));
  }

  render() {
    const { scopeObject, optionType, selectorType } = this.props;
    const { annotationArrays } = this.state;

    console.log('aannotationArrays',annotationArrays);

    console.log('')
    console.log('################## item')
    console.log('')
    console.log('selectorType',selectorType);
    
    return (
      scopeObject[optionType] && (
        <React.Fragment> 
          {/* <Header selectorType={selectorType} optionType={optionType} /> */}
          {/* list of items */}
          { Array.isArray(scopeObject[optionType]) && (
            <React.Fragment>
              { scopeObject[optionType].map( (element, index) => 
                <Item index={index} item={element} optionType={optionType} selectorType={selectorType} annotationArrays={annotationArrays} />
              )}
            </React.Fragment>
          )}

          {/* single item */}
          { !Array.isArray(scopeObject[optionType]) && (
            <Item item={scopeObject[optionType]} optionType={optionType} selectorType={selectorType} />
          )}
        </React.Fragment>
      )
    )
  }

}

export default ItemContainer;