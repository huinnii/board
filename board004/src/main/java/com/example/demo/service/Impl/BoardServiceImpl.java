package com.example.demo.service.Impl;

import com.example.demo.dao.BoardDao;
import com.example.demo.model.BoardModel;
import com.example.demo.service.BoardService;
import com.example.demo.utils.PagingVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardDao dao;

    /*
    @Override
    public List<BoardModel> printBoard(){
        List<BoardModel> board = dao.getBoard();
        return board;
    }
     */

    @Override
    public void insertBoard(BoardModel board){
        dao.setBoard(board);
    }
    @Override
    public BoardModel printDetail(int idx){
        BoardModel board = dao.getDetail(idx);
        return board;
    }
    @Override
    public void deleteBoard(int idx){
        dao.deleteBoard(idx);
    }
    @Override
    public void updateBoard(BoardModel board)
    {
        dao.updateBoard(board);
    }
    @Override
    public void hitBoard(int idx)
    {
        dao.hitBoard(idx);
    }
    @Override
    public int countBoard(){
        return dao.countBoard();
    }
    @Override
    public List<BoardModel> selectBoard(PagingVO vo){
        return dao.selectBoard(vo);
    }
}
