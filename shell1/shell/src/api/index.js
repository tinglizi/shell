import axios from 'axios'
axios.defaults.baseURL="http://localhost:3000";  //设置默认接口地址

export let lists=(page)=>{   //首页列表
    return axios.get(`/lists?page=${page}`);
};

export let getListDetail=(id)=>{   //详情页
  return axios.get(`/lists?id=${id}`);
};
export let getRecommends=(subject,id)=>{  //获取推荐数据
  return axios.get(`/recommends?subject=${subject}&id=${id}`)
};
export let getReplies=(id,page)=>{   //获取评论数据
  return axios.get(`/replies?id=${id}&page=${page}`)
};

export let getSearch=(keywords)=>{  //获取搜索数据
  return axios.get(`/search?keywords=${keywords}`)
};
export let getLogin=(user,pass)=>{  //登录
  return axios.get(`/login?user=${user}&pass=${pass}`)
};

export let getChannel=(key)=>{
  return axios.get(`/channel?key=${key}`);
};
