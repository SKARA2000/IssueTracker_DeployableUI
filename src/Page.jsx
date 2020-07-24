import React from 'react';

import Contents from './Contents.jsx';
import {
    Nav,
    NavDropdown,
    Navbar,
    OverlayTrigger,
    Tooltip,
    NavItem,
    Button,
    Grid,
    MenuItem,
    Glyphicon
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
// import { Link } from 'react-router-dom';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import SignInNavItem from './SignInNavItem.jsx';

function NavBar_custom(){
    return(
        <Navbar inverse>
            <Navbar.Header>
                <Navbar.Brand>Issue Tracker</Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <LinkContainer exact to="/">
                    <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/issues?page=1">
                    <NavItem>Issue List</NavItem>
                </LinkContainer>
                <LinkContainer to="/report">
                    <NavItem>Report</NavItem>
                </LinkContainer>
            </Nav>
            <Nav pullRight>
                <IssueAddNavItem />
                <SignInNavItem />
                {/* <NavDropdown
                id="user-dropdown"
                title={<span className="fa fa-ellipsis-v"></span>}
                noCaret>
                    <LinkContainer to="/about">
                        <MenuItem>About</MenuItem>
                    </LinkContainer>
                </NavDropdown> */}
            </Nav>
        </Navbar>
    );
}

function Footer(){
    return (
        <small>
            <hr />
            <p className="text-center">
                React Project for Practice, dated {new Date().toDateString().substr(4)}
            </p>
        </small>
    );
}

export default function Page(){
    return(
        <Grid fluid>
            <NavBar_custom />
            <Contents />
            <Footer />
        </Grid>
    );
}