CREATE DATABASE if not exists MTDB;

USE MTDB;

CREATE table if not exists Client (
	ClientID int primary key,
    
	CompanyName varchar(50),
	Email varchar(50),
	PhoneNumber varchar(15),
    
	Address varchar(50),
	Website varchar(50),
	BusinessType varchar(15),
	MTStatus varchar(15)
);

CREATE table if not exists Project (
	ProjectID int primary key,
    
    ProjectName varchar(50),
    ProjectType varchar(25),
    ClientID int,
    ProjectDesc varchar(100),
    
    ProjectStatus varchar(20),
    ProjectPay int,
    ProjectStart date,
    ProjectEnd date
);

CREATE table if not exists Employee (
	EmployeeID int primary key,
    
	FirstName varchar(15),
    LastName varchar(25),
    EmpUsername varchar(10),
    EmpPassword varchar(50),
    
    EmpEmail varchar(50),
    EmpPhoneNumber varchar(15),
    EmpRole varchar(25),
    EmpStartDate date,
    
    EmpPayCut int,
    EmpImagePath varchar(50)
);

CREATE table if not exists Messages (
	MessageID int primary key,
    
    Message varchar(200),
    MessageDate date,
    MessageStatus varchar(15),
    
    MessageAttachment varchar(50)
);

CREATE table if not exists Events (
    EventID int primary key,

    EventName varchar(25),
    EventType varchar(25),
    EventDate date,
    EventDesc varchar(100)
);

insert into Client values (1, "CompanyA", "companya@gmail.com", "1112223333", "123 Sesame Street", "www.CompanyA.com", "brothel", "interested");
select * from Client;

insert into Events values (2,"company2ProjectUpdate","Software","2024-05-02","Providing an update for company 2 at 999 Cesar Gil street.");
insert into Events values (3,"company3SoftwareDeadline","Software","2024-05-04","Deadline for SoftwareA for Mexican Robe Corporation.");
select * from Events;

