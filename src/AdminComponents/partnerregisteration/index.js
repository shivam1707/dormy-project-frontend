import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import "./styles.css";
import Request from "../../request";
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  message,
  Upload,
  Row,
  Col,
  InputNumber,
  Radio,
  Checkbox,
  Select,
  Switch,
  TreeSelect,
  notification,
} from "antd";
const PartnerRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loader, setLoader] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [fileList1, setFileList1] = useState([]);
  const { id } = useParams();

  const { Option } = Select;

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    const uploadedFiles = e && e.fileList;

    if (uploadedFiles.length > 5) {
      // Display an error notification if more than 3 files are uploaded
      message.error("You can only upload up to 5 files.");
      return uploadedFiles.slice(0, 5); // Limit to the first 3 files
    }

    return uploadedFiles;
  };

  const normFile1 = (e) => {
    console.log("Upload event1:", e);
    if (Array.isArray(e)) {
      return e;
    }
    const uploadedFiles = e && e.fileList1;

    if (uploadedFiles.length > 3) {
      // Display an error notification if more than 3 files are uploaded
      message.error("You can only upload up to 3 files.");
      return uploadedFiles.slice(0, 3); // Limit to the first 3 files
    }

    return uploadedFiles;
  };

  const onFinish = async () => {
    form.validateFields().then(async (values) => {
      setLoader(true);
      const formData = new FormData();
      formData.append(
        "property",
        JSON.stringify({
          propertyNo: 1116712,
          propertyName: "A 85",
          address1: "Ashok Nagar",
          address2: "Delhi",
          city: "Delhi",
          state: "Delhi",
          pinCode: 12345756,
          approvalstatus: "UNDER_REVIEW",
          managerName: "Shivam",
          managerMobNo: 1234453656,
          customerCareNo: 123456,
          country: "INDIA",
          dateRegistered: "2023-01-01",
          ownerName: "Ashok",
          googleMapLink: "WWW",
        })
      );
      console.log(formData);
      for (const [key, value] of formData.entries()) {
        console.log(`Key: ${key}, Value: ${value}`);
      }
      console.log(fileList);
      formData.append("images", fileList);

      formData.append("icon", fileList1);
      let { data, success, error, message } = await Request.propertyRegister(
        formData
      );
      if (success) {
        notification.success({
          message: message || "Report Added Successfully",
        });
      } else {
        notification.error({
          message: message || "Some Error Occured",
        });
      }
      setLoader(false);
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <h5 style={{ fontWeight: 600, marginBottom: "20px" }}>
        Partner Registeration
      </h5>
      <div>
        <Form
          form={form}
          name="basic"
          className="loginform formHeader"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="" name="propertyNo">
            <InputNumber placeholder="Property Number" />
          </Form.Item>
          <Form.Item label="" name="propertyName">
            <Input placeholder="Property Name" />
          </Form.Item>
          <Form.Item label="" name="dateRegistered">
            <DatePicker placeholder="Date Of Registeration" />
          </Form.Item>
          <Form.Item label="" name="address1">
            <Input placeholder="Detail Address Line 1" />
          </Form.Item>
          <Form.Item label="" name="address2">
            <Input placeholder="Detail Address Line 1" />
          </Form.Item>
          <Form.Item label="" name="city">
            <Select placeholder="City Name">
              <Option value="city1">city1</Option>
              <Option value="city2">city2</Option>
              <Option value="city3">city3</Option>
            </Select>
          </Form.Item>
          <Form.Item label="" name="pinCode">
            <Select placeholder="Enter Pincode">
              <Option value="city1">213124</Option>
              <Option value="city2">423413</Option>
              <Option value="city3">123124</Option>
            </Select>
          </Form.Item>
          <Form.Item label="" name="country">
            <Input placeholder="Country" />
          </Form.Item>
          <Form.Item label="" name="state">
            <Input placeholder="State" />
          </Form.Item>
          <Form.Item label="" name="approvalstatus">
            <Input placeholder="Approval Status" />
          </Form.Item>
          <Form.Item label="" name="propertyNo">
            <InputNumber placeholder="Property Number" />
          </Form.Item>
          <Form.Item label="" name="managerName">
            <Input placeholder="Manager Name" />
          </Form.Item>
          <Form.Item label="" name="managerMobNo">
            <InputNumber placeholder="Manager Mobile Number" />
          </Form.Item>
          <Form.Item label="" name="ownerName">
            <Input placeholder="Owner Name" />
          </Form.Item>
          <Form.Item label="" name="customerCareNo">
            <InputNumber placeholder="Owner Mobile Number" />
          </Form.Item>
          <Form.Item label="" name="googleMapLink">
            <Input placeholder="Gmap Link(Manual copy)" />
          </Form.Item>
          {/* <Form.Item label="" name="email">
            <Radio.Group defaultValue="a">
              <Radio.Button value="a">Instagram</Radio.Button>
              <Radio.Button value="b">Facebook</Radio.Button>
              <Radio.Button value="c">twitter</Radio.Button>
              <Radio.Button value="d">Map</Radio.Button>
            </Radio.Group>
          </Form.Item> */}
          <Form.Item
            name="upload"
            label=""
            valuePropName="fileList"
            maxCount={5}
            multiple
            getValueFromEvent={normFile}
          >
            <Upload
              name="propertypictures"
              beforeUpload={(file) => {
                message.info(`${file.name} has been added to the upload list.`);
                setFileList([...fileList, file]);
                return false;
              }}
              onRemove={(file) => {
                const newFileList = fileList.filter((item) => item !== file);
                setFileList(newFileList);
              }}
            >
              <Button icon={<UploadOutlined />}>Property Pictures</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            name="propertyicons"
            label=""
            maxCount={3}
            multiple
            valuePropName="fileList1"
            getValueFromEvent={normFile1}
          >
            <Upload
              name="logo"
              beforeUpload={(file) => {
                message.info(`${file.name} has been added to the upload list.`);
                setFileList1([...fileList1, file]); // Add the selected file to the state
                return false;
              }}
              onRemove={(file) => {
                const newFileList1 = fileList1.filter((item) => item !== file);
                setFileList1(newFileList1);
              }}
            >
              <Button icon={<UploadOutlined />}>Property Icons</Button>
            </Upload>
          </Form.Item>
        </Form>
        <div style={{ marginTop: "20px" }} className="loginform formHeader">
          <Button
            style={{ width: "80%", justifySelf: "center" }}
            type="primary"
            onClick={() => form.resetFields()}
          >
            Clear
          </Button>
          <Button
            style={{ width: "80%", justifySelf: "center" }}
            type="primary"
            onClick={onFinish}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PartnerRegistration;
