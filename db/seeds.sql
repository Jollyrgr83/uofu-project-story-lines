USE passport_demo;


INSERT INTO projects (title, description, owner, createdAt, updatedAt) VALUES
('Cherry Tree', 'Chopping down a cherry tree is one of the many stories that children learn about this Presidential figure.', 1, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('HBO Series', 'A popular miniseries was developed and aired on HBO revolving around the life and times of this Presidential figure.', 2, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Nickel', 'While famous for many accomplishments, this Presidential figure is represented on the nickel.', 3, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Uh...', 'I am not really sure what this Presidential figure accomplished while in office.', 4, '2020-06-17 14:04:27', '2020-06-17 14:04:27');

INSERT INTO stories (id, title, description, status, project, assignee, reporter, estimate, createdAt, updatedAt) VALUES
(1, 'Get Hatchet', 'Go into the toolshed and get the hatchet.', 0, 1, 1, 1, 0.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(2, 'Chop Tree', 'Chop down the cherry tree', 1, 1, 1, 1, 1.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(3, 'Do Not Lie', 'Avoid telling a lie regarding the chopping down of the cherry tree.', 2, 1, 1, 1, 3.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(4, 'Episode 1', 'The first episode of the epic miniseries.', 3, 2, 2, 2, 1.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(5, 'Episode 2', 'The second episode of the epic miniseries.', 0, 2, 2, 2, 2.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(6, 'Episode 3', 'The third episode of the epic miniseries.', 1, 2, 2, 2, 4.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(7, 'Sit For Portrait', 'Schedule a sitting, show up, and sit while the artist renders my likeness.', 2, 3, 3, 3, 5.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(8, 'Send to Mint', 'Have the artist send the likeness to the mint.', 3, 3, 3, 3, 6.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(9, 'Mint Coin', 'Pour the metal into the mold and strike it.', 0, 3, 3, 3, 7.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(10, 'Something', 'Words describing the something.', 1, 4, 4, 4, 1.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(11, 'Something Else', 'More words describing something else.', 2, 4, 4, 4, 2.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
(12, 'Another Something', 'Even more words describing something other than the other things.', 3, 4, 4, 4, 9.5, '2020-06-17 14:04:27', '2020-06-17 14:04:27');

INSERT INTO tasks (title, owner, story, time, status, createdAt, updatedAt) VALUES
('Open Door', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Find Hatchet', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Swing Hatchet', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Swing Again', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Avoid Lie', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Do Not Lie', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Casting 1', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Filming 1', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Casting 2', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Filming 2', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Casting 3', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Filming 3', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Call Artist', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Sit Down', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Call Mint', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Send Image', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Pour Metal', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Strike Cast', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Something 1', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Something 2', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Something Else 1', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Something Else 2', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'),
('Another Thing', 1, 1, 1.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27'), ('Other Thing', 1, 1, 0.5, 0, '2020-06-17 14:04:27', '2020-06-17 14:04:27');
=======
INSERT INTO Projects (title, description, owner, createdAt, updatedAt) VALUES
('Project Alpha', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 1, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
('Project Bravo', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 1, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
('Project Charlie', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 2, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
('Project Delta', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 2, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
('Project Echo', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 3, '2020-06-08 13:04:27', '2020-06-08 13:04:27');

-- INSERT INTO statuses (id, states) VALUES
-- (5, 'Todo'),
-- (6, 'Blocked'),
-- (7, 'In_Progress'),
-- (8, 'Completed');

INSERT INTO Stories (id, title, description, status, project, assignee, reporter, estimate, createdAt, updatedAt) VALUES
(1, 'Login Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 0, 1, 1, 1, 1.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(2, 'Search Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 1, 1, 1, 1, 2.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(3, 'Logout Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 2, 1, 1, 1, 3.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(4, 'Login Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 3, 2, 1, 1, 4.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(5, 'Browse Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 0, 2, 1, 1, 5.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(6, 'Update Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 1, 2, 1, 1, 6.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(7, 'Login Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 2, 3, 1, 1, 7.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(8, 'Story Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 3, 3, 1, 1, 8.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(9, 'Logout Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 0, 3, 1, 1, 9.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(10, 'Login Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 1, 4, 1, 1, 1.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(11, 'Project Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 2, 4, 1, 1, 2.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(12, 'Logout Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 3, 4, 1, 1, 3.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(13, 'Login Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 0, 5, 1, 1, 4.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(14, 'Delete Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 1, 5, 1, 1, 5.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
(15, 'Add Page', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, mollitia, nihil quod a, molestiae qui ab cumque expedita laboriosam aliquid blanditiis tempora. Esse molestias dolorum corporis eum eos, animi nam!', 2, 5, 1, 1, 6.5, '2020-06-08 13:04:27', '2020-06-08 13:04:27');

INSERT INTO Tasks (title, owner, story, time, status, createdAt, updatedAt) VALUES
('Button 1', 1, 1, 1.5, 0, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 1, 2.5, 1, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 2, 3.5, 2, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 2, 4.5, 3, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 3, 5.5, 0, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
('Button 1', 1, 4, 1.5, 0, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 4, 2.5, 1, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 5, 3.5, 2, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 5, 4.5, 3, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 6, 5.5, 0, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
('Button 1', 1, 7, 1.5, 0, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 7, 2.5, 1, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 8, 3.5, 2, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 8, 4.5, 3, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 9, 5.5, 0, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
('Button 1', 1, 10, 1.5, 0, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 10, 2.5, 1, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 11, 3.5, 2, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 11, 4.5, 3, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 12, 5.5, 0, '2020-06-08 13:04:27', '2020-06-08 13:04:27'),
('Button 1', 1, 13, 1.5, 0, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 13, 2.5, 1, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 14, 3.5, 2, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 14, 4.5, 3, '2020-06-08 13:04:27', '2020-06-08 13:04:27'), ('Button 1', 1, 15, 5.5, 0, '2020-06-08 13:04:27', '2020-06-08 13:04:27');

