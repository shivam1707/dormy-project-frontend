import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert2";
import { useDispatch } from "react-redux";
import "./styles.css";
import Request from "../../request";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
  notification,
} from "antd";

function Otp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();

  const { number } = useParams();

  const getOtp = async (otp) => {
    setLoader(true);
    let { data, success, error, message } = await Request.getotp({
      mobileNo: otp,
    });
    if (success) {
      notification.success({
        message: message || "OTP sent successfully",
      });
    } else {
      notification.error({
        message: message || "Some Error Occured",
      });
    }
    setLoader(false);
  };

  const onFinish = async (values) => {
    setLoader(true);
    let { data, success, error, token, message } = await Request.validateOTP({
      ...values,
    });
    if (success) {
      notification.success({
        message: success || "OTP Verified",
      });
      dispatch({ type: "setToken", payload: "7239847823bccdh1nhcdhm193" });
      setTimeout(() => {
        navigate(`/home`);
      }, 0);
    } else {
      notification.error({
        message: message || "Some Error Occured",
      });
    }
    setLoader(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      mobileNo: number,
    });
  }, [number, form]);

  useEffect(() => {
    getOtp(number);
  }, [number]);

  return (
    <div className="center">
      <h5 className="p-3 text-center bg-info rounded-top bg-gradient text-white">
        Validate With Otp
      </h5>
      <Form
        form={form}
        name="basic"
        className="loginform"
        style={{ maxWidth: 500, marginTop: "2em" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Mobile Number" name="mobileNo">
          <Input placeholder="mobileNo" />
        </Form.Item>
        <Form.Item label="Otp" name="otp">
          <InputNumber placeholder="write otp" />
        </Form.Item>
        <Form.Item
          style={{ marginTop: "2em" }}
          className="buttonForm"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <h4>OR</h4>
      <Button
        type="primary"
        onClick={() => dispatch({ type: "toggleOtp", payload: true })}
      >
        Validate Using Email
      </Button>
    </div>
  );
}

export default Otp;
