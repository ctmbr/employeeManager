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
      "Update an Employee Role",
      "Quit",
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
        case "Add an Employees":
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
  viewDepartments();
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
    const dpArray = [];
    const dpIDArray = [];
    for (let i = 0; i < data.length; i++) {
      dpArray.push(data[i].name);
      dpIDArray.push(data[i].id);
    }

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
          department_id: dpIDArray[dpArray.indexOf(response.department)],
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
  dataReader.viewRoles().then(([data]) => {
    const roleArray = [];
    const roleIDArray = [];
    for (let i = 0; i < data.length; i++) {
      roleArray.push(data[i].name);
      roleIDArray.push(data[i].id);
    }
      dataReader.viewEmployees().then(([data]) => {
    const managerArray = [];
    const managerIDArray = [];
    for (let i = 0; i < data.length; i++) {
      managerArray.push(data[i].name);
      managerIDArray.push(data[i].id);

    }
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
        {
          type: "list",
          name: "role",
          message: "Assign a Role for this Employee:",
          choices: roleArray,
        },
        {
          type: "list",
          name: "manager",
          message: "Select a Manager for this Employee:",
          choices: managerArray
        },
      ])
      .then((response) => {
        const findata = {
          first_name: response.first_name,
          last_name: response.last_name,
          role_id: roleIDArray[roleArray.indexOf(response.role)],
          manager_id: managerIDArray[managerArray.indexOf(response.manager)],
        };
        dataReader
          .addEmployee(findata)
          .then(() => {
            console.log(
              `Employee ${response.first_name} ${response.last_name} succesfully added`
            );
          })
          .then(() => {
            init();
          });
      });
  });
},
function updateEmployeeRole() {

  dataReader.viewEmployees().then(([data]) => {
    const fnArray = [];
    const lnArray = [];
    const iDArray = [];
    const employeeArray  = [];

    for (let i = 0; i < data.length; i++) {
      
      fnArray.push(data[i].fname);
      fnArray.push(data[i].lname);
      //employeeArray 
      iDArray.push(data[i].id);

    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "Select an Employee:",
          choices: employeeArray
        },
        {
          type: "list",
          name: "role",
          message: "Assign a new Role for this Employee:",
          choices: roleArray,
        },
      ])
      .then((response) => {
        const findata = {
          role_id: roleIDArray[roleArray.indexOf(response.role)],
          employee_id: IDArray[employeeArray.indexOf(response.employee)],
        };
        dataReader
        .updateEmployeeRole(findata)
          .then(() => {
            console.log(
              `Employee ${response.first_name} ${response.last_name} succesfully promoted to `
            );
          })
          .then(() => {
            init();
          });
      });
  });

},
init() {
  return null
}
