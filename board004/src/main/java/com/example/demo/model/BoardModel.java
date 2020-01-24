package com.example.demo.model;

import lombok.Getter;

@Getter
public class BoardModel {
    private int idx;
    private String title;
    private String writer;
    private String content;
    private String regdate;
    private String moddate;
    private String passward;
    private int hit;
}
