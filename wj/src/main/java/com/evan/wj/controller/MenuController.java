package com.evan.wj.controller;

import com.evan.wj.common.Result;
import com.evan.wj.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.HtmlUtils;
import com.evan.wj.common.Result;

@Controller
public class MenuController {

    @GetMapping("/api/menu")
    @ResponseBody
    public Result menu() {
        return new Result(200, "成功", "admin");
    }

    @GetMapping("/api/authentication")
    @ResponseBody
    public String authentication() {
        return "身份认证成功";
    }

}