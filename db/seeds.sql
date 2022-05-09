USE employees_db;
INSERT INTO department (name)
VALUES ('Human Resources'),
('Research and Development'),
('Information Technology'),
('Legal Team'),
('Security');

INSERT INTO role (title, salary, department_id)
VALUES ('HR Manager', 22000, 1),
('Chief Engineer', 30000, 2),
('Senior Engineer', 250000, 2),
('Junior Engineer', 175000, 2),
('Database Manager', 200000, 3),
('Technical Support', 80000, 3),
('Legal Team Leader', 400000, 4),
('Patent Lawyer', 300000, 4),
('Security Chief', 28000, 5),
('Security Guard', 25000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Shawna', 'Perkins', 1, NULL),
('Antonio', 'Rodrigues', 2, NULL),
('Roderick', 'MacDeaugal', 3, 2),
('Elysia', 'Petranova', 3, 2),
('Patrick', 'Ireland', 4, 4),
('Alaina', 'Sorensen', 4, 3),
('Orneth', 'Ganash', 5, NULL),
('Sean', 'MacDeaugal', 6, 7),
('Alexander', 'Bishop', 7, NULL),
('Timothy', 'Androvesic', 8, 8),
('Andrea', 'Coelho', 8, 8),
('Tyrone', 'Jackson', 9, NULL),
('Corey', 'McKraken', 10, 11),
('Luis', 'Sanchez', 10, 11);



