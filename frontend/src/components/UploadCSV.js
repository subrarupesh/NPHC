import { useState, useProps } from "react";
import Papa from "papaparse";
import axios from 'axios';
function UploadCSV() {
  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
    const changeHandler = async(event) => {
        const fileSizeInMB = parseInt(event.target.files[0].size / (1024*1024));
        if(event.target.files[0].name.split(".")[1] !== 'csv') {
            alert("Please Upload a CSV File to proceed");
            return;
        }
        if(fileSizeInMB >= 2) {
            alert("Sorry your File must be lesser than 2 mb");
            return;
        }
        await Papa.parse(event.target.files[0], {
                header: true,
                comments: '#',
                skipEmptyLines: true,
                complete: async(results) => {
                    const rowsArray = [];
                    const valuesArray = [];
                    let availableIndexes = [];
                    results.data.forEach((x,i) => {
                        rowsArray.push(Object.keys(x));
                        const resultIndex = results.data.findIndex((result) => {
                            return result.id !== x.id && x.login === result.login;
                        });
                        if(resultIndex !== -1) {
                          availableIndexes.push(resultIndex);
                        } 
                        const availableIndex = availableIndexes.findIndex((index) => {
                          return index === i;
                        });
                        if(availableIndex === -1) {
                          valuesArray.push(x);
                        }  
                    });
                    // Filtered Column Names
                    setTableRows(rowsArray[0]);
                    // Filtered Values
                    setValues(valuesArray);
                },
            });
            
    };
    const onFormSubmit = (event) => {
      event.preventDefault();
      const employeeData = {
        employee_csv_data: values
      };
      axios.post('/api/employees/upload', employeeData)
        .then(res => {})
        .catch(err => {
          alert(err.message);
          }
        );
    }
    return (
      <div className="upload">
          <form encType="multipart/upload">
            <h1>CSV Upload</h1>
            <input type="file" onChange={changeHandler} />
            <button className="btn-primary" type="submit" onClick={onFormSubmit}>Upload CSV</button>
        </form>
        <br />
      <br />
      </div>
    );
  }
  
  export default UploadCSV;