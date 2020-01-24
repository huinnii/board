package com.example.demo.service;

import com.example.demo.model.BoardModel;

import java.util.List;

public interface BoardService {
    List<BoardModel> printBoard();
    BoardModel printDetail(int idx);
}
