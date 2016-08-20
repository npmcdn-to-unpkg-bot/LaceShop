import React, {PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import './Notification.scss'

let seed = 0
const now = Date.now()

function getUuid() {
    return `leoUi_Notice_${now}_${seed++}`
}

class Notice  extends Component {
    constructor(props) {
        super(props)
        this.close = this.close.bind(this)
    }
    componentDidMount() {
        if (this.props.duration) {
            this.closeTimer = setTimeout(() => {
                this.close();
            }, this.props.duration * 1000);
        }
    }

    componentWillUnmount() {
        this.clearCloseTimer()
    }

    clearCloseTimer() {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer)
            this.closeTimer = null
        }
    }

    close() {
        this.clearCloseTimer()
        this.props.onClose()
    }

    render() {
        const props = this.props
        return (
            <div className="notice" style={props.style}>
                <div>{props.children}</div>
                <a tabIndex="0" onClick={this.close} className={'close'}>
                    <span>X</span>
                </a>
            </div>
        );
    }
}

Notice.defaultProps = {
    duration: 3,
    style: {
        right: '50%'
    }
}

Notice.propTypes = {
    duration: PropTypes.number,
    children: PropTypes.any,
}


export class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notices: []
        }
    }

    add(notice) {
        const key = notice.key = notice.key || getUuid();
        this.setState(previousState => {
            const notices = previousState.notices
            if(!notices.filter(v => v.key === key).length) {
                return {
                    notices: notices.concat(notice),
                }
            }
        })
    }

    remove(key) {
        this.setState(previousState => {
            return {
                notices: previousState.notices.filter(notice => notice.key !== key),
            };
        });
    }

    renderNotices() {
        return this.state.notices.map((notice) => {
            const onClose = this.remove.bind(this, notice.key)
            return (
                <Notice {...notice}
                    onClose={onClose}
                >
                    {notice.content}
                </Notice>
            )
        })
    }

    render() {
        const {style} = this.props
        return (
            <div className='leoUi-notification' style={style}>
                {this.renderNotices()}
            </div>
        )
    }
}

Notification.defaultProps = {
    style: {
        top: '10px',
        left: '50%',
    }
}

Notification.propTypes = {
    style: PropTypes.object,
}

Notification.newInstance = function newNotificationInstance(properties) {
    const props = properties || {}
    const div = document.createElement('div')
    document.body.appendChild(div)
    const notification = ReactDOM.render(<Notification {...props} />, div)
    return {
        notice(noticeProps) {
            notification.add(noticeProps)
        },
        success(noticeProps) {
            noticeProps.content = <span style={{color: 'green'}}>{noticeProps.content}</span>
            notification.add(noticeProps)
        },
        error(noticeProps) {
            noticeProps.content = <span style={{color: 'red'}}>{noticeProps.content}</span>
            notification.add(noticeProps)
        },
        removeNotice(key) {
            notification.remove(key)
        },
        component: notification,
        destroy() {
            ReactDOM.unmountComponentAtNode(div)
            document.body.removeChild(div)
        },
    }
}

export const notification = Notification.newInstance()