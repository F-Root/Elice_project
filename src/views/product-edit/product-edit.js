const product_name = document.getElementById("product_name");
const product_company = document.getElementById("product_company");
const product_img = document.getElementById("product_img");
const product_price = document.getElementById("product_price");
const product_description = document.getElementById("product_description");
const productId = window.location.pathname.split('/').pop();

// 전체 카테고리 받아오기, API 아직 없음
fetch('url')
    .then(res => res.json())
    .then(data => {
        const category_option = document.createElement("option");

        for (let i = 0; i < data.length; i++) {
            category_option.value = data[i];
            const category_option_text = document.createTextNode(category_option_value);
            category_option.appendChild(category_option_text);
            product_category.appendChild(category_option);
        }
    })


// productId로 상품 정보 받아오기, API 아직 없음
fetch('url')
    .then(res => res.json())
    .then(data => {            
        product_company.value = data.company;
        product_img.value = data.img;
        product_category.value = data.category;
        product_name.value = data.productName;
        product_price.value = data.price;
        product_description.value = data.description;
    })


// '상품 수정하기' 버튼 누르면 동작
register_product_form.onsubmit = function() {
    const agree = confirm("상품을 수정하시겠습니까?");

    if (agree) {
        const product_name = this.product_name.value;
        const product_company = this.product_company.value;
        const product_price = parseInt(this.product_price.value);
        const product_category = this.product_category.value;

        const data = {
            productName: product_name,
            price: product_price,
            company: product_company,
            // 카테고리 데이터 받아와야 함
            category: product_category
        }
        
        // 상품 수정(put)
        fetch(URL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json()) 
        .then(data => {
            alert("상품 정보가 수정되었습니다.");
            // 상품 상세 페이지로 이동
            window.location.href = `../detail/:${productId}`;
        })
    }
}