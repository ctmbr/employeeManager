const connection = require("./db/connection");

class DataReader {
  constructor(connection) {
    this.connection = connection;
  }
  viewDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }
  viewRoles() {
    return this.connection.promise().query("SELECT * FROM role");
  }
  viewEmployees() {
    return this.connection.promise().query("SELECT * FROM employee");
  }
  addDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }
  addRole(role) {
    console.log(role);
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }
  addEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }
  updateEmployeeRole(employeeId, newRoleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id=? WHERE id=?", [
        newRoleId,
        employeeId,
      ]);
  }
  // Query to create array of managers
  // genManagerArray(employeeId, newRoleId) {
  //     return this.connection.promise().query("SELECT * FROM employee WHERE ");
  //   }
}

module.exports = new DataReader(connection);
