CREATE TABLE province 
( province_id int AUTO_INCREMENT  primary key ,
 province_name varchar(100) not null
);
CREATE TABLE district(
district_id int AUTO_INCREMENT primary KEY,
    district_name varchar(100) not null,
    province_id int not null,
    foreign key (province_id) REFERENCES province(province_id)
)
create table branch(
    branch_id AUTO_INCREMENT primary key,
    branch_name varchar(255) not null,
    district_id  int not null,
    foreign KEY(district_id) REFERENCES district(district_id)
    remarks varchar(255) null


)