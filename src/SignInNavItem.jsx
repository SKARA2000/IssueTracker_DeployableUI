import React from 'react';
import {
    NavItem, Modal, Button, NavDropdown, MenuItem,
} from 'react-bootstrap';

export default class SignInNavItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showing: false,
            user: { signedIn: false, givenName: '', },
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    signIn(){
        this.showModal();
        this.setState({
            user: { 
                signedIn: true,
                givenName: 'User1',
             }
        });
    }

    signOut(){
        this.setState({
            user: {
                signedIn: false,
                givenName: '',
            }
        });
    }

    showModal(){
        this.setState({
            showing: true,
        });
    }

    hideModal(){
        this.setState({
            showing: false,
        });
    }

    render(){
        const { user } = this.state;
        if (user.signedIn){
            return (
                <NavDropdown title={user.givenName} id="user">
                    <MenuItem onClick={this.signOut}>
                        Sign Out
                    </MenuItem>
                </NavDropdown>
            );
        }

        const { showing } = this.state;
        return (
            <React.Fragment>
                <NavItem onClick={this.showModal}>
                    Sign In
                </NavItem>
                <Modal keyboard show={showing} onHide={this.hideModal} bsSize="sm">
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button block bsStyle="primary" onClick={this.signIn}>
                            Sign In
                        </Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="link" onClick={this.hideModal}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

