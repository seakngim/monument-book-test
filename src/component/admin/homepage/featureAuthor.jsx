import React, { useEffect, useState } from "react";
import { Card, Divider, Popconfirm, Radio, Table } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import AuthorServise from "../../../redux/service/AuthorService";
import { setAllAuthor, setfeatureAuthor } from "../../../redux/slices/AuthorSlice";
import { AppstoreAddOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";


const FeatureAuthor = () => {
  const resAllAuthor = useSelector((state) => state.author.allAuthors);
  const resFeature = useSelector((state) => state.author.featureAuthor)
  const dispatch = useDispatch();
  const handleAdd = (key) => {
    AuthorServise.addFeature(key).then(()=>{
      HandleGetAllAuther();
      handleGetAuthorFeature();
    });
   
  };
  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      width: '7%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '13%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      length: 15,
      width: '35%',
    },
    {
      title: 'Quote',
      dataIndex: 'quote',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    }, {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) =>
        resAllAuthor.length >= 1 ? (
          <Popconfirm title="Sure to add to feature?" onConfirm={() => handleAdd(record.key)}>
            <a>To Feature</a>
          </Popconfirm>
        ) : null,
    },
  ];


  const HandleGetAllAuther = () => {
    AuthorServise.getAllAuthor(1, 500)
      .then((res) => {
        dispatch(setAllAuthor(res.body.data));
      })
      .catch((error) => {
        // Handle the error as needed (e.g., show an error message to the user)
      });
  };
  //Books of The Week
  const handleGetAuthorFeature = () => {
    AuthorServise.getfeatureAuthor()
      .then((res) => {
        dispatch(setfeatureAuthor(res.body.data));
      })
      .catch((error) => {

      });
  };

  const data = resAllAuthor && resAllAuthor.map((item, index) =>
  ({
    no: index + 1,
    key: item.id,
    name: item.name,
    description: item.description && item.description.length > 100 ? item.description.substring(0, 100) + "..." : item.description,
    quote: item.quote && item.quote.length > 30 ? item.quote.substring(0, 30) + "..." : item.quote,
    date: item.date
  })
  )

  useEffect(() => {
    HandleGetAllAuther();
    handleGetAuthorFeature();
    handleAdd();

  }, []);

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
        }}
        scroll={{
          y: 240,
        }}
      />
      <div className="grid grid-cols-3 gap-4">
        {resFeature && resFeature.length > 0 ? (
          <Card
            hoverable
            style={{
              width: 400,
              padding: "10px"
            }}
            cover={
              <img alt="example" src={resFeature[0].image} />
            }
          >
            <Meta title={resFeature[0].name} description={resFeature[0].quote} />
          </Card>
        ) : (
          <span>resFeature array is empty or undefined</span>
        )}
        <div className="col-span-2">
          <div>
            {resFeature && resFeature.length > 0 ? (
              <p className="text-lg line-clamp-4">{resFeature[0].description}</p>
            ) : (
              <span>resFeature array is empty or undefined</span>
            )}
          </div>
          <div className="overflow-x-scroll mt-4 w-full" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {resFeature && resFeature.length > 0 && resAllAuthor && resAllAuthor.length > 0 ? (
              <div className="flex flex-no-wrap">
                {resAllAuthor && resFeature[0].books.map((item) => (
                    
                  <Card
                    key={item.id}
                    hoverable
                    style={{ width: "200px", marginRight: "10px" }}
                    cover={<img alt="example" className="h-40" src={item.coverImg} />}
                  >
                    <Meta title={item.title} description={item.description} />
                  </Card>
                ))}
              </div>
            ) : (
              <span>resFeature array is empty or undefined</span>
            )}

          </div>
        </div>



      </div>
    </>

  );
}

export default FeatureAuthor