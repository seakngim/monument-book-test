import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Card, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import CartService from "../redux/service/CartService";
import { useDispatch, useSelector } from "react-redux";
import { setAllCart } from "../redux/slices/CartSlice";
import $ from "jquery";
import BookService from "../redux/service/BookService";
import { HiOutlineArchive } from "react-icons/hi";
import OrderService from "../redux/service/OrderService";
import PaymentComponent from "./PaymentComponent";

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const CartComponent = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [combinedArray, setCombinedArray] = useState();
  const [cardId, setCartId] = useState();
  const onChange = (event) => {
    // $('#cart-item-sub-qty-').val(event.target.values)
    console.log();
    const quantities = []; // Array to store quantities
    const qtyInputs = $('[id^="cart-item-qty-"]');
    const checkedCheckboxes = $('input[id^="cart-item-check-"]:checked');
    console.log(checkedCheckboxes);
    var checkedChkbox = [];
    var total = parseInt(0);
    checkedCheckboxes.each(function (index, checkbox) {
      var dataAttributes = Object.values(checkbox.dataset);
      checkedChkbox.push(dataAttributes);
    });
    console.log("checkedCheckboxes", checkedChkbox);
    const itemId = checkedChkbox.map((item) => ({
      id: item[0],
      listId: item.id,
    }));
    console.log(checkedChkbox, " itemId");

    // cart-item-price-
    checkedChkbox.forEach((element) => {
      total =
        total +
        parseInt($("#cart-item-qty-" + element[0]).val() || 0) *
          parseInt($("#cart-item-price-" + element[0]).text());
    });
    checkedChkbox.forEach((element) => {
      quantities.push(parseInt($("#cart-item-qty-" + element[0]).val() || 0)); // Extract quantity and push to array
    });
    const combinedArray = itemId.map((item, index) => ({
      productId: item.id,
      qty: quantities[index] || 0, // If quantities[index] is undefined, default to 0
    }));
    setCombinedArray(combinedArray);
    console.log("combinedArray", combinedArray);

    console.log("Quantities:", quantities);
    console.log(total);
    setTotalPrice(total);
    console.log(checkedChkbox, "checkedChkbox");
  };
  const onChangeCheckbox = (event) => {
    const checkedCheckboxes = $('input[id^="cart-item-check-"]:checked');
    const checkedCartIds = [];

    checkedCheckboxes.each(function (index, checkbox) {
      checkedCartIds.push(checkbox.dataset.cartId);
    });

    console.log("Checked Cart IDs:", checkedCartIds);
    setCartId(checkedCartIds);
    onChange();
  };
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const handleGetAllCart = () => {
    CartService.getAllCart(1, 50)
      .then((res) => {
        console.log(res, "res");
        dispatch(setAllCart(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handledelete = (id) => {
    const data = {
      idList: [id],
    };
    console.log(data);
    CartService.delCart(data)
      .then(() => {
        // If deletion is successful, update the local state immediately
        const updatedCart = resCart.filter((item) => item.id !== id);
        dispatch(setAllCart(updatedCart)); // Update the Redux state
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };
  const resCart = useSelector((state) => state.cart.allCart);
  const data = resCart.map((item) => ({
    book: item.book,
    qty: item.qty,
    id: item.id,
  }));
  const handleBuy = () => {
    const data = {
      orderItem: combinedArray,
      type: true,
      qty: combinedArray.length,
      price: totalPrice + totalPrice / 10,
    };
    console.log(data);
    OrderService.newOrder(data).then((res) => {
      console.log("res api res", res);
      const cartid = {
        idList: cardId,
      };
      CartService.delCart(cartid)
        .then(() => {
          // If deletion is successful, update the local state immediately
          const updatedCart = resCart.filter((item) => item.id !== cartid);
          dispatch(setAllCart(updatedCart)); // Update the Redux state
        })
        .catch((error) => {
          console.error("Error deleting item:", error);
        });
      handleGetAllCart();
    });
  };

  console.log("resCart", resCart);
  useEffect(() => {
    handleGetAllCart();
  }, []);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [modalData, setModalData] = useState("Content of the modal");
  const showModal = () => {
    setOpen(true);
    const data = {
      orderItem: combinedArray,
      type: true,
      qty: combinedArray.length,
      price: totalPrice + totalPrice / 10,
    };
    setModalData(data)
  };
  const handleOk = () => {
    setOpen(false);   
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <div className="w-[80%] m-auto">
      <Breadcrumb
        className="pt-5 pb-3"
        items={[
          {
            title: (
              <Link to="/" className="text-black me-5">
                Home
              </Link>
            ),
          },
          {
            title: <p className="text-[#292D77]">Shopping Cart</p>,
          },
        ]}
      />
      <div className="flex text-left border-b pb-3 border-gray-400">
        <p className="text-lg font-bold text-[#292D77] dark:text-[#292D77]">
          Shopping Cart
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        {data.map((detail) => (
          // eslint-disable-next-line react/jsx-key

          <div
            key={detail.id}
            className="col-span-2 grid md:grid-cols-1 sm:grid-cols-1 pt-10 "
          >
            <div className="col-span-2 grid md:grid-cols-4 sm:grid-cols-1 ">
              <div className="col-span-1">
                <div className=" ms-8 rounded-md flex items-center ">
                  <div>
                    {" "}
                    <input
                      type="checkbox"
                      id={"cart-item-check-" + detail.book.id}
                      max={detail.book.qty}
                      data-c-id={detail.book.id}
                      data-cart-id={detail.id}
                      onChange={onChangeCheckbox}
                    />
                  </div>
                  <div className="px-5">
                    <img src={detail.book.coverImg} alt={`Image`} />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="mt-5 ms-8 ">
                  <div>
                    <p className="text-lg text-green-700  line-clamp-1">
                      {detail.book.title}
                    </p>
                    <p className="mt-2 line-clamp-1 text-sm text-gray-400">
                      {detail.book.description}
                    </p>
                    <p className="text-lg text-green-700">
                      <span
                        name={"cart-item-price-" + detail.book.id}
                        id={"cart-item-price-" + detail.book.id}
                      >
                        {detail.book.price}
                      </span>{" "}
                      <span>$</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="items-end">
                <div className="flex justify-end">
                  <Button
                    className="flex items-center text-red-400 border-none shadow-sm"
                    onClick={() => handledelete(detail.id)}
                  >
                    <HiOutlineArchive className="mx-2" /> remove
                  </Button>
                </div>
                <div className="mt-5">
                  <>
                    <div className="flex justify-end items-center  ">
                      <input
                        id={"cart-item-qty-" + detail.book.id}
                        name={"cart-item-qty-" + detail.book.id}
                        type="number"
                        max={detail.book.qty}
                        min={0}
                        onChange={onChange}
                        defaultValue={detail.qty}
                        className="border rounded-sm py-1 pl-3 w-28"
                      />
                      <p className="ml-5 justify-end">
                        <span>In stock </span>
                        {detail ? detail.book.qty : 0}
                        <span> item</span>
                      </p>
                    </div>
                  </>
                </div>
              </div>
            </div>
            <div className="border-b-2 text-right flex justify-end">
              <div className="">
                <span>Subtotal</span>(
                <span
                  id={"cart-item-sub-qty-" + detail.book.id}
                  className="text-blue-600"
                >
                  {detail ? detail.qty : 0}
                </span>
                item):{" "}
                <span className="text-blue-900 font-bold">
                  {detail ? detail.qty * detail.book.price : 0} $
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="col-span-1 my-5">
          <Card
            title="Order summary"
            bordered={false}
            style={{
              width: 300,
              backgroundColor: "#f7f8fa",
            }}
          >
            <div className="flex justify-between">
              <p className="w-[50%]">Subtotal </p>
              <p className="text-end  w-[50%]">
                <span>$ </span>
                {totalPrice}
              </p>
              <hr />
            </div>
            <div className="flex justify-between">
              <p className="w-[50%]">delivery </p>
              <p className="text-end  w-[50%]">free</p>
            </div>
            <div className="flex justify-between">
              <p className="w-[50%]">TAX </p>
              <p className="text-end  w-[50%]">10%</p>
            </div>
            <div className="border py-2 px-5 flex justify-between">
              <p className="w-[50%]">AMOUNT </p>
              <p className="text-end  w-[50%]">
                <span>$ </span>
                {totalPrice + totalPrice / 10}
              </p>
            </div>
            <div className="flex justify-end mt-5">
              {token ? (
                <Button type="primary" onClick={showModal}>
                  Open Modal with async logic
                </Button>
              ) : (
                // <button onClick={handleBuy}>Proceed to Checkout</button>
                <Link to="/sign-in">Proceed to Checkout</Link>
              )}
            </div>
          </Card>
        </div>
      </div>
      <Modal
        title="Payment methods"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <PaymentComponent modalData={modalData} onOk={handleOk}/>
      </Modal>
    </div>
  );
};

export default CartComponent;
