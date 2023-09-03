import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import "./styles.css";
import Request from "../request";
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

function Home() {
  // const { overview } = useSelector((state) => ({
  //   overview: state.overview,
  // }));
  // const dispatch = useDispatch();
  // dispatch({ type: "selectedOverview", payload: selected });
  return (
    <h1>Hello World !!!</h1>
  )
}

export default Home
