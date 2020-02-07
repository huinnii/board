package com.example.demo.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardModel {
    private int idx;
    private String title;
    private String writer;
    private String content;
    private String regdate;
    private String moddate;
    private String password;
    private int hit;
    private char state;
}
