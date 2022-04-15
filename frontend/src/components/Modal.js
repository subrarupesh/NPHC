import {useState } from "react";
import './Modal.css';
import axios from 'axios';
function Modal({ setOpenModal, id }) {

    let [empName, setEmpName] = useState([]);
    let [empLogin, setEmpLogin] = useState([]);
    let [empSalary, setEmpSalary] = useState([]);

    const onNameClick = (event) => {
        setEmpName(event.target.value);
    }

    const onLoginClick = (event) => {
        setEmpLogin(event.target.value);
    }

    const onSalaryClick = (event) => {
        setEmpSalary(event.target.value);
    }

    const onClickContinue = async(event) => {
        event.preventDefault();
        const employeeData = {
            employee_id: id,
            employee_name: empName,
            employee_salary: empSalary,
            employee_login: empLogin
        };
        await axios.put('/api/employees/' + id, employeeData)
        .then(res => {
        })
        .catch(err => {
          alert(err.message);
          }
        );
        await setOpenModal(false);
    }

    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </button>
          </div>
         Employee Name: <input type="text" name="name" onChange={onNameClick} />
          <br/>
         Employee Login: <input type="text" name="login" onChange={onLoginClick}/>
          <br/>
         Employee Salary: <input type="text" name="salary" onChange={onSalaryClick}/>
          <br/>
          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={onClickContinue}>Save</button>
          </div>
        </div>
      </div>
    );
}

export default Modal;