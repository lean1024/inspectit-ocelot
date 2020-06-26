class ItemBody extends React.Component {

  render() {
    const { item } = this.props;

    const background_bigDiv = "#EEEEEE";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "white";
    const background_middleDiv = "white"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "darkslategrey";
    const color_elementSchrift = "black";
    const { scopeObject } = this.props;

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
      <div style={{display: 'inline-flex',  marginBottom: '5px', position:'relative', background: background_middleDiv, padding: '10px 30px 0px 10px', borderRadius:'10px'}}>
        <p style={{ color: color_elementSchrift}}> The {optionTypeText} </p>
        <Dropdown name='matcher-mode' id={index} style={{marginLeft:'10px', fontSize: '13px',  position: 'relative', height:'35px', bottom: '-5px'}} value={entry['matcher-mode']} options={dropdownOptions} onChange={this.handleChange} placeholder="EQUALS_FULLY"/>
        <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
        <InputText name='name' id={index} style={{ textAlign: 'middle', width: '250px', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={entry.name} onChange={this.handleChange} />
        <i name='name' id={index}  onMouseOver={this.handleItemRemoveOver} onMouseLeave={this.handleItemRemoveLeave} onClick={this.deleteItem} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"/>
    </div>
    )
  }

}

export default ItemBody;