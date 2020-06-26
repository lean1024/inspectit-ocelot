import Zeile from "./Zeile";

class AnnotationContainer extends React.Component {



  render() {
    const { items, optionType,  } = this.props;
    
    return (
      <React.Fragment>
        {items.map( (annotationItem, index) => 
          <Zeile item={annotationItem} index={index} optionText={'have an annotation'}/>
        )}
      </React.Fragment>
    )
  }

}

export default AnnotationContainer;