using Microsoft.AspNetCore.Mvc;
using ngNetCore.Interfaces;
using ngNetCore.Models;
using System.Collections.Generic;

namespace ngNetCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployee objemployee;

        public EmployeeController(IEmployee _objemployee)
        {
            objemployee = _objemployee;
        }

        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return objemployee.GetAllEmployees();
        }

        [HttpPost]
        public int Post([FromBody] Employee employee)
        {
            return objemployee.AddEmployee(employee);
        }

        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            return objemployee.GetEmployeeData(id);
        }

        [HttpPut]
        public int Put([FromBody] Employee employee)
        {
            return objemployee.UpdateEmployee(employee);
        }

        [HttpDelete("{id}")]
        public int Delete(int id)
        {
            return objemployee.DeleteEmployee(id);
        }

        [HttpGet]
        [Route("GetCityList")]
        public IEnumerable<City> GetCityList()
        {
            return objemployee.GetCities();
        }
    }
}
