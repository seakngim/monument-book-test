import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { useDispatch, useSelector } from "react-redux";
import { setCreditCardById } from "../../redux/slices/CreditCardSlice";
import CreditCardService from "../../redux/service/CreditCardService";
import { Link } from "react-router-dom";

function EditCardComponent() {
  const param = useParams();
  const dispatch = useDispatch();
  const resCreditCardById = useSelector(
    (state) => state.creditCard.creditCardById
  );
  const [formData, setFormData] = useState({
    // id: "",
    fullName: "",
    cardNumber: "",
    cvv: "",
    expiryMonth: "",
    expiryYear: "",
    city: "",
  });
  useEffect(() => {
    setFormData({
      //   id: resCreditCardById.id,
      fullName: resCreditCardById.fullName,
      cardNumber: resCreditCardById.cardNumber,
      cvv: resCreditCardById.cvv,
      expiryMonth: resCreditCardById.expiryMonth,
      expiryYear: resCreditCardById.expiryYear,
      city: resCreditCardById.city,
      address: resCreditCardById.address,
    });
  }, [resCreditCardById]);
  // handle get card
  const handleGetCard = () => {
    CreditCardService.getCreditCardById(param.id).then((res) => {
      console.log(res, "res");
      dispatch(setCreditCardById(res.data));
    });
  };
  const onFinish = (value) => {
    console.log(formData, "value");
    CreditCardService.updateCreditCardById(param.id, formData).then((res) => {
      console.log("res", res);
    });
  };
  useEffect(() => {
    handleGetCard();
  }, []);
  return (
    <>
      <div className="w-[700px] flex m-auto p-10 shadow-md">
        <Form
          className="w-full"
          name="form_item_path"
          layout="vertical"
          onFinish={onFinish}
        >
          <div className="flex justify-between">
            <p className="text-2xl mb-2 font-mono">Edit card</p>
            <Link to={"/profile"}>
              <Button className="">x</Button>
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Form.Item className="col-span-3" label="FULL NAME" name="fullName">
              <Input
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
            <Form.Item className="col-span-1" label="CVV" name="cvv">
              <Input
                value={formData.cvv}
                onChange={(e) =>
                  setFormData({ ...formData, cvv: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
          </div>
          <div className="">
            <Form.Item label="Card Number" name="cardNumber">
              <Input
                value={formData.cardNumber}
                onChange={(e) =>
                  setFormData({ ...formData, cardNumber: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4 w-80">
            <Form.Item
              className="col-span-1"
              label="Expire Year"
              name="expiryYear"
            >
              <Input
                value={formData.expiryYear}
                onChange={(e) =>
                  setFormData({ ...formData, expiryYear: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
            <Form.Item className="col-span-1" label="Month" name="expiryMonth">
              <Input
                value={formData.expiryMonth}
                onChange={(e) =>
                  setFormData({ ...formData, expiryMonth: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Form.Item className="col-span-2" label="Address" name="address">
              <Input
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
              <p></p>
            </Form.Item>
            <Form.Item className="col-span-2" label="City" name="city">
              <Input
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
              />
              <p></p>
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

export default EditCardComponent;
