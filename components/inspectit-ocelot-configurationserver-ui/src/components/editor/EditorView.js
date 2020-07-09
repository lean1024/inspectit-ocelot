import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React from 'react';
import editorConfig from '../../data/yaml-editor-config.json';
import EditorToolbar from './EditorToolbar';
import Notificationbar from './Notificationbar';
import VisualEditor from './VisualEditor';
import ScopeEditor from './ScopeEditor';

const AceEditor = dynamic(() => import('./AceEditor'), { ssr: false });
const TreeTableEditor = dynamic(() => import('./TreeTableEditor'), { ssr: false });

/**
 * Editor view consisting of the AceEditor and a toolbar.
 *
 */
class EditorView extends React.Component {

  state = {
    showScopeView: false,
    showBusinessTransactionView: false,
    showTreeTableView: false,
    displayScopeEditor: 'none',
  }

  componentDidMount(){
    document.addEventListener('keydown', (e) => { if(e.key==='O') this.forceUpdate()})
    
  }

  handleDisplayOfView = (viewType) => {
    switch (viewType) {
      case 'showScopeView': 
        this.state.displayScopeEditor === 'none' ? this.setState({ displayScopeEditor: 'flex'}) : this.setState({ displayScopeEditor: 'none'});
        this.setState( {
          showScopeView:  !this.state.showScopeView,
          showBusinessTransactionView: false,
          showTreeTableView: false,
        });
        break;
      case 'showBusinessTransactionView': 
        this.setState( {
            showScopeView: false,
            showBusinessTransactionView: !this.state.showBusinessTransactionView,
            showTreeTableView: false,
        });
        break;
      case 'showTreeTableView': 
        this.setState({
            showScopeView: false,
            showBusinessTransactionView: false,
            showTreeTableView: !this.state.showTreeTableView,
        });
        break;
    }
  }

  render() {
    const {
      value,
      schema,
      showEditor,
      hint,
      onRefresh,
      onChange,
      onCreate,
      onSave,
      isRefreshing,
      enableButtons,
      isErrorNotification,
      notificationIcon,
      notificationText,
      canSave,
      loading,
      children,
      readOnly,
      showVisualConfigurationView,
      onToggleVisualConfigurationView, 
    } = this.props;

    const { showScopeView, showTreeTableView, showBusinessTransactionView, displayScopeEditor } = this.state;

    return (
      <div className="this p-grid p-dir-col p-nogutter">
        <style jsx>{`
          .this {
            flex: 1;
            flex-wrap: nowrap;
          }
          .selection-information {
            display: flex;
            height: 100%;
            align-items: center;
            justify-content: center;
            color: #bbb;
          }
          .editor-container {
            position: relative;
          }
          .visual-editor-container {
            display: flex;
          }
          .loading-overlay {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-color: #00000080;
            color: white;
            z-index: 100;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        `}</style>
        <div className="p-col-fixed">
          <EditorToolbar
            enableButtons={enableButtons}
            canSave={canSave}
            onRefresh={onRefresh}
            isRefreshing={isRefreshing}
            onSave={onSave}
            onSearch={() => this.editor.executeCommand('find')}
            onHelp={() => this.editor.showShortcuts()}
            handleDisplayOfView={this.handleDisplayOfView}
            showScopeView= {showScopeView} 
            showBusinessTransactionView= {showBusinessTransactionView} 
            showTreeTableView = {showTreeTableView}
          >
            {children}
          </EditorToolbar>
        </div>
        {
          showEditor && !showScopeView && !showTreeTableView && 
          <div className="p-col editor-container">
              <AceEditor editorRef={(editor) => this.editor = editor} onCreate={onCreate} mode="yaml" theme="cobalt" options={editorConfig} value={value} onChange={onChange} canSave={canSave} onSave={this.handleSave} readOnly={readOnly} />
          </div>
        }
        {
          showEditor && 
          <div style={{display: displayScopeEditor}}>
            <div className="p-col visual-editor-container">
            {console.log('#########nasty###########')}
            {console.log('value=', value)}
            {console.log('')}
                <VisualEditor yamlConfig={value} onUpdate={onChange}>
                    {(onUpdate, config) => (
                        <ScopeEditor config={config} schema={schema} loading={loading} readOnly={readOnly} onUpdate={onUpdate} />
                    )}

                    {/* JONAS TODO: {Object.keys(Liste).map(ListElement => <GenericItem ListElement={ListElement}/>)} */}
                </VisualEditor>
            </div>
          </div>
        }
        {
          showEditor && showTreeTableView &&
          <div className="p-col visual-editor-container">
              <VisualEditor yamlConfig={value} onUpdate={onChange}>
                  {(onUpdate, config) => (
                      <TreeTableEditor config={config} schema={schema} loading={loading} readOnly={readOnly} onUpdate={onUpdate} />
                  )}
              </VisualEditor>
              
          </div>
        }
        {
          !showEditor &&
          <div className="p-col">
              <div className="selection-information">
                  <div>{hint}</div>
              </div>
          </div>
        }
        {loading && (
          <div className="p-col">
            <div className="loading-overlay">
              <i className="pi pi-spin pi-spinner" style={{ fontSize: '2em' }}></i>
            </div>
          </div>
        )}
        <div className="p-col-fixed">
          {notificationText ? <Notificationbar text={notificationText} isError={isErrorNotification} icon={notificationIcon} /> : null}
        </div>
      </div>
    );
  }
}

EditorView.propTypes = {
  /** The value of the editor */
  value: PropTypes.string,
  /** The configuration schema */
  schema: PropTypes.object,
  /** Whether the editor should be shown or hidden. */
  showEditor: PropTypes.bool,
  /** The hint which will be shown if the editor is hidden. */
  hint: PropTypes.string,
  /** Callback which is triggered when the save button is pressed. */
  onSave: PropTypes.func,
  /** Callback which is executed when the refresh button is pressed. The refresh button is only shown if this callback is specified. */
  onRefresh: PropTypes.func,
  /** If true, the refresh button is disabled and showing a spinner. */
  isRefreshing: PropTypes.bool,
  /** Whether the toolbar buttons should be enabled or disabled. */
  enableButtons: PropTypes.bool,
  /** The children will be shown in the toolbar. Can be used e.g. to show additional information. */
  children: PropTypes.element,
  /** Whether the save button is enabled or not. The save button is enabled only if the `enableButtons` is true.  */
  canSave: PropTypes.bool,
  /** Whether the notification bar is showing an error or not. */
  isErrorNotification: PropTypes.bool,
  /** The icon class to show in the notification bar. */
  notificationIcon: PropTypes.string,
  /** The text to show in the notification bar. */
  notificationText: PropTypes.string,
  /** Whether the editor should show an loading indicator */
  loading: PropTypes.bool,
  /** Wheter the editor should be in read-only mode */
  readOnly: PropTypes.bool,
  /** Weather a visual configuration view is active showing config properties in a tree */
  showVisualConfigurationView: PropTypes.bool,
  /** Function to react on the change of the enable disable visual configuration view */
  onToggleVisualConfigurationView: PropTypes.func,
};

EditorView.defaultProps = {
  showEditor: true,
  enableButtons: true,
  canSave: true,
  loading: false,
  showScopeView: false,
  showTreeTableView: false,
  showBusinessTransactionView: false,
};

export default EditorView;
