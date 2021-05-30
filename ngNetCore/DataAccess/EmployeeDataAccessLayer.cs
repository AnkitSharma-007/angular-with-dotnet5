using Microsoft.EntityFrameworkCore;
using ngNetCore.Interfaces;
using ngNetCore.Models;
using System.Collections.Generic;
using System.Linq;

namespace ngNetCore.DataAccess
{
    public class EmployeeDataAccessLayer : IEmployee
    {
        private EmployeeDBContext db;

        public EmployeeDataAccessLayer(EmployeeDBContext _db)
        {
            db = _db;
        }

        public IEnumerable<Employee> GetAllEmployees()
        {
            try
            {
                return db.Employees?.ToList().OrderBy(x => x.EmployeeId);
            }
            catch
            {
                throw;
            }
        }

        public void AddEmployee(Employee employee)
        {
            try
            {
                db.Employees.Add(employee);
                db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public void UpdateEmployee(Employee employee)
        {
            try
            {
                db.Entry(employee).State = EntityState.Modified;
                db.SaveChanges();
            }
            catch
            {
                throw;
            }
        }

        public Employee GetEmployeeData(int employeeId)
        {
            try
            {
                Employee employee = db.Employees.Find(employeeId);
                return employee;
            }
            catch
            {
                throw;
            }
        }

        public void DeleteEmployee(int employeeId)
        {
            try
            {
                Employee emp = db.Employees.Find(employeeId);
                db.Employees.Remove(emp);
                db.SaveChanges();

            }
            catch
            {
                throw;
            }
        }

        public List<City> GetCities()
        {
            List<City> lstCity = new List<City>();
            lstCity = (from CityList in db.Cities select CityList).ToList();

            return lstCity;
        }
    }
}
