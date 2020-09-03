INSERT INTO tasks (title, contact, status, category, description) 
VALUES('Feed Nova','Craig','Do everyday after walk','pets','Nova is hungry');

INSERT INTO tasks (title, contact, status, category, description) 
VALUES('Feed Walter','Craig','Do everyday after walk','pets','Walter is hungry');

INSERT INTO tasks (title, contact, status, category, description) 
VALUES('Feed Craig','Craig','Do everyday after walk','people','Craig is hungry, really really space taken up space');

INSERT INTO tasks (title, contact, status, category, description) 
VALUES('House Exterior','Craig','In wip','Home Repairs','Do before painting');



INSERT INTO portals (title, contact, status, category, description, routePath) 
VALUES('ToDo List','Craig','Active','Life Management Tool','Keep track of tasks or idea or whatever, just write it down and dont forget it.', 'getTasksHomePage');

INSERT INTO portals (title, contact, status, category, description, routePath) 
VALUES('worldWeatherOne','Craig','Active','Environmental Management','Earth tracking information for weather, storms, weird happenings, Air Quality, for all mother Earth has to show us.', 'getWeatherHomePage');

INSERT INTO portals (title, contact, status, category, description, routePath) 
VALUES('LASC','Craig','Active','Life Management Tool','Never loose track of your personal information again. Ever. When needed, you can easily share information to outside sources or remove access to any of your data.', 'getLASCHomePage');

INSERT INTO portals (title, contact, status, category, description, routePath) 
VALUES('sayWhat', 'Craig', 'Active', 'Media Social Type', 'Message board, just text, no images, no video, no ads either though, so...', 'getSayWhatHomePage');