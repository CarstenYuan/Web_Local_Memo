// 找出標籤(DOM)
var pressBtn = document.querySelector('.send');
var list = document.querySelector('.list');

// ** 將loaclStorage的內容讀取出來並轉成list
var data = JSON.parse(localStorage.getItem('listData')) || [];

// 動作(監聽)
pressBtn.addEventListener('click', addData);
list.addEventListener('click', toggleDone);
updateList(data);

// Function
// 新增資料至localStorage
function addData(e){
     //防止氣泡事件
    e.preventDefault();
    // 抓text中輸入的內容
    var text = document.querySelector('.text').value;
    var todo = {
        content: text
    };
    // 更新data(更新localStorage內的key->陣列)
    data.push(todo);
    // 更新完成後需要重新update顯示的memo區域
    updateList(data);
    // 將資料轉回string，並存回localStorage
    localStorage.setItem('listData', JSON.stringify(data));
}

// 更新Memo
function updateList(itmes){
    str = '';
    var dataLen = itmes.length;

    //將資料依序存入localStorage的key中(以陣列)
    for (var i = 0; i < dataLen; i++){
        // 以li方式呈現Memo
        // ** 加入data-index，以方便刪除可以以list來操作
        str += '<li><a href="#" data-index=' + i + '>X</a> <p>' + itmes[i].content + '</p></i>';
    };
    // 使用innerHTML插入新標籤 補充：innerHTML會將元素全刪除再更新
    list.innerHTML = str;
}

// 刪除Memo內的資料
function toggleDone(e){
    e.preventDefault();
    if (e.target.nodeName !== 'A'){return};
    var index = e.target.dataset.index; // 前面data-index用在這
    // 刪除第"index"筆Memo資料 補充：(第幾筆開始， 刪除幾筆)
    data.splice(index, 1);
    // 更新localStorage的key
    localStorage.setItem('listData', JSON.stringify(data));
    // 更新Memo
    updateList(data);
}