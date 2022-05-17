const inquirer = require("inquirer");
require("console.table");
const dataReader = require("./queries");
const initialQuestion = [
  {
    type: "list",
    name: "prompt",
    message: "Welcome! Please choose from the following actions:",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Add a Role",
      "Add an Employee",
      "Update an Employee",
    ],
  },
];

function init() {
  inquirer
    .prompt(initialQuestion)
    .then((choice) => {
      switch (choice.prompt) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add a Department":
          addDepartment();
          break;
        case "Add a Role":
          addRole();
          break;
        case "Add an Employee":
          addEmployee();
          break;
        case "Update an Employee":
          updateEmployeeRole();
          break;
        case "Quit":
          quit();
          break;
      }
    })
    .catch(() => {});
}
function viewDepartments() {
  dataReader
    .viewDepartments()
    .then(([view]) => {
      console.table(view);
    })
    .then(() => {
      init();
    });
}
function viewRoles() {
  dataReader
    .viewRoles()
    .then(([view]) => {
      console.table(view);
    })
    .then(() => {
      init();
    });
}
function viewEmployees() {
  dataReader
    .viewEmployees()
    .then(([view]) => {
      console.table(view);
    })
    .then(() => {
      init();
    });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Input name for new Department:",
      },
    ])
    .then((response) => {
      dataReader
        .addDepartment(response)
        .then(() => {
          console.log(`Department ${response.name} succesfully added`);
        })
        .then(() => {
          init();
        });
    });
}
function addRole() {
  dataReader.viewDepartments().then(([data]) => {
    const dpArray = data.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Input title:",
        },
        {
          type: "number",
          name: "salary",
          message: "Set salary for this role (Numerals Only):",
        },
        {
          type: "list",
          name: "department",
          message: "Select a Department for this role:",
          choices: dpArray,
        },
      ])
      .then((response) => {
        const findata = {
          title: response.title,
          salary: response.salary,
          department_id: response.department,
        };
        dataReader
          .addRole(findata)
          .then(() => {
            console.log(`Role ${response.title} succesfully added`);
          })
          .then(() => {
            init();
          });
      });
  });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Input first Employee name:",
      },
      {
        type: "input",
        name: "last_name",
        message: "Input last Employee name:",
      },
    ])
    .then((result) => {
      let first_name = result.first_name;
      let last_name = result.last_name;
      dataReader.viewRoles().then(([roles]) => {
        const roleArray = roles.map((role) => {
          return { name: role.title, value: role.id };
        });
        inquirer
          .prompt([
            {
              type: "list",
              name: "role_id",
              message: "Select a role for this employee",
              choices: roleArray,
            },
          ])
          .then((dada) => {
            let role_id = dada.role_id;
            dataReader.viewEmployees().then(([employees]) => {
              const managerArray = employees.map((employee) => {
                return {
                  name: employee.name,
                  value: employee.id,
                };
              });
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager_id",
                    message: "Select a manager for this employee",
                    choices: managerArray,
                  },
                ])
                .then((result) => {
                  let manager_id = result.manager_id;
                  const newEmployee = {
                    first_name,
                    last_name,
                    role_id,
                    manager_id,
                  };
                  dataReader.addEmployee(newEmployee);
                })
                .then(() => {
                  console.log(
                    `Employee ${first_name} ${last_name} succesfully added `
                  );
                })
                .then(() => {
                  init();
                });
            });
          });
      });
    });
}
function updateEmployeeRole() {
  dataReader.viewEmployees().then(([data]) => {
    const employeeArray = data.map((employee) => {
      return {
        name: employee.name,
        value: employee.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Select an Employee:",
          choices: employeeArray,
        },
      ])
      .then((response) => {
        const employee_id = response.employee_id;
        dataReader.viewRoles().then(([data]) => {
          const roleArray = data.map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          });
          inquirer
            .prompt([
              {
                type: "list",
                name: "role_id",
                message: "Assign a new Role for this Employee:",
                choices: roleArray,
              },
            ])
            .then((result) => {
              const role_id = result.role_id;
              dataReader
                .updateEmployeeRole(employee_id, role_id)
                .then(() => {
                  console.log(`Employee succesfully promoted`);
                })
                .then(() => {
                  init();
                });
            });
        });
      });
  });
}
init();
