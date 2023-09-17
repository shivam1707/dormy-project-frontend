import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert2";
import { useDispatch } from "react-redux";
import "./styles.css";
import Request from "../../request";
import { LockOutlined } from "@ant-design/icons";
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

  const [confirmDirty, setConfirmDirty] = useState(false);

  const validateConfirmPassword = (_, value) => {
    const { password } = form.getFieldsValue();
    if (value && value !== password) {
      return Promise.reject(new Error("The two passwords do not match"));
    } else {
      return Promise.resolve();
    }
  };

  const handleConfirmBlur = (e) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (_, value) => {
    if (value && value !== form.getFieldValue("password")) {
      return Promise.reject(new Error("The two passwords do not match"));
    } else {
      return Promise.resolve();
    }
  };

  const onFinish = async (values) => {
    console.log(values, "valuesssssssss");
    setLoader(true);
    let { data, success, error, token, message } = await Request.register({
      ...values,
    });
    if (success) {
      notification.success({
        message: message || "Registeration Successfull",
      });
      navigate(`/your-next-route/${data.number}`);
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

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
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
        validateMessages={validateMessages}
      >
        <Form.Item
          rules={[
            {
              required: true,
              type: "number",
              validator: (_, value) => {
                if (!value || String(value).length === 10) {
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
          <InputNumber placeholder="Please type mobile no." />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Required Field",
            },
          ]}
          label="First Name"
          name="firstname"
        >
          <Input placeholder="first name" />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input placeholder="last name" />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              type: "email",
              // message: "Please input your email!",
            },
          ]}
          label="Email"
          name="email"
        >
          <Input placeholder="type email" />
        </Form.Item>
        {/* <Form.Item label="Role" name="role">
          <Input placeholder="type role"/>
        </Form.Item>
        <Form.Item label="Geo Location" name="geoLocation">
          <Input placeholder="select geo location"/>
        </Form.Item> */}
        <Form.Item
          name="password"
          label="Password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
            {
              validator: validateConfirmPassword,
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password",
            },
            {
              validator: compareToFirstPassword,
            },
          ]}
        >
          <Input.Password
            onBlur={handleConfirmBlur}
            visibilityToggle={false}
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
          />
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
