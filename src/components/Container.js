import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavItem,
  CCard,
  CCardHeader,
  CCardBody,
  CNav,
  CNavLink,
  CRow,
  CCol,
  CContainer,
} from "@coreui/react";

import Loading from "./Loading";
import Header from "./Header";
import Tracking from "./Tracking";

const _ = () => {
  const [loading, setLoading] = useState(false);
  const [isShownSidebar, toggleShownSidebar] = useState("responsive");

  return (
    <Router>
      <div className="c-app c-default-layout">
        <CSidebar
          show={isShownSidebar}
          onShowChange={(val) => toggleShownSidebar(val)}
        >
          <CSidebarBrand className="d-md-down-none" to="/">
            The Gifting Co.
          </CSidebarBrand>

          <CSidebarNav>
            <CSidebarNavItem to="/tracking" name="배송 추적" />
          </CSidebarNav>
        </CSidebar>
        <div className="c-wrapper">
          <Header
            isShownSidebar={isShownSidebar}
            toggleShownSidebar={toggleShownSidebar}
          />
          <div className="c-body">
            <main className="c-main">
              <CContainer fluid>
                <Switch>
                  <Route path="/" exact>
                    <CRow>
                      <CCol xs={12}>
                        <CCard>
                          <CCardHeader>바로가기</CCardHeader>
                          <CCardBody>
                            <CNav vertical>
                              <CNavLink to="/tracking">배송 추적</CNavLink>
                            </CNav>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                  </Route>
                  <Route path="/tracking">
                    <Tracking setLoading={setLoading} />
                  </Route>
                </Switch>
              </CContainer>
            </main>
          </div>
        </div>
        <Loading show={loading} />
      </div>
    </Router>
  );
};

export default _;
