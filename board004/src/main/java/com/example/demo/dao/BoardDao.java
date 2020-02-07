package com.example.demo.dao;

import com.example.demo.model.BoardModel;

import java.util.List;

public interface BoardDao {
    List<BoardModel> getBoard();
    void setBoard(BoardModel board);
    BoardModel getDetail(int idx);
    void deleteBoard(int idx);
    void updateBoard(BoardModel board);
    void hitBoard(int idx);
}
