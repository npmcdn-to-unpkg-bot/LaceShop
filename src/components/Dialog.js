import React, {Component, PropTypes} from 'react'
import ReactDOM from 'react-dom'

class Dialog extends Component {
    constructor(props) {
        super(props)
        this._mountNode = null
    }
    getContainer() {
        if(!this._mountNode){
            const container = document.createElement('div')
            document.body.appendChild(container)
            this._mountNode = container
        }
    }
    renderOverlay() {
        this.getContainer()
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this, this.renderModel(), this._mountNode
        )
    }
    componentDidMount(){
        this.renderOverlay()
    }
    componentDidUpdate() {
        this.renderOverlay()
    }
    shouldComponentUpdate({ visible }) {
        return !!(this.props.visible || visible);
    }
    overlayClick(event){
        const {overlayClick} = this.props
        if(overlayClick && (event.currentTarget === event.target)){
            overlayClick(event)
        }
    }
    renderModel(){
        const {children, visible, overlayClick} = this.props
        const child = React.Children.only(children)
        const display = visible ? 'block' : 'none'
        const pointer = overlayClick ? 'pointer' : null
        const style = {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: display,
            zIndex: 999,
            background: 'rgba(0, 0, 0, .5)',
            overflow: 'auto',
            cursor: pointer
        }
        return (
            <div style={style} onClick={(e)=>{this.overlayClick(e)}}>
                {child}
            </div>
        )
    }
    componentWillUnmount() {
        if(this._mountNode){
            ReactDOM.unmountComponentAtNode(this._mountNode)
            this._mountNode.parentNode.removeChild(this._mountNode)
            this._mountNode = null
        }
    }
    render() {
        return null
    }
}

Dialog.defaultProps = {
    visible: false,
    overlayClick: false
}

Dialog.propTypes = {
    children: PropTypes.element,
    visible: PropTypes.bool,
    overlayClick: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ])
}

module.exports = Dialog
