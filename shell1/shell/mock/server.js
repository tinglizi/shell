let fs=require('fs');
let http=require('http');
let url=require('url');

let list=require('./list.json');

//读取文件
function read(file,fn){  //因为readFile是异步的，所以用回调函数来调用
  fs.readFile(file,(err,data)=>{
    if(err || data.length==0){ //如果发生错误，或者没有数据，将空数组返回
      fn([]);
    }else{
      fn(JSON.parse(data));
    }
  })
}
/*read(function (s) {
  console.log(s);
})*/
http.createServer((req,res)=>{
  // //解决跨域
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
  res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.setHeader("X-Powered-By",' 3.2.1');
  if(req.method=="OPTIONS") return res.end();//让options快速返回
  let num=5;
  let {pathname,query}=url.parse(req.url,true); //获取的请求的url
  if(pathname==='/lists'){
    let id=parseInt(query.id);  //获取请求的id
    let key=parseInt(query.key);  //获取请求的key
    switch (req.method){   //restful模式，
      case 'GET':        //如果为get请求
          if(!isNaN(id)){    //如果id存在
            read('./list.json',function (lists) {
              res.writeHead(200,{'Content-Type':'text/json;charset=utf8'});
              let getlist=lists.find(item=>{   //在所有的列表中找到与请求的id相同的那一项返回
                return item.id==id;
              })
              if(!getlist) getlist={};    //没有找到，则置为空对象
              return res.end(JSON.stringify(getlist)); //将数据返回
            })
          }else{   //请求的为所有列表
            let page=parseInt(query.page) || 0;
            read('./list.json',function (lists) {
              res.writeHead(200,{'Content-Type':'text/json;charset=utf8'});
              let hasMore=true;
              let result=lists.slice(page,num+page);
              if(lists.length<=num+page){
                hasMore=false;
              }
              return res.end(JSON.stringify({hasMore,lists:result}));
            })
          }
        }
  }
  if(pathname==='/recommends'){
    let subject=query.subject;
    let id=parseInt(query.id);
    if(subject){
      read('./list.json',function (recommends) {
        res.writeHead(200,{'Content-Type':'text/json;charset=utf8'});
        let recommend=recommends.filter(item=>{
          return item.subject_key==subject && item.id != id;
        })
        if(!recommend) return {};
        return res.end(JSON.stringify(recommend));
      })
    }
  }

  if(pathname=='/replies'){
    let id=query.id;
    let page1=parseInt(query.page) || 0;
    if(id){
      read('./replies.json',function (replies) {
        res.writeHead(200,{'Content-Type':'text/json;charset=utf8'});
        let replie=replies.filter(item=>{
          return item.article_id==id;
        });
        if(!replie) return {};
        let result=replie.slice(page1,page1+num);
        let hasMore=true; //默认有更多
        if(replie.length<=num+page1){
          hasMore=false;
        }
        return res.end(JSON.stringify({hasMore,relese:result}));
      })
    }
  }
  if(pathname=='/search'){
    let keywords=query.keywords;
      read('./search.json',contents=>{
        let result1=contents.filter(item=>{
            return item;
        });
       /* console.log(result1[0].result);*/
        if(keywords){
          let arr=[];
          for(var i in result1){
            for(var j in result1[i].result){
              if(result1[i].result[j].s_content.indexOf(keywords)>-1){
                arr.push(result1[i].result[j]);
              }
            }
          }
          res.writeHead(200,{'Content-Type':'text/json;charset=utf8'});
          return res.end(JSON.stringify({arr,dataType:1}));
        }else{
          res.writeHead(200,{'Content-Type':'text/json;charset=utf8'});
          return res.end(JSON.stringify({dataType:0}));
        }

      })
    }
    if(pathname=='/login'){
      let user=query.user;
      let pass=query.pass;
      res.writeHead(200,{'Content-Type':'text/json;charset=utf8'});
      if(user=='123' && pass=='123'){
        return res.end(JSON.stringify({status:1,user:'123',pass:'123'}));
      }else{
        return res.end(JSON.stringify({status:0}));
      }
    }
    if(pathname=='/channel'){
      let key=query.key;
      read('./list.json',function (lists) {
        let result=lists.filter(item=>{
          return item;
        });
        let arr=[];
        for(var i in result){
          for(var j in result[i].channels){
            if(result[i].channels[j].name==key){
              arr.push(result[i]);
            }
          }
        }
        res.writeHead(200,{'Content-Type':'text/json;charset=utf8'});
        return res.end(JSON.stringify({arr}));
      })
    }


}).listen(3000);
