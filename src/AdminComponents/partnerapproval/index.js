import { useState, lazy, useEffect } from "react";
import {
  Card,
  DatePicker,
  Tooltip,
  Image,
  Select,
  message,
  Table,
  Tabs,
  Button,
  Input,
  Tag,
} from "antd";
import { useSelector } from "react-redux";
import "./styles.css";
import Request from "../../request";
import moment from "moment";
import _ from "lodash";
import async, { auto } from "async";
import { DateFormat } from "../../settings";

const { Search } = Input;
const { RangePicker } = DatePicker;

const PartnerApproval = (props) => {
  const [loader, setLoader] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [filters, setFilters] = useState({});
  const [department, setDeptName] = useState([]);
  const [callers, setCaller] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [media, setmedia] = useState("");

  const apiFunction = async () => {
    setLoader(true);
    let { user, token, success, message, data } =
      await Request.getPartnerApproval();
    setLoader(false);
    console.log(data, "iagit the dataaaaaaaaaa");
    let newData = [];
    if (success && data.length) {
      async.forEach(
        data,
        (val, cb) => {
          let obj = {
            ...val,
          };
          newData.push(obj);
          cb();
        },
        () => {
          setDataSource(newData);
        }
      );
    } else {
      setDataSource([]);
    }
  };

  useEffect(() => {
    apiFunction();
  }, []);

  const onSearch = (value) => console.log(value);

  const columns = [
    {
      title: "Pid",
      dataIndex: "propertyNo",
      key: "propertyNo",
      fixed: "left",
      search: true,
    },
    {
      title: "Property Name",
      dataIndex: "propertyName",
      key: "propertyName",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Owner Name",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    {
      title: "Owner No.",
      dataIndex: "managerMobNo",
      key: "managerMobNo",
    },
    {
      title: "Status",
      dataIndex: "approvalstatus",
      key: "approvalstatus",
    },
    // {
    //   title: 'Active',
    //   dataIndex: 'active',
    //   key: 'active',
    //   render: (val, r) => {
    //     return <Tag style={{borderRadius:30,width:60,display:"flex",justifyContent:"center"}}  color={val ? '#2fd838' : "#f50"}>{val ? 'Yes' : 'No'}</Tag>
    //   }
    // },
    // {
    //   title: 'Created At',
    //   dataIndex: 'createdon',
    //   key: 'createdon',
    //   width: 180,
    //   defaultSortOrder: 'descend',
    //   sorter: (a, b) => a.createdon - b.createdon,
    //   render: (val, r) => {
    //     return <Tag>{moment(val).format('DD-MM-YYYY')}</Tag>
    //   }
    // },
  ];

  return (
    <div
      style={{
        gridGap: "5px",
        flexWrap: "wrap",
        display: "flex",
        justifyContent: "space-between",
      }}
      className="partnerapprHead"
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        <div className="marginRight fitcontent">
          <RangePicker
            onChange={(v) => setFilters((prev) => ({ ...prev, date: v }))}
            value={filters?.date}
          />
        </div>
        <div className="marginRight fitcontent">
          <Select
            showSearch
            allowClear={true}
            onChange={(val) => setFilters((prev) => ({ ...prev, city: val }))}
            style={{
              width: 200,
              border: "1px solid #e1e3e8",
              borderRadius: "4px",
            }}
            placeholder="City"
            value={filters?.city}
            options={_.map(department, (val) => {
              return { label: val?.city, value: val?.id };
            })}
          />
        </div>
        <div className="marginRight fitcontent">
          <Select
            showSearch
            allowClear={true}
            onChange={(val) => setFilters((prev) => ({ ...prev, status: val }))}
            style={{
              width: 200,
              border: "1px solid #e1e3e8",
              borderRadius: "4px",
            }}
            placeholder="Status"
            value={filters?.status}
            options={_.map(department, (val) => {
              return { label: val?.status, value: val?.id };
            })}
          />
        </div>
        <div className="marginRight fitcontent">
          <Select
            showSearch
            allowClear={true}
            onChange={(val) => setFilters((prev) => ({ ...prev, owner: val }))}
            style={{
              width: 200,
              border: "1px solid #e1e3e8",
              borderRadius: "4px",
            }}
            placeholder="Owner"
            value={filters?.owner}
            options={_.map(department, (val) => {
              return { label: val?.owner, value: val?.id };
            })}
          />
        </div>
      </div>
      <div
        className="marginTop"
        style={{ width: "100%", height: "-webkit-fill-available" }}
      >
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          loading={loader}
          scroll={{ x: "max-content" }}
        />
      </div>
    </div>
  );
};

export default PartnerApproval;
