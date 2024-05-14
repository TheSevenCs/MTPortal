CREATE DATABASE MTDB;

USE MTDB;

CREATE table Client (
ClientID int primary key,
CompanyName varchar(50),
Email varchar(50),
PhoneNumber varchar(15),
Address varchar(50),
Website varchar(50),
BusinessType varchar(15),
MTStatus varchar(15)
);

insert into Client values (1, "CompanyA", "companya@gmail.com", "1112223333", "123 Sesame Street", "www.CompanyA.com", "brothel", "interested");
select * from Client;

