import Link from "next/link";
import cn from "classnames";
import navData from "@data/nav";
import PropTypes from "prop-types";
import {useEffect, useMemo, useState} from "react";
import {IoIosArrowDown} from "react-icons/io";
import {isSignedIn} from "@services/auth";
import {Container, Col, Row} from "@bootstrap";
import {NavbarWrap, Nav, NavList, SubMenu} from "./desktop-nav.style";

const DesktopNav = ({bg, className}) => {
    const [signedIn, setSignedIn] = useState(null);
    const visibleNav = useMemo(() => {
        if (signedIn === false) return navData;

        return navData.map((navItem) => {
            if (!navItem.submenu) return navItem;

            return {
                ...navItem,
                submenu: navItem.submenu.map((group) => ({
                    ...group,
                    list: group.list.filter((item) => !["/login", "/register"].includes(item.link)),
                })),
            };
        });
    }, [signedIn]);

    useEffect(() => {
        setSignedIn(isSignedIn());
    }, []);

    return (
        <NavbarWrap bg={bg} className={cn(className)}>
            <Container>
                <Row>
                    <Col>
                        <Nav>
                            <NavList>
                                {visibleNav.map((navItem, index) => (
                                    <li key={index} className={navItem.submenu ? "dropdown" : undefined}>
                                        <Link href={navItem.link}>
                                            {navItem.text}
                                            {navItem.submenu && <IoIosArrowDown/>}
                                        </Link>

                                        {navItem.submenu && (
                                            <SubMenu>
                                                {navItem.submenu.map((item) => (
                                                    item.list.map((subItem, index) => (
                                                        <li key={index}>
                                                            <Link href={subItem.link}>{subItem.text}</Link>
                                                        </li>
                                                    ))
                                                ))}
                                            </SubMenu>
                                        )}
                                    </li>
                                ))}
                            </NavList>
                        </Nav>
                    </Col>
                </Row>
            </Container>
        </NavbarWrap>
    );
};

DesktopNav.propTypes = {
    bg: PropTypes.string
};


export default DesktopNav;
