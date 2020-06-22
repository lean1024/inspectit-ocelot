import { Button } from 'primereact/button';
import { configurationActions } from '../../../../redux/ducks/configuration';
import { connect } from 'react-redux';
import MethodSelectorCreateOption from './MethodSelectorCreateOption';
import ClassMatcherName from './ClassMatcherName';
import ClassMatcherInterface from './ClassMatcherInterface';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
// import { doc } from 'prettier';

class MethodSelector extends React.Component {

  state = {
    displayModal: false,
  }
  
  componentDidMount() {
  }

  confirm = () => {
    const { changeConfigScope } = this.props;
    const { scopeObject } = this.props;
    changeConfigScope( scopeObject );
  }

  onClick(name, position) {
    let state = {
        [`${name}`]: true
    };

    if (position) {
        state = {
            ...state,
            position
        }
    }

    this.setState(state);
  }

  onHide = (name) => {
    this.setState({[name]: false});
  }

  render(){
    const { scopeObject, updateScopeObject } = this.props;

    return(
      <div className="this">
        <style jsx>
          {`
            .this :global(.p-toolbar p-component) {
              margin-left:30%; background: red;
            }
            .this :global(.p-dialog-content) {
              margin:0; padding:0; border: 'none';
            }
            .this :global(.p-dialog-titlebar) {
              background: 'lightgrey'; border-radius:'20px'; position:'relative'; top:'30px'; z-index:5000;
            }
          `}
        </style>
        <Toolbar>
        <div className="p-toolbar">
            <Button label="New option" icon="pi pi-plus" style={{marginRight:'.25em'}}  onClick={() => this.onClick('displayModal')} />
            <Button label="Cancel scope" icon="pi pi-times" style={{marginRight:'.25em'}} className="p-button-danger" />
            <Button label="Save scope" icon="pi pi-check" className="p-button-success" />
        </div>
        </Toolbar>
        <ClassMatcherName scopeObject={scopeObject} updateScopeObject={updateScopeObject}  option={'type'} />
        <ClassMatcherName scopeObject={scopeObject} updateScopeObject={updateScopeObject}  option={'interfaces'} />
        {/* <ClassMatcherName scopeObject={scopeObject} updateScopeObject={updateScopeObject}  option={'annotation'} /> */}
        <ClassMatcherName scopeObject={scopeObject} updateScopeObject={updateScopeObject}  option={'superclass'}/>
        <Dialog header="choose by which option you want to determine your classes" visible={this.state.displayModal} style={{width: '50vw'}} onHide={() => this.onHide('displayModal')} modal={false}>
          <MethodSelectorCreateOption scopeObject={scopeObject} updateScopeObject={updateScopeObject} onHide={this.onHide}/>
        </Dialog>
      </div>
    )
  }
}


export default MethodSelector;