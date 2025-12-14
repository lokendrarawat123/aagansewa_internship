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