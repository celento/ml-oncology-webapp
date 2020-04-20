import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import { withRouter ,withHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import {Mongo} from 'meteor/mongo';
import Notifications, {notify} from 'react-notify-toast';
import {createContainer} from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { css } from 'react-emotion';
import { BarLoader } from 'react-spinners';
import Rodal from 'rodal';
import { Descriptions, Badge, Spin,Result,Table,Button,Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { patientDB } from '../../collections/patientDB';
// import AshaContainer from '../containers/AshaContainer';
// import AshaUserCard from './components/AshaUserCard';
import { SmileOutlined,SearchOutlined } from '@ant-design/icons';
import { ansDB } from '../../collections/ansDB';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;



class OfficialFeed extends TrackerReact(React.Component){

  constructor(props) {
    super(props);
    this.state = { 
    
      patientList:null,
      loaded:false,
      searchText: '',
      searchedColumn: '',
      
   };
 

  }


  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };


  
render(){  

  

  if(!this.props.answer){
    return(<div><Spin size="large" /></div>)
  }

  console.log(this.props.answer);



  console.log(Object.keys(this.props.answer).length)

  if(Object.keys(this.props.answer).length<=0){
   return(<div>
  <Result
    icon={<SmileOutlined />}
    title="Great! No more pending requests"
  />
   </div>)


  
  }

  
const data = this.props.answer;
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     address: 'London No. 2 Lake Park',
  //   },
  // ];


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
     
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
    ...this.getColumnSearchProps('name'),

  },

  {
    title: 'Gender',
    dataIndex: 'gender',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },

  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },

  {
    title: 'Panchayat',
    dataIndex: 'panchayat',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },

  {
    title: 'Ward',
    dataIndex: 'ward',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },

  {
    title: 'Health Score',
    dataIndex: 'score',
    defaultSortOrder: 'descend',
    sorter: (a, b) => {a.age - b.age},
  render: (a) =>{
    if(a>=3 && a<=5)return(<p className="alert">{a}</p>) 
    else
    if(a>5)return(<p className="danger">{a}</p>) 
    else
    return(<p className="good">{a}</p>) 
  
  },
  },

  {
    title: 'Submission',
    dataIndex: 'date',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },

  {
    title: 'Action',
    key: 'action',
    dataIndex: '_id',
    render: (a) => <a target="_blank" href={"/official/viewResults?id="+a}>View Answers</a>,
  },
  // {
  //   title: 'Address',
  //   dataIndex: 'address',
     
  //   filterMultiple: false,
  //   onFilter: (value, record) => record.address.indexOf(value) === 0,
  //   sorter: (a, b) => a.address.length - b.address.length,
  //   sortDirections: ['descend', 'ascend'],
  // },
];



  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }
  

  return(
    <div>
      <h1>Live Feed</h1>
      {/* <br/>
      <br/>s
      {this.props.patientList.map(patient=><AshaUserCard info={patient}/>)} */}

        <Table columns={columns} dataSource={data} onChange={onChange} />

    </div>
  )

 };
}

export default createContainer((props)=>{
  Meteor.subscribe('ansdb-all');
    return{ 
      answer:ansDB.find({},{fields: {name: 1, gender:1,age: 1,score:1,date:1,panchayat:1,ward:1}}).fetch(),
  };
}, OfficialFeed);  