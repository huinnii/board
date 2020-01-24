package com.example.demo.dao;

import com.example.demo.model.BoardModel;

import java.util.List;

public interface BoardDao {
    List<BoardModel> getBoard();
    BoardModel getDetail(int idx);
}
