import * as Api from '/api.js';
import { addCommas } from '/useful-functions.js';

const shopping_cart_icon_url =
  'https://s3.ap-northeast-2.amazonaws.com/res.kurly.com/kurly/ico/2021/cart_white_45_45.svg';
const inner_list_products = document.getElementById('inner_list_products');
const thumbnail = document.querySelectorAll('.thumbnail');
const description = document.querySelectorAll('.description');
const categoryTemp = window.location.href.split('/');
const category = categoryTemp[categoryTemp.length - 2];

DataHandler(category);
categoryDisplay();

function categoryDisplay() {
  const menu = document.querySelectorAll('ul.menu_list li');
  for (let i = 1; i < menu.length; i++) {
    menu[i].addEventListener('click', async (e) => {
      const category = e.target.getAttribute('class');
      window.location.href = '/product/' + category;
    });
  }
}

async function DataHandler(category) {
  try {
    // 카테고리 상품 데이터 가져오기
    const url = category ? '/api/products/category' : '/api/products';
    const data = await Api.get(url, category);

    displayProductForCategory(data, category);
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

async function displayProductForCategory(data, category) {
  // 들어온 카테고리과 일치하는 제품만 페이지에 랜더해주자

  const url = category ? '/product/' + category : `/product`;
  // window.location.href = url;
  inner_list_products.innerHTML = '';
  data.forEach((element) => {
    const name = element.name;
    const img = element.img;
    const price = addCommas(element.price);
    const company = element.company;
    const id = element.productId;

    // 제품은 이런 형식으로 추가해주면 된다
    inner_list_products.innerHTML += `
        <div class="item">
            <div class="thumbnail" >
                <a onclick="location.href = '/product/detail/${id}'">
                    <img src="${img}" alt="임시" >
                </a>
            </div>
        
        <div class="description">
            <h3 class="description_text"><a onclick="location.href = '/product/detail/${id}'">[${company}] ${name}</a></h3>
            <div class="price">
            ${price}
            <span>원</span>
            </div>
        </div>
        </div>`;
  });
  return;
}
