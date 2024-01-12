$('.owl0').owlCarousel({
    loop: true,
    margin: 20,
    autoplay: true,
    autoWidth: true,
    center: true,
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        992: {
            items: 3
        },
        1400: {
            items: 4
        }
    }
})
$('.owl').owlCarousel();
var owl1 = $('.owl0')
$('.circle-prev').click(function () {
    owl1.trigger('prev.owl.carousel')
})
$('.circle-next').click(function () {
    owl1.trigger('next.owl.carousel')
})

let pdname = []
let price = []
let num = [0, 0, 0, 0, 0, 0]
let subtotal = [0, 0, 0, 0, 0, 0]
let total = 0

$('.btn-shop').click(function (e) {
    $('.menu-content').append('<div class="product-box"><div class="product-info"><h5 class="product-name"> ' + $(this).attr('name') + '</h5><h6 class="product-price">' + $(this).attr('price') + '</h6></div><div class="product-num"><select class="form-select"><option selected>0</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></div></div>');
    $(this).addClass('block')
    $(this).text('已加入')
    price.push(parseInt($(this).attr('price')))
    pdname.push($(this).attr('name'))
});

$('.menu-content').on('change', '.form-select', function () {  //綁定在父元素
    total = 0
    let allSelect = Array.from($('.form-select'))  //先轉陣列
    let thisSelect = allSelect.indexOf(this)  //用indexOf 找this
    num[thisSelect] = parseInt($(this).val());
    subtotal[thisSelect] = price[thisSelect] * num[thisSelect]
    for (const e of subtotal) {
        total += e
    }
    $('.total').text(total)
});



$('.btn-buy').click(function () {
    if (total != 0) {
        let msg = '\n已成功購買 清單如下 \n'
        for (let i = 0; i < pdname.length; i++) {
            if (num[i] == 0) {
                continue
            }
            msg += pdname[i] + '：共' + num[i] + '樣 小計' + subtotal[i] + '元 \n'
        }
        msg += '\n總計：' + total + '元'
        $.post('https://script.google.com/macros/s/AKfycby5Ry33bERuNKygqFy1HpWOBasUXDTBjomILw_E5BwDE5yhhmJmBJcp_skTbbB29RLUbQ/exec',
            { msg: msg },
            function (e) {
                console.log(e);
            });
        alert(msg)
    } else {
        alert('請選擇購買商品')
    }
})

