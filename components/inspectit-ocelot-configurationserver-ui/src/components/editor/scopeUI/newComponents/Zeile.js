
import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Checkbox} from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { connect } from 'react-redux';


class Zeile extends React.Component {
  state = { optionTypeText: undefined}


  componentWillMount(){
    // const { optionType } = this.props;

    // switch(optionType) {
    //   // class option types
    //     case 'type':
    //       this.setState({optionTypeText: 'class name'});
    //       break;
    //     case 'interfaces':
    //       this.setState({ optionTypeText: 'interface'}) 
    //       break;
    //   // TODO: case annotation ? oder annotations plural
    //     case 'annotation':
    //       this.setState({ optionTypeText: 'annotation'})
    //       break;
    //     case 'superclass':
    //       this.setState({ optionTypeText: 'superclass'})
    //       break;
  
    //   // method option types
    //     case 'name':
    //       this.setState({optionTypeText: 'method name'})
    //       break;
    //     case 'visibility':
    //       this.setState({ optionTypeText: 'visibility'}) 
    //       break;
    //     // TODO: case annotation ? oder annotations plural
    //     case 'annotation':
    //       this.setState({optionTypeText: 'annotation'})
    //       break;
    //     case 'arguments':
    //       this.setState({optionTypeText: 'arguments'})
    //       break;
    //   }
  }

  render() {

    const background_bigDiv = "#EEEEEE";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "white";
    const background_middleDiv = "white"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "darkslategrey";
    const color_elementSchrift = "black";

    const { item, index, optionText } = this.props;
    
    // dropdown data
    const dropdownOptions = [
      {label: 'EQUALS_FULLY', value: 'EQUALS_FULLY'},
      {label: 'STARTS_WITH', value: 'STARTS_WITH'},
      {label: 'STARTS_WITH_IGNORE_CASE', value: 'STARTS_WITH_IGNORE_CASE'},
      {label: 'CONTAINS', value: 'CONTAINS'},
      {label: 'CONTAINS_IGNORE_CASE', value: 'CONTAINS_IGNORE_CASE'},
      {label: 'ENDS_WITH', value: 'ENDS_WITH'},
      {label: 'ENDS_WITH_IGNORE_CASE', value: 'ENDS_WITH_IGNORE_CASE'},
    ];

    return (
      <div style={{display: 'inline-grid'}}>
        <div style={{display: 'inline-flex',  marginBottom: '5px', position:'relative', background: background_middleDiv, padding: '10px 30px 0px 10px', borderRadius:'10px'}}>
          <p style={{ color: color_elementSchrift}}> ... {optionText}, that </p>
          <Dropdown name='matcher-mode' id={index} style={{marginLeft:'10px', fontSize: '13px',  position: 'relative', height:'35px', bottom: '-5px'}} value={item['matcher-mode']} options={dropdownOptions} onChange={this.handleChange} placeholder="EQUALS_FULLY"/>
          <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
          <InputText name='name' id={index} style={{ textAlign: 'middle', width: '250px', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={item.name} onChange={this.handleChange} />
          <i name='name' id={index}  onMouseOver={this.handleItemRemoveOver} onMouseLeave={this.handleItemRemoveLeave} onClick={this.deleteItem} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"/>
        </div>
      </div>
    )
  }

}

export default Zeile;