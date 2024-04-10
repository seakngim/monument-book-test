import React, { useEffect, useState } from "react";
import { Space, Switch, Table, Transfer } from "antd";
// import difference from "lodash/difference";
import BookService from "../../../redux/service/BookService";
import { useDispatch, useSelector } from "react-redux";
import { setAllBook, setBookOfTheWeek, setNewArrival } from "../../../redux/slices/BookSlice";

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
      disabled: listDisabled,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;
      const rowSelection = {
        getCheckboxProps: (item) => ({
          disabled: listDisabled || item.disabled,
        }),
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows
            .filter((item) => !item.disabled)
            .map(({ key }) => key);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };
      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{
            pointerEvents: listDisabled ? "none" : undefined,
          }}
          onRow={({ key, disabled: itemDisabled }) => ({
            onClick: () => {
              if (itemDisabled || listDisabled) return;
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const leftTableColumns = [
  {
    dataIndex: "isbn",
    title: "ISBN",
  },
  {
    dataIndex: "itemname",
    title: "Item Name",
  },
  {
    dataIndex: "author",
    title: "Author",
  },
  {
    dataIndex: "category",
    title: "Category",
  },
  {
    dataIndex: "publisher",
    title: "Publisher",
  },
  {
    dataIndex: "publishdate",
    title: "Publish Date",
  },
];

const rightTableColumns = [
  {
    dataIndex: "isbn",
    title: "ISBN",
  },
  {
    dataIndex: "itemname",
    title: "Item Name",
  },
  {
    dataIndex: "author",
    title: "Author",
  },
  {
    dataIndex: "category",
    title: "Category",
  },
  {
    dataIndex: "publisher",
    title: "Publisher",
  },
  {
    dataIndex: "publishdate",
    title: "Publish Date",
  },
];
const Newarrivals = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const dispatch = useDispatch();

  const getAllBookService = () => {
    BookService.getAllBook(1, 5000)
      .then((res) => {
        console.log("res", res);
        dispatch(setAllBook(res.data));
      
      })
      .catch((error) => {
        console.error("Error fetching all books:", error);
        // Handle the error as needed (e.g., show an error message to the user)
      });
  };
  //Books of The Week
  const getNewsArrivalService = () => {
    BookService.getNeweArrival(1,500)
      .then((res) => {
        console.log("res.data", res.data);  
        dispatch(setNewArrival(res.data));
      })
      .catch((error) => {
        console.error("Error fetching best-selling books:", error);
        // Handle the error as needed, e.g., show a user-friendly message or dispatch an error action
      });
  };

  const resAllBook = useSelector((state) => state.book.allBook);
  const newArrival = useSelector((state) => state.book.newArrival)
  // console.log(bookOfTheWeek, "bookOfTheWeek")

  useEffect(() => {
    getAllBookService();
    getNewsArrivalService();

    // Initialize targetKeys with the keys of the booksOfTheWeek items
    setTargetKeys(initialTargetKeys);
  }, []);


  useEffect(() => {
    // Check if both resAllBook and bookOfTheWeek are available
    if (resAllBook && newArrival) {
      // Initialize targetKeys with the keys of the booksOfTheWeek items
      const initialTargetKeys = newArrival.map((item) => item.id);
      setTargetKeys(initialTargetKeys);
    }
  }, [resAllBook, newArrival]);
  const mockData = resAllBook.map((res) => ({
    key: res.id,
    isbn: res.isbn,
    itemname: res.item,
    author: res.author.map((autor) => autor.name).join(", "),
    category: res.categories.map((category) => category.name).join(", "),
    publisher: res.publishDate,
    publishdate: res.publishDate,
  }));

  const initialTargetKeys = newArrival.map((item) => item.id);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log("nextTargetKeys", nextTargetKeys);

    if (nextTargetKeys) {
    const data = {
      idList: nextTargetKeys
    };
    BookService.AddNewArrival(data)
      .then((res) => {
        console.log("Response from AddBestOfTheWeek:", res);
        getAllBookService();
        getNewsArrivalService();
      })
      .catch((error) => {
        console.error("Error in AddBestOfTheWeek:", error);
      });
    } 
    if(moveKeys) {
      const data = {
        idList: moveKeys
      };
      BookService.deletNewArrival(data)
      .then((res) => {
        console.log("Response from AddBestOfTheWeek:", res);
       
      })
      .catch((error) => {
        console.error("Error in AddBestOfTheWeek:", error);
      });
    }
    getAllBookService();
    getNewsArrivalService();
  };
  const triggerDisable = (checked) => {
    setDisabled(checked);
  };

  const triggerShowSearch = (checked) => {
    setShowSearch(checked);
  };

  return (
    <>
      <TableTransfer
        dataSource={mockData}
        targetKeys={targetKeys}
        disabled={disabled}
        showSearch={showSearch}
        onChange={onChange}
        filterOption={(inputValue, item) =>
          (item.isbn && item.isbn.toLowerCase().includes(inputValue.toLowerCase())) ||
          (item.itemname && item.itemname.toLowerCase().includes(inputValue.toLowerCase())) ||
          // (item.author && item.author.toLowerCase().includes(inputValue.toLowerCase())) ||
          // (item.category && item.category.toLowerCase().includes(inputValue.toLowerCase())) ||
          (item.publisher && item.publisher.toLowerCase().includes(inputValue.toLowerCase())) ||
          (item.publishdate && item.publishdate.toLowerCase().includes(inputValue.toLowerCase()))
        }
        leftColumns={leftTableColumns}
        rightColumns={rightTableColumns}
      />
      <Space
        style={{
          marginTop: 16,
        }}
      >
        <Switch
          unCheckedChildren="disabled"
          checkedChildren="disabled"
          checked={disabled}
          onChange={triggerDisable}
        />
        <Switch
          unCheckedChildren="showSearch"
          checkedChildren="showSearch"
          checked={showSearch}
          onChange={triggerShowSearch}
        />
      </Space>
    </>
  )
}

export default Newarrivals