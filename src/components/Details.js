import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import React, { useState } from "react";

import JSONPretty from "react-json-prettify";
import { github } from "react-json-prettify/dist/themes";

import { StaticFormItem } from "./Tracking";

const _ = ({ trackingInfo }) => {
  const [accordion, setAccordion] = useState(0);

  return (
    <>
      <CCard className="mb-0">
        <CCardHeader id="headingOne">
          <CButton
            block
            color="link"
            className="text-left m-0 p-0"
            onClick={() => setAccordion(accordion === 0 ? null : 0)}
          >
            <h5 className="m-0 p-0">추적 상세</h5>
          </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 0}>
          <CCardBody>
            <DetailItems details={trackingInfo.trackingDetails} />
          </CCardBody>
        </CCollapse>
      </CCard>
      <CCard className="mb-0">
        <CCardHeader id="headingTwo">
          <CButton
            block
            color="link"
            className="text-left m-0 p-0"
            onClick={() => setAccordion(accordion === 1 ? null : 1)}
          >
            <h5 className="m-0 p-0">원본</h5>
          </CButton>
        </CCardHeader>
        <CCollapse show={accordion === 1}>
          <CCardBody>
            <JSONPretty json={trackingInfo} theme={github} padding={4} />
          </CCardBody>
        </CCollapse>
      </CCard>
    </>
  );
};

export default _;

const detailItemsClasses = {
  formGroup: "mb-0",
};

const DetailItems = ({ details }) => (
  <CListGroup>
    {details.map((d, i) => (
      <CListGroupItem
        key={d.time}
        action
        active={i >= details.length - 1}
        className="pt-3"
      >
        <StaticFormItem label="상태" classes={detailItemsClasses}>
          {d.kind}
        </StaticFormItem>
        <StaticFormItem label="시각" classes={detailItemsClasses}>
          {d.timeString}
        </StaticFormItem>
        <StaticFormItem label="위치" classes={detailItemsClasses}>
          {d.where}
        </StaticFormItem>
        {d.manName && (
          <StaticFormItem label="담당자" classes={detailItemsClasses}>
            {d.manName}
          </StaticFormItem>
        )}
        {(d.telno || d.telno2) && (
          <StaticFormItem label="연락처" classes={detailItemsClasses}>
            {d.telno} {d.telno2 ? `(${d.telno2})` : ""}
          </StaticFormItem>
        )}
      </CListGroupItem>
    ))}
  </CListGroup>
);

export { DetailItems };
