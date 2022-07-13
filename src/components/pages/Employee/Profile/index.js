import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from 'redux/employees/thunks';

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const employees = useSelector((state) => state.employees.list);
  const dispatch = useDispatch();

  useEffect(() => {
    if (employees.length > 0) {
      setEmployee(employees.find((employee) => employee._id === id));
    } else {
      dispatch(
        getEmployees({
          _id: id
        })
      );
    }
  }, [employees]);
  return <div>{employee.firstName}</div>;
};

export default EmployeeProfile;
