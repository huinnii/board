package com.example.demo.service;

import com.example.demo.model.BoardModel;
import com.example.demo.utils.PagingVO;

import java.util.List;

public interface BoardService {
    //List<BoardModel> printBoard();
    void insertBoard(BoardModel board);
    BoardModel printDetail(int idx);
    void deleteBoard(int idx);
    void updateBoard(BoardModel board);
    void hitBoard(int idx);
    // 게시물 총 갯수
    int countBoard();
    List<BoardModel> selectBoard(PagingVO vo);

}
