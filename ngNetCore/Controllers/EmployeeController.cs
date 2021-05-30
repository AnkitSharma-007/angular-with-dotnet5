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
        public IActionResult Post(Employee employee)
        {
            objemployee.AddEmployee(employee);
            return Ok();
        }

        [HttpGet("{id}")]
        public Employee Get(int id)
        {
            return objemployee.GetEmployeeData(id);
        }

        [HttpPut]
        public IActionResult Put(Employee employee)
        {
            objemployee.UpdateEmployee(employee);
            return Ok();
        }

        [HttpDelete("{employeeId}")]
        public IActionResult Delete(int employeeId)
        {
            objemployee.DeleteEmployee(employeeId);
            return Ok();
        }

        [HttpGet]
        [Route("GetCityList")]
        public IEnumerable<City> GetCityList()
        {
            return objemployee.GetCities();
        }
    }
}
