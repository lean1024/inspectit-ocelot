import SimpleTemplate from "./SimpleTemplate";

class SimpleFrameComponent extends React.Component {
  state = { hoveredItem: undefined , itemTemplate: undefined, cities: [] , annotationArrays: undefined };

  // the generic component needs to be specified. Setting up the text here.
  componentWillMount(){
    this.setAnnotationArrays();

    console.log('updateScopeObject2',this.props.updateScopeObject)

    const { optionType, selectorType } = this.props;

    switch(selectorType) {
      case 'Class':
        this.setState({selectorTypeText: 'classes'})
        break;
      case 'Method':
        this.setState({selectorTypeText: 'methods'})
    }

    // optionType will either be type, superclass, annotations, interfaces
    // since this component will be used for every optionType the written text should be adjusted



    // info# why do i introduce optionTypeText? This component should display the "optionType". The optionType for class name is
    // type. This cant be a text, so the component needs to re-write the text to "class name".
    switch(optionType) {
    // class option types
      case 'type':
        this.setState({upperText: `have a specific class name`, optionTypeText: 'class name'});
        break;
      case 'interfaces':
        this.setState({upperText: 'implement an interface', optionTypeText: 'interface'}) 
        break;
    // TODO: case annotation ? oder annotations plural
      case 'annotation':
        this.setState({upperText: 'have an annotation', optionTypeText: 'annotation'})
        break;
      case 'superclass':
        this.setState({upperText: 'inherit from a superclass', optionTypeText: 'superclass'})
        break;

    // method option types
      case 'name':
        this.setState({upperText: `have a specific method name`, optionTypeText: 'method name'})
        break;
      case 'visibility':
        this.setState({upperText: 'have any of the visibilities', optionTypeText: 'visibility'}) 
        break;
      // TODO: case annotation ? oder annotations plural
      case 'annotation':
        this.setState({upperText: 'have an annotation', optionTypeText: 'annotation'})
        break;
      case 'arguments':
        this.setState({upperText: 'have the following arguments', optionTypeText: 'arguments'})
        break;
    }

    // the generic component either displays simpleTemplate or visibilityTemplate or argumentsTemplate
    if ( optionType === 'visibility' || optionType === 'arguments') this.setState({itemTemplate: optionType})
    else this.setState({ itemTemplate: 'simpleTemplate'});
  }

  render() {
    return(
      <div>
        <SimpleTemplate />
      </div>
    )
  }
}

export default SimpleFrameComponent;