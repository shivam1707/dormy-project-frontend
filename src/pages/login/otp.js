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
  const onFinish = async (values) => {
    console.log(values, "valuesssssssss");
    setLoader(true);
    let { data, success, error, token, message } = await Request.otp({
      ...values,
    });
    if (token) {
      notification.success({
        message: token || "Report Added Successfully",
      });
      // setTimeout(() => {
      //   navigate(`/report/${data._id}`);
      // }, 0);
    } else {
      notification.error({
        message: message || "Some Error Occured",
      });
    }
    setLoader(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      mobileno: number,
    });
  }, [number, form]);

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
        <Form.Item label="Mobile Number" name="mobileno">
          <InputNumber placeholder="mobileNo" />
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
