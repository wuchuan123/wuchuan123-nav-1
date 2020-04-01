const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");

const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "G", url: "https://gitee.com/" },
  { logo: "G", url: "https://github.com/" },
  { logo: "Z", url: "https://www.zhihu.com" },
  { logo: "D", url: "https://www.douyu.com/" },
  {
    logo: "B",
    url: "https://www.bilibili.com"
  }
];
const simplifyUrl = url => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); //删除 / 开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    console.log(index);
    const $li = $(`<li>
            <div class="site">
              <div class="logo"><img width='40px' src='https://${simplifyUrl(node.url)}/favicon.ico' alt="${node.logo}"></div>
              <div class="link">${simplifyUrl(node.url)}</div>
              <div class='close'>
                <svg class="icon"">
                    <use xlink:href="#icon-close"></use>
                </svg>
              </div>
            </div> 
        </li>`).insertBefore($lastLi);
        console.log(node.logo)
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.find('img').on('error',()=>{
      $li.find('img').css({display:'none'})
      $li.find('.logo').html(`${node.logo}`)
    })
    $li.on("click", ".close", e => {
      console.log("这里");
      e.stopPropagation(); // 阻止冒泡
      console.log(hashMap);
      hashMap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址:");

  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });

  render();
});

window.onbeforeunload = () => {
  console.log("页面要关闭了");
  const string = JSON.stringify(hashMap);
  localStorage.setItem("x", string);
};

$(document).on('keypress', (e)=>{
    const {key} = e
    for(let i=0;i<hashMap.length;i++){
        if(hashMap[i].logo.toLowerCase()===key){
            window.open(hashMap[i].url)
        }
    }
})
