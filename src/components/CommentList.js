import "../style.css";
import React, { useEffect, useState, useCallback } from "react";
import { Form, Input, Table, Modal, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import Button from "antd-button-color";
import Axios from "axios";

function CommentList(titleData, id) {

    const [comment, setComment] = useState([]);
    let dataArry = [];

    const [query, setQuery] = useState("");

    const handleQuery = (e) => {
        setQuery(e.target.value);
    };

    const submitTest = () => {
        Axios.get("http://localhost:3001/", {
            params: {
                movie_title : titleData.titleData,
                movie_id : titleData.id,
                comment_detail : query,
            }}).then(() => {
                setQuery("");
                loadComments();
        });
    };

    const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');

    const handleOkEdit = () => {
        console.log(data.key);
        console.log(value);
        Axios.get("http://localhost:3001/update", {
            params: {
                comment_id : data.key,
                comment_detail : value,
            }}).then(() => {
                setIsModalVisibleEdit(false);
                loadComments();
        });
    };
    
    const handleCancelEdit = () => {
        setIsModalVisibleEdit(false);
    };

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const editTest = (record) => {
        setData(record);
        setValue(record.comment_detail);
        setIsModalVisibleEdit(true);
    };

    const deleteTest = (record) => { 
        Modal.confirm({ 
            title: "Are you sure you want to delete this?", 
            icon: <ExclamationCircleOutlined />,
            content: 'Deleted comments are not recovered.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => { 
                Axios.get("http://localhost:3001/delete", {
                    params: {
                        comment_id : record.key,
                    }
                }).then(() => {
                        loadComments();
                });
            },
        }); 
    }; 

    const getComments = async() => {
        const comments = await Axios.get(`http://localhost:3001/list`, { 
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                params: {
                    id : titleData.id,
                },
                body: JSON.stringify(),
        });
        dataArry = comments.data;
        getListData(dataArry);
    };

    const loadComments = async() => {
        const comments = await Axios.get(`http://localhost:3001/list`, { 
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                params: {
                    id : titleData.id,
                },
                body: JSON.stringify(),
        });
        getListData("DeleteData");
        dataArry = comments.data;
        getListData2(dataArry);
    };

    const getListData = (dataArry) => {
        if(dataArry === "DeleteData") {
            setComment(comment.filter(comment => data.comment_detail === query));
        }
        else {
            var arr2 = dataArry.filter((data) => (data.showYn == 1));
            arr2.map((data) => {
                let value = {
                    key:data.comment_id.toString(),
                    movie_title:data.movie_title,
                    comment_detail:data.comment_detail,
                    write_date:data.write_date,
                    edit_date:data.edit_date,
                };
                setComment(comment => [...comment, value]);
            });
        }
    };

    const getListData2 = (dataArry) => {
        var arr2 = dataArry.filter((data) => (data.showYn == 1));
        arr2.map((data) => {
            let value = {
                key:data.comment_id.toString(),
                movie_title:data.movie_title,
                comment_detail:data.comment_detail,
                write_date:data.write_date,
                edit_date:data.edit_date,
            };
            setComment(comment => [...comment, value]);
        });
    };

    const columns = [
        {
            title: '번호',
            dataIndex: 'key',
            key: 'key',
        },
        {
          title: '영화명',
          dataIndex: 'movie_title',
          key: 'movie_title',
        },
        {
          title: '한줄평',
          dataIndex: 'comment_detail',
          key: 'comment_detail',
        },
        {
          title: '작성일',
          dataIndex: 'write_date',
          key: 'write_date',
        },
        {
            title: '최근 수정일',
            dataIndex: 'edit_date',
            key: 'edit_date',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{display:"flex", justifyContent: "center"}}> 
                <EditOutlined 
                style={{ color: "black" }} 
                onClick={() => editTest(record)} 
                /> 
                <div style={{width:"30px",height:"1px"}}></div>
                <DeleteOutlined 
                style={{ color: "red"}} 
                onClick={() => deleteTest(record)} 
                /> 
                </div> 
            ),
        },
    ];

    useEffect(() => {
        getComments();
      }, []);

    return  ( 
    <div>
        <div className="Title" style={{ display: "flex", justifyContent: "center"}}>
            <div style={{paddingTop:"7px", paddingLeft:"7px"}}><h3>한줄평</h3></div>
                <div style={{ paddingLeft: "2rem" }}>
                <Input 
                    id="input"
                    maxLength={48}
                    style={{
                        height: 40,
                        width: 840,
                    }}
                    onChange={handleQuery}
                    value={query}
                /> <Button type="primary" size="large" onClick={submitTest}>남기기</Button>
            </div>
        </div>
        <div className="Title" style={{ display: "flex", justifyContent: "center"}}>
            <Table style={{width:"1010px", paddingTop:"30px"}}
                dataSource={comment} columns={columns} />
        </div>
        <Modal
            visible={isModalVisibleEdit}
            title="Edit Review"
            onOk={handleOkEdit}
            onCancel={handleCancelEdit}
            footer={[
                <Button key="back" onClick={handleCancelEdit}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOkEdit}>
                    Save
                </Button>
            ]}
        >
            <div>
                <Form layout="vertical" autoComplete="off">
                    <Form.Item label="번호">
                        <Input placeholder={data.key} readOnly={true} value={data.key} id="c_id"/>
                    </Form.Item>
                    <Form.Item label="영화명">
                        <Input placeholder={data.movie_title} readOnly={true} value={data.movie_title} id="c_t"/>
                    </Form.Item>
                    <Form.Item label="한줄평">
                        <Input value={value} onChange={onChange} id="c_d" />
                        <li/>
                    </Form.Item>
                    <Form.Item label="작성일">
                        <Input placeholder={data.write_date} readOnly={true} value={data.write_date} id="w_d"/>
                    </Form.Item>
                </Form>
                <Typography>
                    {/* <pre>{comment_n}번</pre> */}
                </Typography>
            </div>
        </Modal>
    </div>
    );
  }



export default CommentList;