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
    MessagePinned boolean,
    
    MessageAttachment varchar(50)
);

CREATE table if not exists Events (
    EventID int primary key,

    EventName varchar(25),
    EventType varchar(25),
    EventDate date,
    EventDesc varchar(100)
);
