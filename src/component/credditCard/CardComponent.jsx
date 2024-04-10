import { Button, Form, Input, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CreditCardService from "../../redux/service/CreditCardService";


function CreditCardComponent() {
  const navigate = useNavigate();
  const onFinish = (value) => {
    console.log(value, "value");
    CreditCardService.addCreditCard(value).then(()=>{
      message.success("card add success!")
      navigate(-1)
    })
  };
  const goBack = (value) => {
    console.log(value, "value");
    navigate(-1)
  };
  return (
    <>
      <div className="w-[700px] flex m-auto p-10 shadow-md mt-5">
        <Form
          className="w-full"
          name="form_item_path"
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="flex justify-between">
            <p className="text-2xl mb-2 font-mono">Edit card</p>
            
              <Button className="" onClick={goBack}>x</Button>
           
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Form.Item
              className="col-span-3"
              label="FULL NAME"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your fullName!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="col-span-1"
              label="CVV"
              name="cvv"
              rules={[
                {
                  required: true,
                  message: "Please input your cvv!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="">
            <Form.Item
              label="Card Number"
              name="cardNumber"
              rules={[
                {
                  required: true,
                  message: "Please input your cardNumber!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4 w-80">
            <Form.Item
              className="col-span-1"
              label="Expire Year"
              name="expiryYear"
              rules={[
                {
                  required: true,
                  message: "Please input your expiryYear!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="col-span-1"
              label="Month"
              name="expiryMonth"
              rules={[
                {
                  required: true,
                  message: "Please input your expiryMonth!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Form.Item
              className="col-span-2"
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your Address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              className="col-span-2"
              label="City"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <Button
            type="default"
            htmlType="submit"
            className="bg-blue-600 text-white"
          >
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default CreditCardComponent;
