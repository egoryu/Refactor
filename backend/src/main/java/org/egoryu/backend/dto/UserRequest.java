package org.egoryu.backend.dto;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class UserRequest {
    private String name;
    private Integer age;
    private String email;
    private Timestamp registrationDate;
    private String country;
    private String phone;
    private String surname;
}
