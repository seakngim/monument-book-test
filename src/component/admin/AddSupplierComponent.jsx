import {
  CloseOutlined,
  FolderAddOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Upload,
  message,
} from "antd";
import React, { useState } from "react";
import UploadService from "../../redux/service/UploadService";
import SupplierService from "../../redux/service/SupplierService";
import LoadingComponent from "../auth/popup/LoadingComponent";

function AddSupplierComponent({ onOpenSupplier }) {
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleChange = async (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  const uploadButton = (
    <button
      className="w-40 h-40  border-dashed border-2 rounded-md"
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  const onFinish = (value) => {
    setLoading(true)
    const data = {
      name : value.name,
      phone: value.phone,
      email: value.email,
      image: imageUrl,
      address: value.address
    }
    setLoading(true)
    SupplierService.addSupplier(data).then(()=>{
      message.success("Add supplier successful!")
      onOpenSupplier();
      setLoading(false);
      setImageUrl(null); // Clear imageUrl
      form.resetFields(); // Reset form fields
    }).catch((e) => {
      setTimeout(() => {
        setLoading(false);
        // setIsShowErr(true);
      }, 2000);
    });

  };
  return (
    <>
    {loading && <LoadingComponent />}
      <div>
        <div>
        
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="rounded-lg p-5 pt-2 shadow-md h-[85vh]"
          >
            <Divider orientation="left">Add New Supplier</Divider>
            <Row gutter={24}>
              <Col span={12} className="lg:pr-20">
                <div className="grid grid-cols-2">
                  <div className="flex items-start justify-center">
                    <Upload
                      className="w-52"
                      customRequest={async ({ file, onSuccess, onError }) => {
                        try {
                          const imageUrl = await UploadService.upload(file);
                          onSuccess();
                          console.log("Image URL:", imageUrl);
                          setImageUrl(imageUrl.body.data);
                        } catch (error) {
                          onError(error);
                        }
                      }}
                      onChange={handleChange}
                    >
                      {" "}
                      {imageUrl ? (
                        <img
                          className="w-52 rounded-md"
                          src={imageUrl}
                          alt="bookCover"
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                  <div>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        { required: true, message: "Please enter quantity" },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone">
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                      <Input size="large" />
                    </Form.Item>
                    <Form.Item label="Address" name="address">
                      <Input size="large" />
                    </Form.Item>
                    <Space className="mt-4">
                      <Button icon={<CloseOutlined />} size="large" block danger>
                        Cancel
                      </Button>
                      <Button
                        icon={<FolderAddOutlined />}
                        size="large"
                        block
                        style={{
                          border: 0,
                          backgroundColor: "#3A53A4",
                          color: "#fff",
                        }}
                        htmlType="submit"
                      // disabled={require} // Disable the submit button if any required field is empty
                      >
                        Save
                      </Button>
                    </Space>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default AddSupplierComponent;
