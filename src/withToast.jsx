import React from 'react';
import Toast from './Toast.jsx';

export default function withToast(OriginalComponent){
    return class ToastWrapper extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                toastVisible: false,
                toastMessage: '',
                toastType: 'success',
            };
            this.showSuccess = this.showSuccess.bind(this);
            this.showError = this.showError.bind(this);
            this.dismisstoast = this.dismisstoast.bind(this);
        }

        showSuccess(message){
            this.setState({
                toastVisible: true,
                toastMessage: message,
                toastType: 'success',
            })
        }

        showError(message){
            this.setState({
                toastVisible: true,
                toastMessage: message,
                toastType: 'danger',
            })
        }

        dismisstoast(){
            this.setState({
                toastVisible: false,
            })
        }

        render(){
            const { toastMessage, toastType, toastVisible } = this.state;
            return (
                <React.Fragment>
                    <OriginalComponent
                        showError={this.showError}
                        showSuccess={this.showSuccess}
                        dismisstoast={this.dismisstoast}
                        {...this.props}
                    />
                    <Toast 
                        bsStyle={toastType}
                        showing={toastVisible}
                        onDismiss={this.dismisstoast}
                        >
                            {toastMessage}
                        </Toast>
                </React.Fragment>
            );
        }
    };

}