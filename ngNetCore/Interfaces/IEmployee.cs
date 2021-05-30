using ngNetCore.Models;
using System.Collections.Generic;

namespace ngNetCore.Interfaces
{
    public interface IEmployee
    {
        IEnumerable<Employee> GetAllEmployees();
        void AddEmployee(Employee employee);
        void UpdateEmployee(Employee employee);
        Employee GetEmployeeData(int employeeId);
        void DeleteEmployee(int employeeId);
        List<City> GetCities();
    }
}
