import { useEffect, useState } from "react";
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

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const [valOtp, setValOtp] = useState(false);
  const [number, setMobileno] = useState(false);
  const { id } = useParams();

  const onFinish = async (values) => {
    console.log(values, "valuesssssssss");
    setLoader(true);
    let { data, success, error, token, message } = await Request.login({
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

  return (
    <div className="center">
      <h5 className="p-3 text-center bg-info rounded-top bg-gradient text-white">
        Login
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
        <Form.Item
          rules={[
            {
              required: true,
              type: "number",
              validator: (_, value) => {
                if (!value || String(value).length === 10) {
                  setMobileno(value);
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mobile number must be 10 digits")
                );
              },
            },
          ]}
          label="Mobile Number"
          name="mobileNo"
        >
          <Input placeholder="Please type mobile no." />
        </Form.Item>
        <Form.Item label="Password" name="password" type="password">
          <Input.Password placeholder="Password" />
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
      <p
        className="togglesignbutton"
        onClick={() => dispatch({ type: "toggleSign", payload: false })}
      >
        Don't have an account! Sign Up
      </p>
      <h4>OR</h4>
      <Button
        type="primary"
        onClick={() =>
          number
            ? navigate(`/otp/${number}`)
            : notification.error({ message: "Please type number" })
        }
      >
        Validate Using OTP
      </Button>
    </div>
  );
}

export default Login;
