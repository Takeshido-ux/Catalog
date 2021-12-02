let inptName = $('#GetName');
let inptInventory = $('#GetInventory');
let inptVariants = $('#GetVariants');
let inptPrice = $('#GetPrices').mask('09999.99');
let orderDate = new Date($.now()).toLocaleDateString();
let Order = {
    name: inptName.val(),
    inventory: inptInventory.val(),
    variants: inptVariants.val(),
    price: inptPrice.val()
};

$('#addOrder').click(function(){
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
        <tr>
            <td id="name" class="align-middle info-order" colspan="2">${Order.name}</td>
            <td id="inventory" class="align-middle info-order"> ${Order.inventory}</td>
            <td id="variants" class="align-middle info-order"> ${Order.variants}</td>
            <td id="price" class="align-middle info-order">${Order.price}</td>
            <td class="align-middle info-order">${orderDate}</td>
            <td class="align-middle text-right">
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
        changeOrder.html(
            `
                <td class="align-middle info-order" colspan="2">${Order.name}</td>
                <td class="align-middle info-order">${Order.inventory}</td>
                <td class="align-middle info-order">${Order.variants}</td>
                <td class="align-middle info-order">${Order.price}</td>
                <td class="align-middle info-order">${orderDate}</td>
                <td class="align-middle text-right">
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












