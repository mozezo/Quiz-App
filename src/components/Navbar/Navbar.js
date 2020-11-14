import React from 'react'
import styled from 'styled-components';
import ByteCode from '../../assets/images/byteCode.png';

const Navbar = ({className}) => {
    return (
        <div className={className}>
            <NavbarNavbar>
                <div><img  src={ByteCode} alt="ByteCode"/></div>
                <div> <h5>Hello, Username!</h5></div>
            </NavbarNavbar>
            </div>
    )
}

const NavbarWrapper = styled(Navbar)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export default NavbarWrapper;

const NavbarNavbar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 50px 65px;
    color: #19d4d4;

    @media only screen and (max-width: 490px) {
        padding: 50px 45px;
    }
`;