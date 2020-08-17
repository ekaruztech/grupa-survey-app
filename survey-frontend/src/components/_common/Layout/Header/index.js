import React from 'react';
import {NavLink, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {get} from 'lodash';
import './Header.scss';
import {logout, openModal, setNextUrl} from '../../../../redux/actions';

const Header = props => {
    const {
        auth,
    } = props;

    const isLoggedIn =
        !!auth &&
        !!auth.sessionTimeExpiration &&
        auth.sessionTimeExpiration > new Date().getTime() / 1000;
    return (
        <>
            <TopBar/>
        </>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
});

const dispatchToProps = {
    logout,
    openModal,
    setNextUrl,
};

export default withRouter(connect(mapStateToProps, dispatchToProps)(Header));

const NavBar = ({settings}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light vway-navbar">
            <div className="container">
                <a
                    className="navbar-brand"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src="#" alt="Logo"/>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"/>
                </button>
            </div>
        </nav>
    );
};

const TopBar = ({}) => {
    return (
        <div className="top-bar">
            <div className="container h-100 d-flex justify-content-end align-items-center">
                <div className="top-bar-links d-flex align-items-center">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-item home-link d-inline-flex align-items-center"
                        href="#"
                    >

                    </a>
                </div>
                <div className="top-bar-links ml-auto">
                </div>
            </div>
        </div>
    );
};
