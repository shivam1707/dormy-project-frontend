import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import Request from "../../request";
import Login from "./login";
import Otp from "./otp";

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
import CustomerRegister from "./CustomerRegister";

function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const [valOtp, setValOtp] = useState(false);
  const { id } = useParams();

  const { signup } = useSelector((state) => ({
    signup: state.signup,
  }));
  return <>{signup ? <Login /> : <CustomerRegister />}</>;
}

export default Index;
