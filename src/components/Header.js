import React, { useCallback } from "react";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
} from "@coreui/react";

const _ = ({ isShownSidebar, toggleShownSidebar }) => {
  const toggleSidebar = useCallback(
    (isMobile) => {
      const val = [!isMobile, "responsive"].includes(isShownSidebar)
        ? !!isMobile
        : "responsive";
      toggleShownSidebar(val);
    },
    [isShownSidebar, toggleShownSidebar]
  );

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={() => {
          toggleSidebar(true);
        }}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={() => {
          toggleSidebar();
        }}
      />

      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        ClickSound
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/tracking">배송 추적</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>
    </CHeader>
  );
};

export default _;
