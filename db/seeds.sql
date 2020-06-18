USE passport_demo;

INSERT INTO Projects (title, description, owner, createdAt, updatedAt) VALUES
('Portfolio', 'Create a dynamic web page to showcase your projects and display your professional contact information and links.', 1, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Note Taker', 'Create a dynamic web page that stores and updates notes using a SQL database.', 2, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Weather App', 'Create a dynamic web page that displays weather information using a third-party API.', 3, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('RPG', 'Create a dynamic role playing game that is fun to play using constructor objects and javascript.', 4, '2020-06-17 14:04:27', '2020-06-17 14:04:27');

INSERT INTO Stories (id, title, description, status, project, assignee, reporter, estimate, createdAt, updatedAt) VALUES
(1, 'Build html', 'Build html for webpage.', 0, 1, 1, 1, 0.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(2, 'Build js', 'Build javascript to support dynamic functions.', 1, 1, 1, 1, 1.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(3, 'Deploy', 'Upload to GitHub and deploy.', 2, 1, 1, 1, 3.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(4, 'Build html and js', 'Build html and javascript for webpage.', 3, 2, 2, 2, 1.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(5, 'Database', 'Create and seed database with placeholder data.', 0, 2, 2, 2, 2.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(6, 'Connect', 'Connect the database and webpage with routes.', 1, 2, 2, 2, 4.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(7, 'Build html/js ', 'Build html and supporting js.', 2, 3, 3, 3, 5.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(8, 'Setup API', 'Build API calls for necessary information.', 3, 3, 3, 3, 6.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(9, 'Debug', 'Test and debug app as necessary', 0, 3, 3, 3, 7.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(10, 'Design Game', 'Create and test rules and play interactions for game.', 1, 4, 4, 4, 1.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(11, 'Code Objects', 'Create and code necessary objects for game characters and events.', 2, 4, 4, 4, 2.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(12, 'Testing', 'Conduct play testing and incorporate improvements', 3, 4, 4, 4, 9.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27');

INSERT INTO Tasks (title, owner, story, time, status, createdAt, updatedAt) VALUES
('Code Header', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Code Body', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Code Projects', 1, 2, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Code Links', 1, 2, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('GitHub', 1, 3, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Heroku', 1, 3, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Code Body', 2, 4, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Code Footer', 2, 4, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Code Models', 2, 5, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Code Seeds', 2, 5, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Code Routes', 2, 6, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Code Server', 2, 6, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Code Body', 3, 7, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Code Header', 3, 7, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Code Calls', 3, 8, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Code Responses', 3, 8, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Testing', 3, 9, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Fixes', 3, 9, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Characters', 4, 10, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Events', 4, 10, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Objects', 4, 11, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Methods', 4, 11, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Testing', 4, 12, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Fixes', 4, 12, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27');
