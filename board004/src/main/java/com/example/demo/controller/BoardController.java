package com.example.demo.controller;

import com.example.demo.model.BoardModel;
import com.example.demo.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
public class BoardController {

    @Autowired
    BoardService boardService;

    @RequestMapping("/list")
    public String list(Model model) {
        List<BoardModel> board = boardService.printBoard();

        model.addAttribute("boardList",board);

        return "list";
    }

    @RequestMapping("/read/{idx}")
    public String read(@PathVariable int idx, Model model) throws Exception {
        BoardModel board = boardService.printDetail(idx);

        model.addAttribute("boardRead",board);

        return "read";
    }

    @RequestMapping("/insertProc")
    private String boardInsertProc(HttpServletRequest request) throws Exception{

        BoardModel board = new BoardModel();

        board.setSubject(request.getParameter("subject"));
        board.setContent(request.getParameter("content"));
        board.setWriter(request.getParameter("writer"));

        mBoardService.boardInsertService(board);

        return "redirect:/list";
    }

}
