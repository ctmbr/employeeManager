const connection = require("./db/connection");

class DataReader {
  constructor(connection) {
    this.connection = connection;
  }
  viewDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }
  viewRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.department_id =department.id;"
      );
  }
  viewEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;"
      );
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
}

module.exports = new DataReader(connection);
