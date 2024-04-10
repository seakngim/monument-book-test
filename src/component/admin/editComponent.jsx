import { Button, Col, Divider, Form, Input, Row, Space } from "antd";
import {CloseOutlined, UndoOutlined } from "@ant-design/icons";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditData = (props) => {
  const { isbn, tilte, discription, price, dataEdit, setdataData } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [formeditdata] = Form.useForm();
  
  const onFinish = (values) => {
    setdataData(values);
    navigate("/", { state: { previousPath: pathname } });
  };

  const handleOnchange = (values) => {
    console.log({...dataEdit,  [values.target.name]: values.target.value})
  };

  if (dataEdit?.length > 0) {
    formeditdata.setFieldsValue({
      isbn: dataEdit[dataEdit?.length - 1]?.isbn,
      tilte: dataEdit[dataEdit?.length - 1]?.tilte,
      discription: dataEdit[dataEdit?.length - 1]?.discription,
      price: dataEdit[dataEdit?.length - 1]?.price,
    })
  }

  return (
    <Row
      style={{
        padding: 10,
        paddingBottom: 40,
        borderRadius: "5px",
        background: "#fff",
      }}
    >
      <Col span={12} >
        <Divider orientation="left" style={{color: "red",}}>Edit data</Divider>
        <Form
        //   form={formeditdata}
          name="editdata" 
          layout="vertical"
          onFinish={onFinish}
          style={{padding: "0px 10px 5px 40px" }}
        >
          <Form.Item
            label="ISBN"
            name="isbn"
            rules={[{required: true } ]}
          >
            <Input onChange={handleOnchange} value={isbn} />
          </Form.Item>
          <Form.Item
            label="Book Name"
            name="tilte"
            rules={[{required: true } ]}
          >
            <Input onChange={handleOnchange} value={tilte} />
          </Form.Item>
          <Form.Item
            label="Description"
            name="discription"
            rules={[{required: true } ]}
          >
            <Input onChange={handleOnchange} value={discription} />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{required: true } ]}
          >
            <Input onChange={handleOnchange} value={price}  />
          </Form.Item>
          <Form.Item
            label="Publisher"
            name="price"
            rules={[{required: true } ]}
          >
            <Input onChange={handleOnchange} value={price}  />
          </Form.Item>
          <Space>
            <Button icon={<CloseOutlined />} block danger onClick={() => navigate("/data", {state: {previousPath: pathname}})}>Cancel</Button>
            <Button icon={<UndoOutlined />} block style={{border: 0 , backgroundColor: "#3A53A4", color: "#fff"}} htmlType="submit" >Update</Button>
          </Space>
        </Form>
      </Col>
    </Row>
  );
};

export default EditData;
