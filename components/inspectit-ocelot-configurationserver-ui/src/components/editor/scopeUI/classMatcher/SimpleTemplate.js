import PropTypes from 'prop-types';
import React from 'react';

class SimpleTemplate extends React.Component {

  itemTemplate = (entry, index) => {
    const background_bigDiv = "#EEEEEE";   
    // const background_bigDiv = "#bccace";
    const background_uberSchriftDiv = "white";
    const background_middleDiv = "white"; 
    const background_extraField = "whitesmoke";
    const color_uberSchriftText = "darkslategrey";
    const color_elementSchrift = "black";

    const { optionTypeText } = this.state;

    console.log('entryOOO', entry);

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
      // The components optionType div
      <div style={{display: 'inline-flex',  marginBottom: '5px', position:'relative', background: background_middleDiv, padding: '10px 30px 0px 10px', borderRadius:'10px'}}>
        <p style={{ color: color_elementSchrift}}> The {optionTypeText} </p>
        <Dropdown name='matcher-mode' id={index} style={{marginLeft:'10px', fontSize: '13px',  position: 'relative', height:'35px', bottom: '-5px'}} value={entry['matcher-mode']} options={dropdownOptions} onChange={this.handleChange} placeholder="EQUALS_FULLY"/>
        <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
        <InputText name='name' id={index} style={{ textAlign: 'middle', width: '250px', marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={entry.name} onChange={this.handleChange} />
        <i name='name' id={index}  onMouseOver={this.handleItemRemoveOver} onMouseLeave={this.handleItemRemoveLeave} onClick={this.deleteItem} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"/>
      </div>
    )
  }

  render(){
    const { upperText, selectorTypeText } = this.state;
    const { scopeObject, optionType } = this.props;

    return(
      <React.Fragment>
        <div data-optiontype={optionType} style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, borderRadius: '10px' , border: '1px solid black'}}>
          { !editingScope && (
            <div style={{...divStyle}}>
              <h4 style={{ ...pStyle}}>I want to target the {selectorTypeText} that {upperText} </h4>
            </div>  
          )}
          { editingScope && scopeObject && scopeObject[optionType] && (
            <div style={{...divStyle}}>
              <p style={{ ...pStyle}}>The classes must {upperText} </p>
            </div>
          )}
          <div style={{display: 'inline-grid'}}>
            {/* the component needs to differentiate between being an array optionType component or just 1 element component*/}
            { scopeObject[optionType] && Array.isArray(scopeObject[optionType]) && scopeObject[optionType].map((entry,index) => 
              this.itemTemplate(entry,index)
            )}
            {/* { scopeObject[optionType] && !Array.isArray(scopeObject[optionType]) && this.itemTemplate(scopeObject[optionType])}
            { this.annotationTemplate()} */}

          </div>
        </div>
        
        <div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '5px',}}>
          <p style={{ visibility: 'hidden' , color:'red', position:'absolute', right:'35px', marginTop:'-3px'}}> remove this option </p>
          <i data-tobehighlighted={optionType} onClick={this.removeOption} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave} style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
        </div>
      </React.Fragment>
    )
  }
}

export default SimpleTemplate;