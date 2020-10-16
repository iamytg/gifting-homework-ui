import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CForm,
  CFormGroup,
  CLabel,
  CSelect,
  CInput,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
} from "@coreui/react";
import axios from "axios";

import Details from "./Details";

// import mock from "../mockup/tracking_info.json";

const _ = ({ setLoading }) => {
  const [form, setForm] = useState({
    tracking_corp_code: trackingCorpList[0].value,
    tracking_invoice_id: "",
  });
  const [result, setResult] = useState({
    // trackingInfo: mock
  });

  const refTrackingInvoiceId = useRef();

  const handleSubmit = useCallback(
    async (ev) => {
      ev.preventDefault();

      const trackingInvoiceId = form.tracking_invoice_id.replace(/\s/gi, "");

      if (!trackingInvoiceId) {
        alert("송장번호를 입력하세요.");
        refTrackingInvoiceId.current.focus();
        return;
      }

      setLoading(true);

      try {
        const { data, status } = await axios(
          `${process.env.REACT_APP_API_URL}/track`,
          {
            params: { ...form, tracking_invoice_id: trackingInvoiceId },
          }
        );

        if (status === 200) {
          const { trackingInfo } = data;

          if (!!trackingInfo.code) {
            throw new Error(`${trackingInfo.msg} (code: ${trackingInfo.code})`);
          } else {
            setResult(data);
          }
        } else {
          throw new Error(`서버 오류가 발생했어요.`);
        }
      } catch (err) {
        alert(err.message);
        setResult({});

        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [form, setLoading]
  );

  const handleChange = (name) => (ev) => {
    const v = ev.target.value;
    setForm((old) => ({ ...old, [name]: v }));
  };

  const { trackingInfo: ti } = result;

  useEffect(() => {
    refTrackingInvoiceId.current.focus();
  }, []);

  return (
    <>
      <CCard>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CFormGroup>
              <CLabel>송장번호</CLabel>
              <CInput
                innerRef={refTrackingInvoiceId}
                type="text"
                value={form.tracking_invoice_id}
                onChange={handleChange("tracking_invoice_id")}
              />
            </CFormGroup>

            <CFormGroup>
              <CLabel>택배사</CLabel>
              <CSelect
                value={form.tracking_corp_code}
                onChange={handleChange("tracking_corp_code")}
              >
                {trackingCorpList.map((corp) => (
                  <option key={corp.value} value={corp.value}>
                    {corp.label}
                  </option>
                ))}
              </CSelect>
            </CFormGroup>

            <CButton type="submit" color="primary" shape="pill">
              조회
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
      {ti && (
        <CCard>
          <CCardHeader>배송 정보</CCardHeader>
          <CCardBody>
            <StaticFormItem label="송장 번호">{ti.invoiceNo}</StaticFormItem>
            <StaticFormItem label="택배사">
              {trackingCorpList[result.trackingCorpCode]}
            </StaticFormItem>
            <StaticFormItem label="배송완료 여부">
              {ti.completeYN}
            </StaticFormItem>
            <StaticFormItem label="물품명">{ti.itemName}</StaticFormItem>

            <Details trackingInfo={ti} />
          </CCardBody>
        </CCard>
      )}
    </>
  );
};

export default _;

const StaticFormItem = ({ label, classes, children }) => {
  return (
    <CFormGroup row className={classes && classes.formGroup}>
      <CCol sm="3">
        <CLabel className="mb-1">{label}</CLabel>
      </CCol>
      <CCol sm="9">
        <p className="form-control-static mb-2">{children}</p>
      </CCol>
    </CFormGroup>
  );
};

const trackingCorpList = [
  {
    value: "A001",
    label: "CJ대한통운",
  },
  {
    value: "A002",
    label: "한진택배",
  },
  {
    value: "A003",
    label: "경동택배",
  },
];

export { StaticFormItem };
