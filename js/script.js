let inptName = $('#GetName');
let inptInventory = $('#GetInventory');
let inptVariants = $('#GetVariants');
let inptPrice = $('#GetPrices').mask('09999.99');
let dateAdd, dateChange;
let id = 0;
let Order = {
    name: inptName.val(),
    inventory: inptInventory.val(),
    variants: inptVariants.val(),
    price: inptPrice.val()
};
let arrayOrder = [];



$('#addOrder').click(function(){
    dateAdd = new Date().toLocaleString();
    let obj = {
        id: id,
        name: inptName.val(),
        inventory: inptInventory.val(),
        variants: inptVariants.val(),
        price: inptPrice.val(),
        dateAdd: dateAdd,
        dateChange: dateChange ?? ''
    }
    arrayOrder.push(obj);




    Order = {
        name: inptName.val(),
        inventory: inptInventory.val(),
        variants: inptVariants.val(),
        price: inptPrice.val()
    }
    inptName.val('');
    inptInventory.val('');
    inptVariants.val('');
    inptPrice.val('');

    if(Order.name && Order.inventory && Order.inventory && Order.price){
        $('#orderBox').append(
        `
        <tr id="${id}" class="order" data-name="${Order.name}" data-inventory="${Order.inventory}" data-variants="${Order.variants}" data-price="${Order.price}" data-dateAdd="${dateAdd}" data-dateChange="${dateChange}">
            <td id="name" class="align-middle info-order" colspan="1">${Order.name}</td>
            <td id="inventory" class="align-middle info-order">${Order.inventory}</td>
            <td id="variants" class="align-middle info-order">${Order.variants}</td>
            <td id="price" class="align-middle info-order">${Order.price}</td>
            <td class="align-middle info-order">${dateAdd}</td>
            <td class="align-middle info-order">${dateChange ?? ''}</td>
            <td class="align-middle text-center">
            <a href="#" id="changeOrderTo" class="btn btn-sm btn-icon btn-secondary" data-toggle="sidebar">
                <i class="fa fa-pencil-alt"></i> 
                <span class="sr-only">Edit</span>
            </a> 
                <a href="#" id="removeOrderTo" class="btn btn-sm btn-icon btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="far fa-trash-alt"></i> 
                    <span class="sr-only">Remove</span>
                </a>
            </td>
        </tr>
        `
        )
    }
    else{
        alert('Введите все значения!')
    }
    id = id + 1;
})
$('#addBtnTo').click(function(){
    $('#addOrder').removeClass('d-none');
    $('#changeOrder').addClass('d-none');
})
$('#exitOrder').click(function(){
    inptName.val('');
    inptInventory.val('');
    inptVariants.val('');
    inptPrice.val('');
})


let changeOrder;
$('#orderBox').on('click', '#changeOrderTo', function(){
    changeOrder = $(this).parents('tr');
    inptName.val($(this).parents('tr').find('#name').text());
    inptInventory.val($(this).parents('tr').find('#inventory').text());
    inptVariants.val($(this).parents('tr').find('#variants').text());
    inptPrice.val($(this).parents('tr').find('#price').text());
    $('#changeOrder').removeClass('d-none');
    $('#addOrder').addClass('d-none');
})
$('#changeOrder').click(function(){
    dateChange = new Date().toLocaleString();
    arrayOrder.forEach(item => {
        if(item.id == changeOrder.attr('id')){
            item.name = inptName.val();
            item.inventory = inptInventory.val();
            item.variants = inptVariants.val();
            item.price = inptPrice.val();
            item.dateAdd = dateAdd;
            item.dateChange = dateChange ?? '';
        } 
    })


    Order = {
        name: inptName.val(),
        inventory: inptInventory.val(),
        variants: inptVariants.val(),
        price: inptPrice.val(),
    }
    inptName.val('');
    inptInventory.val('');
    inptVariants.val('');
    inptPrice.val('');

    if(Order.name && Order.inventory && Order.inventory && Order.price){
        changeOrder.attr('data-name', Order.name)
        changeOrder.attr('data-inventory', Order.inventory)
        changeOrder.attr('data-variants', Order.variants)
        changeOrder.attr('data-price', Order.price)
        changeOrder.html(
            `
            <td id="name" class="align-middle info-order" colspan="1">${Order.name}</td>
            <td id="inventory" class="align-middle info-order">${Order.inventory}</td>
            <td id="variants" class="align-middle info-order">${Order.variants}</td>
            <td id="price" class="align-middle info-order">${Order.price}</td>
            <td class="align-middle info-order">${dateAdd}</td>
            <td class="align-middle info-order">${dateChange}</td>
                <td class="align-middle text-center">
                <a href="#" id="changeOrderTo" class="btn btn-sm btn-icon btn-secondary" data-toggle="sidebar">
                    <i class="fa fa-pencil-alt"></i> 
                    <span class="sr-only">Edit</span>
                </a> 
                    <a href="#" id="removeOrder" class="btn btn-sm btn-icon btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i class="far fa-trash-alt"></i> 
                        <span class="sr-only">Remove</span>
                    </a>
                </td>
            `
        )
    }
    else{
        alert('Введите все значения!')
    }
    $(this).addClass('d-none')
})

$('#orderBox').on('click', '#removeOrderTo', function(){
    changeOrder = $(this).parents('tr');
})
$('#removeOrder').click(function(){
    changeOrder.remove();
})


$('#sortBtnName').click(function(){
    let orderBox = document.querySelector('#orderBox');
    if($(this).hasClass('sorting_asc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                if(orderBox.children[i].getAttribute('data-name') > $('.order')[j].getAttribute('data-name')){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
    else if($(this).hasClass('sorting_desc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                if(orderBox.children[i].getAttribute('data-name') < $('.order')[j].getAttribute('data-name')){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
})
$('#sortBtnItr').click(function(){
    let orderBox = document.querySelector('#orderBox');
    if($(this).hasClass('sorting_asc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                console.log(i,j)
                if(+orderBox.children[i].getAttribute('data-inventory') > +$('.order')[j].getAttribute('data-inventory')){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
    else if($(this).hasClass('sorting_desc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                if(+orderBox.children[i].getAttribute('data-inventory') < +$('.order')[j].getAttribute('data-inventory')){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
})


$('#sortBtnVr').click(function(){
    let orderBox = document.querySelector('#orderBox');
    if($(this).hasClass('sorting_asc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                if(+orderBox.children[i].getAttribute('data-variants') > +$('.order')[j].getAttribute('data-variants')){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
    else if($(this).hasClass('sorting_desc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                if(+orderBox.children[i].getAttribute('data-variants') < +$('.order')[j].getAttribute('data-variants')){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
})


$('#sortBtnPrs').click(function(){
    let orderBox = document.querySelector('#orderBox');
    if($(this).hasClass('sorting_asc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                if(+orderBox.children[i].getAttribute('data-price') > +$('.order')[j].getAttribute('data-price')){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
    else if($(this).hasClass('sorting_desc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                if(+orderBox.children[i].getAttribute('data-price') < +$('.order')[j].getAttribute('data-price')){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
})


$('#sortBtnDateAdd').click(function(){
    let orderBox = document.querySelector('#orderBox');
    if($(this).hasClass('sorting_asc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                let datePrev = orderBox.children[i].getAttribute('data-dateAdd');
                let dateNext = orderBox.children[j].getAttribute('data-dateAdd');
                datePrev = Date.parse(datePrev);
                dateNext = Date.parse(dateNext);
                console.log(datePrev,dateNext)
                if( datePrev > dateNext){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
    else if($(this).hasClass('sorting_desc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                let datePrev = orderBox.children[i].getAttribute('data-dateAdd');
                let dateNext = orderBox.children[j].getAttribute('data-dateAdd');
                datePrev = Date.parse(datePrev);
                dateNext = Date.parse(dateNext);
                if( datePrev < dateNext){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
})
$('#sortBtnDateChange').click(function(){
    let orderBox = document.querySelector('#orderBox');
    if($(this).hasClass('sorting_asc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                let datePrev = orderBox.children[i].getAttribute('data-dateChange');
                let dateNext = orderBox.children[j].getAttribute('data-dateChange');
                datePrev = Date.parse(datePrev);
                dateNext = Date.parse(dateNext);
                if( datePrev > dateNext){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
    else if($(this).hasClass('sorting_desc')){
        for(let i = 0; i < orderBox.children.length; i++){
            for(let j = i; j < orderBox.children.length; j++){
                let datePrev = orderBox.children[i].getAttribute('data-dateChange');
                let dateNext = orderBox.children[j].getAttribute('data-dateChange');
                datePrev = Date.parse(datePrev);
                dateNext = Date.parse(dateNext);
                if( datePrev < dateNext){
                    replacedNode = orderBox.replaceChild(orderBox.children[j], orderBox.children[i]);
                    insertAfter(replacedNode, orderBox.children[i])
                }
            }
        }
    }
})
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}














$('#showOrder').click(function(){
    $('#arrayOrder').html('')
    arrayOrder.forEach(item => {
        $('#arrayOrder').append(
        `
        <tr id="${item.id}" class="order" data-name="${item.name}" data-inventory="${item.inventory}" data-variants="${item.variants}" data-price="${item.price}" data-dateAdd="${item.dateAdd}" data-dateChange="${item.dateChange}">
            <td id="name" class="align-middle info-order" colspan="1"> name ${item.name}</td>
            <td id="inventory" class="align-middle info-order"> inventory ${item.inventory}</td>
            <td id="variants" class="align-middle info-order"> variants ${item.variants}</td>
            <td id="price" class="align-middle info-order"> price ${item.price}</td>
            <td class="align-middle info-order"> dateAdd ${item.dateAdd}</td>
            <td class="align-middle info-order"> dateChange ${item.dateChange ?? ''}</td>
        </tr>
        `
        )
    })
})









$('.sortBtn').click(function(){
    if(!$(this).hasClass('sorting_asc')){
        $(this).addClass('sorting_asc');
        $('.sortBtn').removeClass('sorting_desc');
    }
    else if(!$(this).hasClass('sorting_desc')){
        $(this).addClass('sorting_desc');
        $('.sortBtn').removeClass('sorting_asc');
    }
})












