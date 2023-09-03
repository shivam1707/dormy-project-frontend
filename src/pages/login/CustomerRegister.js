import { useState } from "react";
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

function CustomerRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();

  const onFinish = async (values) => {
    console.log(values, "valuesssssssss");
    setLoader(true);
    let { data, success, error, token, message } = await Request.register({
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
        Register
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
          <InputNumber placeholder="Please type mobile no." />
        </Form.Item>
        <Form.Item label="First Name" name="firstname">
          <Input placeholder="first name" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input placeholder="last name" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="type email" />
        </Form.Item>
        {/* <Form.Item label="Role" name="role">
          <Input placeholder="type role"/>
        </Form.Item>
        <Form.Item label="Geo Location" name="geoLocation">
          <Input placeholder="select geo location"/>
        </Form.Item> */}
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
        onClick={() => dispatch({ type: "toggleSign", payload: true })}
      >
        Sign In
      </p>
    </div>
  );
}

export default CustomerRegister;
