import React from "react";
import { Button, Form, Input, Modal } from "antd";
// import { CloseOutlined, FileDoneOutlined, FileExcelOutlined } from "@ant-design/icons";

const DetailComponent = (props) => {
  const { open, onCancel, views } = props;
  const [form] = Form.useForm();

  if (views?.length > 0) {
    form.setFieldsValue({
      code: views[views?.length - 1]?.code,
      username: views[views?.length - 1]?.username,
      systemname: views[views?.length - 1]?.systemname,
      rolename: views[views?.length - 1]?.rolename,
      status: views[views?.length - 1]?.status,
    });
  }
  return (
    <Modal
      open={open}
      title={<h3 style={{ color: "#3A53A4", marginTop: "25px" }}>  User Detail  <hr /> </h3>}
      okText="Approve"
      cancelText="Reject"
      onCancel={onCancel}
      //   closeIcon={<CloseOutlined style={{color: "#ff4d4f"}}  />}
      style={{ top: 80 }}
      footer={[
        // eslint-disable-next-line react/jsx-key
        <Button
          // icon={<FileExcelOutlined />}
          danger>
          Reject
        </Button>,
        // eslint-disable-next-line react/jsx-key
        <Button
          //   icon={<FileDoneOutlined />}
          style={{
            marginBottom: 10,
            border: 0,
            backgroundColor: "#3A53A4",
            color: "#fff",
          }}
          htmlType="submit"
        >
          Approve
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="horizontal"
        name="detailComponent"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <Form.Item label="Code" name="code">
          <Input
            style={{
              borderBottom: "1px solid #eee",
              fontWeight: "bold",
              borderRadius: 0,
            }}
            bordered={false}
            disabled
          />
        </Form.Item>
        <Form.Item label="User Name" name="username">
          <Input
            style={{
              borderBottom: "1px solid #eee",
              fontWeight: "bold",
              borderRadius: 0,
            }}
            bordered={false}
            disabled
          />
        </Form.Item>
        <Form.Item label="System Name" name="systemname">
          <Input
            style={{
              borderBottom: "1px solid #eee",
              fontWeight: "bold",
              borderRadius: 0,
            }}
            bordered={false}
            disabled
          />
        </Form.Item>
        <Form.Item label="Role Name" name="rolename">
          <Input
            style={{
              borderBottom: "1px solid #eee",
              fontWeight: "bold",
              borderRadius: 0,
            }}
            bordered={false}
            disabled
          />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Input bordered={false} style={{ color: "blue" }} disabled />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DetailComponent;
