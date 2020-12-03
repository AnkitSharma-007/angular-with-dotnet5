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

        public int AddEmployee(Employee employee)
        {
            try
            {
                db.Employees.Add(employee);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        public int UpdateEmployee(Employee employee)
        {
            try
            {
                db.Entry(employee).State = EntityState.Modified;
                db.SaveChanges();

                return 1;
            }
            catch
            {
                throw;
            }
        }

        public Employee GetEmployeeData(int id)
        {
            try
            {
                Employee employee = db.Employees.Find(id);
                return employee;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteEmployee(int id)
        {
            try
            {
                Employee emp = db.Employees.Find(id);
                db.Employees.Remove(emp);
                db.SaveChanges();
                return 1;
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
