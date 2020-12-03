using ngNetCore.Models;
using System.Collections.Generic;

namespace ngNetCore.Interfaces
{
    public interface IEmployee
    {
        IEnumerable<Employee> GetAllEmployees();
        int AddEmployee(Employee employee);
        int UpdateEmployee(Employee employee);
        Employee GetEmployeeData(int id);
        int DeleteEmployee(int id);
        List<City> GetCities();
    }
}
