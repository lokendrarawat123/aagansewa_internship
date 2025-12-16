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
CREATE TABLE services(
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(150),
    description varchar(255),
    service_image varchar(255)
    branch_id INT,
    FOREIGN KEY (branch_id)
      REFERENCES branch(branch_id) 
);
CREATE TABLE inquiry (
    inquiry_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    email VARCHAR(150) NULL,
    description TEXT NULL,
    branch_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (branch_id)
        REFERENCES branch(branch_id)
        
)

CREATE TABLE gallery (
    gallery_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    gallery_date DATE NOT NULL,
    location VARCHAR(255) NOT NULL,
    branch_id INT NOT NULL,
    staff_id INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (branch_id)
        REFERENCES branch(branch_id)
        ON DELETE CASCADE,

    FOREIGN KEY (staff_id)
        REFERENCES staff(staff_id)
        
);
