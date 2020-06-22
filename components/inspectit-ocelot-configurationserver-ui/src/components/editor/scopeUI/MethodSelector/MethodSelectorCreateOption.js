import { Button } from 'primereact/button';
import { configurationActions } from '../../../../redux/ducks/configuration';
import { connect } from 'react-redux';

class MethodSelectorCreateOption extends React.Component {
    

    createOption = (e) => {
        // onHide to hide the Dialog component in which this ClassMatcherCreateComponent is opened
        const { updateScopeObject, scopeObject, onHide } = this.props;
        // each button got a data-attribute. We can use it to only use 1 handler function. Using .parentElement to access the button with the data-attribute.
        // Either the type, annotations, interfaces or superclass button is clicked to create an option. To differentiate we use the data-attribute. Only 1 createOption function instead of 4.
        const optionType = e.target.parentElement.dataset.optiontype; 
        const emptyOption = {name: '', ['matcher-mode']: 'EQUALS_FULLY'};
        
        // no entry under the optionType
        // creating a array. Filling it with a sample JSON

        // first if: the inspectIT scheme wants an array for interfaces and annotations and no array for type and superclass
        // second if: either an entry exist and we push an element to the array or we update the no array key (json), or no entry exist and we add the key ( array | no array )
        if ( optionType === 'type' || optionType === 'superclass'){
            scopeObject[optionType] = emptyOption;
        }
        if ( optionType === 'interfaces' || optionType === 'annotations') {
            if ( scopeObject[optionType] ) { 
                // entry exist
                let targetArray = scopeObject[optionType];
                targetArray.push(emptyOption);
                scopeObject[optionType] = targetArray;
            } else {
                // no entry exist
                scopeObject[optionType] = [emptyOption];
            }
        }
        updateScopeObject(scopeObject.scopeName, scopeObject);
        onHide('displayModal');
    }

    componentDidMount(){
        // document.addEventListener('keydown', (e) => { e.key === 'F' && console.log(this.state.classMatcherObject)})
        // document.addEventListener('keydown', (e) => { console.log(e.keyCode)})
    }

    navigateToConfirm = () => {}
    
    render(){
        const { scopeObject  } = this.props;

        // colors
        const background_bigDiv = "lightsteelblue";   
        // const background_bigDiv = "#bccace";
        const background_uberSchriftDiv = "#fa9581";
        const background_middleDiv = "#8bacbd"; 
        const background_extraField = "whitesmoke";
        const color_uberSchriftText = "whitesmoke";
        const color_elementSchrift = "whitesmoke";

        return(
            <React.Fragment>
                <div style={{  marginBottom: '50px',  position:'relative', height: '357px', padding: '25px', background: 'lightgrey', width: '100%', borderRadius: '10px' , }}>
                {/* <i style={{position:'absolute', top:0, left:0 }} class="pi pi-info-circle"></i> */}
                    <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                    { !scopeObject && <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>I want to target the classes that </p> }
                    { scopeObject && <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>Additonally those classes must  </p> }
                    <div style={{ display:'inline-grid', position: 'relative', bottom: '45px', left:'300px'}}>
                        <Button onClick={this.createOption} data-optiontype='type' label="have a specific class name" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}></Button>
                        <Button onClick={this.createOption} data-optiontype='interfaces' label="implement an interface" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                        <Button onClick={this.createOption} data-optiontype='annotations' label="have an annotation" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                        <Button onClick={this.createOption} data-optiontype='superclass'label="inherit from a superclass" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}></Button>
                    </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}


export default MethodSelectorCreateOption;