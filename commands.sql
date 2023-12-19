CREATE TABLE blogs (
id SERIAL PRIMARY KEY,
author TEXT,
url TEXT NOT NULL,
title TEXT NOT NULL,
likes INT DEFAULT 0
);

insert into blogs (author, url, title, likes) values ('Michael Chan', 'https://reactpatterns.com/', 'React patterns', 7);
insert into blogs (author, url, title, likes) values ('Edsger W. Dijkstra', 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 'Go To Statement Considered Harmful', 5);
insert into blogs (author, url, title, likes) values ('Edsger W. Dijkstra', 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', 'Canonical string reduction', 12);
insert into blogs (author, url, title, likes) values ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html', 'First class tests', 10);
insert into blogs (author, url, title, likes) values ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', 'TDD harms architecture', 0);
insert into blogs (author, url, title, likes) values ('Robert C. Martin', 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 'Type wars', 2);
