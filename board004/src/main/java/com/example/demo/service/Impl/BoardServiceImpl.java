package com.example.demo.service.Impl;

import com.example.demo.dao.BoardDao;
import com.example.demo.model.BoardModel;
import com.example.demo.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardDao dao;

    @Override
    public List<BoardModel> printBoard(){
        List<BoardModel> board = dao.getBoard();
        return board;
    }

    @Override
    public BoardModel printDetail(int idx){
        BoardModel board = dao.getDetail(idx);
        return board;
    }
}