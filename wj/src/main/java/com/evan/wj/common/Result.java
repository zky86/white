package com.evan.wj.common;


public class Result {

    private int code;

    private String meaasge;

    private String result;

    public Result(int code, String meaasge, String result) {
        this.code = code;
        this.meaasge = meaasge;
        this.result = result;
    }


    //初始化执行
    public int getCode() {
        return code;
    }

    public String getMeaasge() {
        return meaasge;
    }

    public String getResult() {
        return result;
    }


}
