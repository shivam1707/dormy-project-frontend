import { useState, useEffect } from "react";
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
  const { id } = useParams();

  const { signup, otpTog } = useSelector((state) => ({
    signup: state.signup,
    otpTog: state.otpTog,
  }));

  useEffect(() => {
    dispatch({ type: "toggleSign", payload: true });
    dispatch({ type: "toggleOtp", payload: true });
  }, []);

  return <>{signup ? <Login /> : <CustomerRegister />}</>;
}

export default Index;
