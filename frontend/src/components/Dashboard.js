import { useEffect, useState } from "react";
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator'; 
import Modal from './Modal';
function Dashboard() {

  const [modalOpen, setModalOpen] = useState(false); 
  let [Id, setId] = useState([]);
  let [data, setData] = useState([]); 
  let [minSalary, setMinSalary] = useState([]);
  let [maxSalary, setMaxSalary] = useState([]);
  let [rowDeleted, setRowDeleted] = useState(false);

  const columns = [
    {dataField: 'id', text: 'id', sort: true},
    {dataField: 'name', text: 'name', sort: true},
    {dataField: 'login', text: 'login', sort: true},
    {dataField: 'salary', text: 'salary', sort: true},
    {
      dataField: "edit",
      text: "Edit",
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-success btn-xs"
            onClick={() => handleEdit(row.id)}
          >
            Edit
          </button>
        );
      },
    },
    {
      dataField: "remove",
      text: "Delete",
      formatter: (cellContent, row) => {
        return (
          <button
            className="btn btn-danger btn-xs"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        );
      },
    },
  ];

  const pagination = paginationFactory({
    page:1,
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: '15', value: 15
    },{
      text: 'All', value: data.length
    }], 
    lastPageText: '<<',
    firstPageText: '>>',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function(page, sizePerPage) {
      console.log(page);
      console.log(sizePerPage);
    },
    onSizePerPageChange: function(page, sizePerPage) {
      console.log(page);
      console.log(sizePerPage);
    },
  });

  useEffect(() => {
    axios.get('/api/employees')
    .then(res => {
          setData(res.data.message);
    })
    .catch(err => {
          alert(err.message);
      }
    );
  }, [minSalary, maxSalary, modalOpen, rowDeleted]);

  const handleEdit = (id) => {
    setModalOpen(true);
    setId(id);
  }

  const handleDelete = (id) => {
    if(window.confirm('Delete the item?')){
      axios.delete('/api/employees/' + id)
        .then(res => {
          setRowDeleted(true);
        })
        .catch(err => {
          alert(err.message);
          }
        );
    };
    setRowDeleted(false);
  }

  const onClickMinSalary = (event) => {
    console.log(event.target.value);
    setMinSalary(event.target.value);
  }

  const onClickMaxSalary = (event) => {
    console.log(event.target.value);
    setMaxSalary(event.target.value);
  }

  const onClickSearch = (event) => {
    event.preventDefault();
    const filteredValues = data.filter((data) => {
        return parseInt(data.salary) >= parseInt(minSalary) && parseInt(data.salary) <= parseInt(maxSalary);
    });
    setData(filteredValues);
  }

    return (
            <div className="upload">
            Minimum Salary: <input type="text" name="minimum_salary" 
            onChange={onClickMinSalary} /> &nbsp;&nbsp;
            Maximum Salary: <input type="text" name="maximum_salary" 
            onChange={onClickMaxSalary} /> &nbsp;&nbsp;
            <button className="btn-success" type="submit" onClick={onClickSearch}>Search</button>
        <br/>
        <br/>
          <BootstrapTable 
          bootstrap4 
          keyField="id" 
          columns={columns}
          data={data}
          pagination={pagination}
          />
            {modalOpen && <Modal setOpenModal={setModalOpen} id={Id} /> }
            
            </div>

    );
  }
  
  export default Dashboard;