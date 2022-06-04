// ==UserScript==
// @name         GetFileListFeishu
// @namespace    https://www.feishu.cn/
// @version      0.1
// @description  复制飞书文件列表
// @author       AustinYoung
// @match        https://prd.fs.huaqin.com/drive/*
// @icon         https://www.feishu.cn/favicon.ico
// @grant        none
// @license MIT
// ==/UserScript==
window.searchCount = 0;
(function() {
    'use strict';

    // 添加悬浮框
    console.log('添加悬浮框')
    addFloat();
})();
function addFloat()
{
    window.searchCount++;
    console.log('查找搜索框:'+window.searchCount)
    let searchNote = document.querySelector(".navigation-bar__search-note")
    if(searchNote==null)
    {
        console.log('没有搜索框')
        if(window.searchCount<10)
        {
            setTimeout( addFloat,1000);
        }
        return;
    }
    let myFloat=document.createElement("div");
    myFloat.style.float ='right';
    myFloat.innerHTML ="<div onclick='copyContainText()' id='myCopyDiv' style='cursor:pointer' title='复制列表到剪切板'>📋</div>"

    searchNote.appendChild(myFloat)
}
window.copyContainText = function()
{
    // 获取对象
    let containList = ['.explorer-file-list-virtualized__container','.explorer-grid-view-virtualized__container','.infinite-scroll']
    let contain;
    for(let v of containList)
    {
        contain = document.querySelector(v)
        if(contain != null)
        {
            break;
        }
    }
    console.log(contain)
    // 提取内容
    let arrTxt = [];
    // 预分析每行内容
    let lists = contain.querySelectorAll(".dnd-connect-source");
    for(let v of lists)
    {
        // 替换为 CSV格式
        arrTxt.push( v.innerText.replace(/\n/g,'\t'))
    }
    // 复制到剪切板
    window.copyString(arrTxt.join('\n'));
    myCopyDiv.innerText = '✔';
    // 重新显示复制按钮
    setTimeout(function(){myCopyDiv.innerText = '📋'},2000);
}
window.copyString = function(str){
    var save = function (e){
        e.clipboardData.setData('text/plain',str);
        e.preventDefault();
    }
    document.addEventListener('copy',save);
    document.execCommand("copy");
}