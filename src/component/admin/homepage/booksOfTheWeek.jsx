import React, { useEffect, useState } from "react";
import { Button, Space, Switch, Table, Transfer } from "antd";
// import difference from "lodash/difference";
import BookService from "../../../redux/service/BookService";
import { useDispatch, useSelector } from "react-redux";
import { setAllBook, setBookOfTheWeek } from "../../../redux/slices/BookSlice";

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

const BooksOfTheWeek = () => {
  const [targetKeys, setTargetKeys] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const dispatch = useDispatch();



  const getAllBookService = () => {
    BookService.getAllBook(1, 500)
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
  const booksOfTheWeekService = () => {
    BookService.getBookOfTheWeek(1,500)
      .then((res) => {
        console.log("res.data", res.data);
        dispatch(setBookOfTheWeek(res.data));
      })
      .catch((error) => {
        console.error("Error fetching best-selling books:", error);
        // Handle the error as needed, e.g., show a user-friendly message or dispatch an error action
      });
  };

  const resAllBook = useSelector((state) => state.book.allBook);
  const bookOfTheWeek = useSelector((state) => state.book.bookOfTheWeek)
  console.log(bookOfTheWeek, "bookOfTheWeek")

  useEffect(() => {
    getAllBookService();
    booksOfTheWeekService();
    // Initialize targetKeys with the keys of the booksOfTheWeek items
    setTargetKeys(initialTargetKeys);
  }, []);


  useEffect(() => {
    // Check if both resAllBook and bookOfTheWeek are available
    if (resAllBook && bookOfTheWeek) {
      // Initialize targetKeys with the keys of the booksOfTheWeek items
      const initialTargetKeys = bookOfTheWeek.map((item) => item.id);
      setTargetKeys(initialTargetKeys);
    }
  }, [resAllBook, bookOfTheWeek]);
  const mockData = resAllBook.map((res) => ({
    key: res.id,
    isbn: res.isbn,
    itemname: res.title,
    author: res.author.map((autor) => autor.name).join(", "),
    category: res.categories.map((category) => category.name).join(", "),
    publisher: res.publishDate,
    publishdate: res.publishDate,
  }));

  const initialTargetKeys = bookOfTheWeek.map((item) => item.id);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    console.log("nextTargetKeys", nextTargetKeys);
    console.log("moveKeys", moveKeys);

    if (nextTargetKeys) {
      // Add books to the Books of the Week
      const data = {
        idList: nextTargetKeys,
      };
      BookService.AddBestOfTheWeek(data)
        .then((res) => {
          console.log("Response from AddBestOfTheWeek:", res);
          booksOfTheWeekService()
        })
        .catch((error) => {
          console.error("Error in AddBestOfTheWeek:", error);
        });
    }
    if (moveKeys) {
      // Delete books from the Books of the Week
      const data = {
        idList: moveKeys,
      };
      BookService.deletBestOfTheWeek(data)
        .then((res) => {
          console.log("Response from deletBestOfTheWeek:", res);
          booksOfTheWeekService();
        })
        .catch((error) => {
          console.error("Error in deletBestOfTheWeek:", error);
        });
    }
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
  );
};

export default BooksOfTheWeek;
