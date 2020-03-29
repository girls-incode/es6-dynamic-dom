'use strict';

let log = console.log.bind(console);

function createBlock(data, field, className) {
    let block = document.createElement("div");
    let content = document.createTextNode(data[field]);
    
    block.className = className + "__" + field;
    block.appendChild(content);

    return block;
}

function createComments(comments, listItem, num) {
    let className = "comment-item";

    listItem.innerHTML = '';
    
    for (let i = 0; i < num; i++) {
        let commentItem = document.createElement("div");
        commentItem.className = className;
        
        commentItem.appendChild(createBlock(comments[i], "username", className));
        commentItem.appendChild(createBlock(comments[i], "message", className));
        
        listItem.appendChild(commentItem);
    }
}

async function fetchData(endpoint) {
    const res = await fetch(endpoint);
    const data = await res.json();
    return data;
}

function getComments() {
    let lists = document.querySelectorAll(".comment-list");

    lists.forEach(item => {
        let num = Number(item.getAttribute("data-count")) || 0;

        if (num) {
            item.innerHTML = "Loading...";
            
            fetchData('data.json').then(comments => {
                // simulate a failure
                // if (num == 2) throw Error('ups...');
                createComments(comments, item, num)
            }).catch(err => {
                item.innerHTML = '';
                log(err.message);
            })
        }
    })
}

getComments();