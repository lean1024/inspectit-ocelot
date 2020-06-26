class Header extends React.Component {

  state= { selectorTypeText:undefined, upperText:undefined }

  componentWillMount(){

    const { selectorType, optionType } = this.props;

    switch(selectorType) {
      case 'Class':
        this.setState({selectorTypeText: 'classes'})
        break;
      case 'Method':
        this.setState({selectorTypeText: 'methods'})
    }

    // The Class must implement all of the following interfaces


     // info# why do i introduce optionTypeText? This component should display the "optionType". The optionType for class name is
    // type. This cant be a text, so the component needs to re-write the text to "class name".
    switch(optionType) {
      // class option types
        case 'type':
          this.setState({upperText: `have a specific class name`});
          break;
        case 'interfaces':
          this.setState({upperText: 'implement all of the following interfaces:'}) 
          break;
      // TODO: case annotation ? oder annotations plural
        case 'annotation':
          this.setState({upperText: 'have an annotation'})
          break;
        case 'superclass':
          this.setState({upperText: 'inherit from a superclass'})
          break;
  
      // method option types
        case 'name':
          this.setState({upperText: `have a specific method name`})
          break;
        case 'visibility':
          this.setState({upperText: 'have any of the visibilities'}) 
          break;
        // TODO: case annotation ? oder annotations plural
        case 'annotation':
          this.setState({upperText: 'have an annotation'})
          break;
        case 'arguments':
          this.setState({upperText: 'have the following arguments'})
          break;
      }
  }

  render() {
    // TODO: delete?
    const background_bigDiv = "#EEEEEE";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "white";
    const background_middleDiv = "white"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "darkslategrey";
    const color_elementSchrift = "black";

    const { selectorTypeText, upperText } = this.state;

    const divStyle = { padding: '5px 10px 0 10px' ,height:'30px',  background: background_uberSchriftDiv, width: 'fit-content', outline:'', marginBottom: '15px', borderRadius: '10px' };
    const pStyle = { fontWeight: 'bold', marginTop: '0px' };

    const editingScope = false;

    
    return (
     <div>
      { !editingScope && (
        <div style={{...divStyle}}>
          <h4 style={{ ...pStyle}}>The {selectorTypeText} must {upperText} </h4>
        </div>  
      )}
      { editingScope && scopeObject && scopeObject[optionType] && (
        <div style={{...divStyle}}>
          <p style={{ ...pStyle}}>The classes must {upperText} </p>
        </div>
      )}
     </div>)
  }

}

export default Header;