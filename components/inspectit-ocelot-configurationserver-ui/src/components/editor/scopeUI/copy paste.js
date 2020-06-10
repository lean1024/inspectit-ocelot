<div style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
<div style={{padding: '25px' , background: background_uberSchriftDiv, height:'85px', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
  <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>I want to target the classes that have a specific class name</p>
</div>
<div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background: background_middleDiv, padding: '15px 30px 15px 15px', borderRadius:'10px'}}>
  <p style={{ color: color_elementSchrift}}> The wanted name of the class </p>
  <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={this.state.city} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
  <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
  <InputText style={{marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
  <i onClick={this.handleClick} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
</div>
<div style={{padding: '25px' , height:'85px', outline:'',  marginBottom: '15px',  width:'712px' , borderRadius:'10px', border: `2px solid ${background_middleDiv}`}}>
  <i onClick={this.handleClick} style={{ position: '', bottom:'', left: '', fontSize:'30px',  color:'whitesmoke'}} className="pi pi-plus-circle"></i>
</div>
</div>
<div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '25px',}}>
<i style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
</div>

<div style={{  marginBottom: '',  position:'relative', height: '', padding: '25px', background: background_bigDiv, width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
<div style={{padding: '25px' , background: background_uberSchriftDiv, height:'85px', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
  <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>I want to target the classes that have a specific class name</p>
</div>
<div style={{display: 'inline-flex',  marginBottom: '15px', position:'relative', background: background_middleDiv, padding: '15px 30px 15px 15px', borderRadius:'10px'}}>
  <p style={{ color: color_elementSchrift}}> The wanted name of the class </p>
  <Dropdown style={{marginLeft:'10px', position: 'relative', height:'35px', bottom: '-5px'}} value={this.state.city} options={citySelectItems} onChange={(e) => {this.setState({city: e.value})}} placeholder="EQUALS_FULLY"/>
  <p style={{  color: color_elementSchrift ,  marginLeft: '10px' }}>the term</p>
  <InputText style={{marginLeft: '10px' , position: 'relative',  height:'35px', bottom: '-5px'}} value={this.state.value} onChange={(e) => this.setState({value: e.target.value})} />
  <i onClick={this.handleClick} style={{ position: 'absolute', bottom:'0px', right: '0px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
</div>
<div style={{padding: '25px' , height:'85px', outline:'',  marginBottom: '15px',  width:'712px' , borderRadius:'10px', border: `2px solid ${background_middleDiv}`}}>
  <i onClick={this.handleClick} style={{ position: '', bottom:'', left: '', fontSize:'30px',  color:'whitesmoke'}} className="pi pi-plus-circle"></i>
</div>
</div>
<div style={{ position: 'relative', height: '20px' , display: 'flex', marginBottom: '25px',}}>
<i style={{ position: 'absolute', right: '5px', bottom:'-5px', fontSize:'30px',  color: 'red', opacity:'0.8'}} className="pi pi-times-circle"></i>
</div>