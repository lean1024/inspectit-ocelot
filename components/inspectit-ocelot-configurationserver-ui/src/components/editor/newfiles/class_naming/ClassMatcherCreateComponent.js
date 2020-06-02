import { Button } from 'primereact/button';
import { configurationActions } from '../../../../redux/ducks/configuration';
import { connect } from 'react-redux';

class ClassMatcherCreateComponent extends React.Component {
    

    createOption = (e) => {
        let {scopeUiClassSelectorState} = this.props;
        console.log(scopeUiClassSelectorState);
        let classMatcherObject = undefined;
        // primereact <button> <span> buttonText </span> </button> creates 2 html elements, the span takes most room and does not get data-attribute
        // data-attribute is used to create a generic function(). Avoiding to create 4 diffrect functions for the options.
        let option =  e.target.dataset.optiontype;
        if(!option) { option = e.target.parentElement.dataset.optiontype}

        // 1. es existiert keinen Eintrag, erstes Element erstellen
        // 2. es existiert Einträge, n+1 Element erstellen
        if (!classMatcherObject) {
            scopeUiClassSelectorState(option);
            // this.setState({classMatcherObject: {[option] : {matcherMode: 'EQUALS_FULLY', term: ''}}});
        } else {
            if (!classMatcherObject[option]) {
            scopeUiClassSelectorState(option);

            // wenn 'name' | 'interface' | 'annotation' | 'superclass' nicht existieren
            // this.setState({classMatcherObject: {[option] : {matcherMode: 'EQUALS_FULLY', term: ''}}})    
            }
        }

    }

    componentDidMount(){
        // document.addEventListener('keydown', (e) => { e.key === 'F' && console.log(this.state.classMatcherObject)})
        // document.addEventListener('keydown', (e) => { console.log(e.keyCode)})
        console.log(this.state)
        console.log('asdasd')
        console.log(this.props)
        
            document.addEventListener('keydown', (e) => e.key =='g' && console.log(this.props))
          
    }

    navigateToConfirm = () => {}
    
    render(){
        const { classMatcherObject } = this.props;

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
            { !classMatcherObject && (
                <React.Fragment>
                    <div style={{  marginBottom: '50px',  position:'relative', height: '357px', padding: '25px', background: 'lightgrey', width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
                    {/* <i style={{position:'absolute', top:0, left:0 }} class="pi pi-info-circle"></i> */}
                        <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                        <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>I want to target the classes that </p>
                        <div style={{ display:'inline-grid', position: 'relative', bottom: '45px', left:'300px'}}>
                            <Button onClick={this.createOption} data-optionType='names' label="have a specific class name" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}></Button>
                            <Button onClick={this.createOption} data-optiontype='interfaces' label="implement an interface" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                            <Button onClick={this.createOption} data-optiontype='annotations' label="have an annotation" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                            <Button onClick={this.createOption} data-optiontype='superclass'label="inherit from a superclass" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}></Button>
                        </div>
                        </div>
                    </div>
                </React.Fragment>
            )}

            { classMatcherObject && (
                <React.Fragment>
                    {/* <div style={{ display:'flex', position:'relative', left:'300px', marginBottom:'25px'}}>
                        <p style={{ color: 'red', marginRight:'10px',  }}>  ( skip to confirm, if no additional specification is required )</p>
                        <Button onClick={this.navigateToConfirm} label="navigate to confirm" style={{ padding: '5px' , background: '#007ad9', margin: '5px'}}></Button>
                    </div> */}
                    <div style={{  marginBottom: '50px',  position:'relative', height: '357px', padding: '25px', background: 'lightgrey', width: '100%', borderRadius: '10px' , border: '4px solid floralwhite'}}>
                        {/* <i tooltip="this additional option" style={{position:'absolute', top:'5px', left:'5px', color: 'rgb(250, 149, 129)', fontSize: 'x-large' }} class="pi pi-info-circle"></i> */}
                        <div style={{padding: '25px' , background: background_uberSchriftDiv, height:'', outline:'', marginBottom: '15px', borderRadius: '10px'}}>
                        <p style={{ color: color_uberSchriftText , fontWeight: 'bold', marginTop: '0px',}}>Additonally those classes must </p>
                        <div style={{ display:'inline-grid', position: 'relative', bottom: '45px', left:'300px'}}>
                            <Button tooltip="this additional option" onClick={this.createOption} data-optiontype='names' label="have a specific class name" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}></Button>
                            <Button onClick={this.createOption} data-optiontype='interfaces' label="implement an interface" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                            <Button onClick={this.createOption} data-optiontype='annotations' label="have an annotation" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}> </Button>
                            <Button onClick={this.createOption} data-optiontype='superclass' label="inherit from a superclass" style={{ padding: '5px' , background: 'rgb(139, 172, 189)', margin: '5px'}}></Button>
                        </div>
                        </div>
                    </div>
                </React.Fragment>
            )}
              </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        classMatcherObject: state.configuration.classMatcherObject
    };
}
  
const mapDispatchToProps = {
    scopeUiClassSelectorState: configurationActions.scopeUiClassSelectorState,
};



ClassMatcherCreateComponent.defaultProps = {
    classMatcherObject: undefined
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassMatcherCreateComponent);