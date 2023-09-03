import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const { id } = useParams();

  const onFinish = async (values) => {
    console.log(values, "valuesssssssss")
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
    <div className='center'>
      <h5 className='p-3 text-center bg-info rounded-top bg-gradient text-white'>
        Login
      </h5>
      <Form
        form={form}
        name="basic"
        className='loginform'
        style={{ maxWidth: 500, marginTop: "2em" }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="Username" name="username">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" type="password">
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item style ={{marginTop: "2em"}} className='buttonForm' wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
