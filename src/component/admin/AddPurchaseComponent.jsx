import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Divider,
  Select,
  InputNumber,
  Modal,
} from "antd";
import BookService from "../../redux/service/BookService";
import { useSelector, useDispatch } from "react-redux";
import { setAllBook } from "../../redux/slices/BookSlice";
import LoadingComponent from "../auth/popup/LoadingComponent";
import SupplierService from "../../redux/service/SupplierService";
import { setallAllSupplier } from "../../redux/slices/SupplierSlice";
import AddSupplierComponent from "./AddSupplierComponent";
import { HiPlusCircle } from "react-icons/hi";
import CreateNewComponent from "./createNewComponent";

const AddPurchaseComponent = ({ onOpen }) => {

  const [form] = Form.useForm();
  const handleCancel = () => {
    console.log("Clicked cancel button");
    // setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const handleSelectChange = (value) => {
    setSelectedBook(value);
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const resAllBook = useSelector((state) => state.book.allBook);
  const resAllSupplier = useSelector((state) => state.supplier.allSupplier)
  // console.log(resAllBook);

  const handlegetAllBook = () => {
    BookService.getAllBook(1, 500).then((res) => {
      // console.log(res);
      dispatch(setAllBook(res.data));
    });
  };
  const handlegetAllSupplier = () => {
    SupplierService.getAllSupplier().then((res) => {
      dispatch(setallAllSupplier(res.data));
    });
  };

  const onFinish = (value) => {

    setLoading(true)
    const data = {
      qty: value.qty,
      cost: value.cost,
      tax: value.tax,
      invoice: value.qty,
      supplier: value.supplier,
      book: value.isbn,

    };
    console.log(data);
    BookService.Purchasebook(data).then((res) => {
      handlegetAllBook();
      setLoading(false)
      onOpen();
      form.resetFields(); // Reset form fields
    }).catch((e) => {
      setTimeout(() => {
        setLoading(false);
        // setIsShowErr(true);
      }, 2000);
    });
  };

  useEffect(() => {
    handlegetAllBook();
    handlegetAllSupplier();
  }, []);
  const [openSupplier, setOpenSupplier] = useState(false);
  const showModalSupplier = () => {
    setOpenSupplier(true);
  };
  const handleOkSupplier = () => {
    setOpenSupplier(false);
    handlegetAllSupplier();
  };
  const handleCancelSupplier = () => {
    console.log("Clicked cancel button");
    setOpenSupplier(false);
  };
  const [openBook, setOpenBook] = useState(false);
  const showModalBook = () => {
    setOpenBook(true);
  };
  const handleOkBook = () => {
    setOpenBook(false);
    handlegetAllBook();
  };
  const handleCancelBook = () => {
    console.log("Clicked cancel button");
    setOpenBook(false);
  };

  return (
    <>
      {loading && <LoadingComponent />}
      <div className="grid">
        <div className="">
          <Form
            layout="vertical"
            onFinish={onFinish}
            form={form}
            className="rounded-lg pt-2 shadow-md p-10  h-[85vh] "
          >
            <Divider orientation="left">Add New Purchase</Divider>
            <Row gutter={24}>
              <Col span={12} className="lg:pr-20 ">
                <div className="flex gap-3 items-center">
                  <Form.Item
                    className="w-full "
                    label="ISBN or Title"
                    name="isbn"
                    rules={[{ required: true, message: "Please select ISBN" }]}
                  >
                    <Select
                      size="large"
                      placeholder="Please select ISBN"
                      showSearch={true}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      onChange={handleSelectChange}
                    >
                      {resAllBook.map((book) => (
                        <Select.Option key={book.id} value={book.id}>
                          {book.isbn + "(" + book.title + ")"}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>

                  <HiPlusCircle className="text-blue-600" onClick={showModalBook} size={30} />

                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="flex gap-3 items-center">
                    <Form.Item
                      className="w-full"
                      label="Supplier"
                      name="supplier"
                      rules={[{ required: true, message: "Please select Supplier" }]}
                    >
                      <Select
                        size="large"
                        placeholder="Please select supplier"
                        showSearch={true}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        onChange={handleSelectChange}
                      >
                        {resAllSupplier.map((supplier) => (
                          <Select.Option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <HiPlusCircle className="text-blue-600" onClick={showModalSupplier} size={30} />
                  </div >
                  <Form.Item
                    label="Invoice"
                    name="invoice"
                    className="col-span-1"
                  >
                    <Input size="large" />
                  </Form.Item></div>


                <div className="grid grid-cols-3 gap-4">
                  <Form.Item
                    label="Quantity"
                    name="qty"
                    rules={[
                      { required: true, message: "Please enter quantity" },
                    ]}
                  >
                    <InputNumber className="w-full" size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Cost"
                    name="cost"
                    rules={[{ required: true, message: "Please enter price" }]}
                  >
                    <InputNumber className="w-full" size="large" />
                  </Form.Item>
                  <Form.Item
                    label="Tax"
                    name="tax"
                  >
                    <Input size="large" />
                  </Form.Item>
                </div>

                <Form.Item className="flex justify-end">
                  <Button type="primary" htmlType="submit" className="bg-blue-600 mr-5 w-24">
                    Submit
                  </Button>
                  <Button htmlType="reset" className="w-24">Clear</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
        <div></div>
      </div>
      <Modal
        // title="LIST ALL Supplier"
        open={openSupplier}
        width={1000}
        onCancel={handleCancelSupplier}
        footer={null}
      >
        <div>
          <AddSupplierComponent
            onOpenSupplier={handleOkSupplier}
          />
        </div>
      </Modal>
      <Modal
        // title="Create New Book"
        open={openBook}
        width={1200}
        onCancel={handleCancelBook}
        footer={null}
      >
        <div>
          <CreateNewComponent
            onOpenBook={handleOkBook}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddPurchaseComponent;
