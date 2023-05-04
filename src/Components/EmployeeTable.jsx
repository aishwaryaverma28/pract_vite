import React, { useState, useEffect } from "react";

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [order, setOrder] = useState("ASC");
  
  useEffect(() => {
    fetch("https://dummy.restapiexample.com/api/v1/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data.data))
      .catch((error) => console.error(error));
  }, []);

const handleSearchTermChange = (event) => {
  setSearchTerm(event.target.value);
  // console.log(event.target.value);
};

    
const filteredItems = ((employees||[]).filter((item) =>
    item.employee_name.toLowerCase().includes(searchTerm.toLowerCase())
  ));
  // console.log(filteredItems);
  const sorting = (col) => {
    if (order === "ASC" ){
      const sorted = [...filteredItems].sort((a,b)=> 
      a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1)
      setEmployees(sorted);
      console.log(sorted);
      setOrder("DSC");
    }
    if (order === "DSC" ){
      const sorted = [...filteredItems].sort((a,b)=> 
      a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1)
      setEmployees(sorted);
      console.log(sorted);
      setOrder("ASC");
    }
  }

  return (
      <div>
        <input type="text" value={searchTerm} onChange={handleSearchTermChange}/>
    
    <table>
        <caption>Employee Data</caption>
      <thead>
        <tr>
          <th>ID</th>
          <th onClick={() => sorting("employee_name")}>Name</th>
          <th>Salary</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((employee) => (
          <tr key={employee.id}>
            <td data-cell="id">{employee.id}</td>
            <td data-cell="name">{employee.employee_name}</td>
            <td data-cell="salary">{employee.employee_salary}</td>
            <td data-cell="age">{employee.employee_age}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export default EmployeeTable;
