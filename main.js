
const inputValueDisElm = document.querySelector('.product-name')
const addBtnDisElm = document.querySelector('.addBtn')
const filterInputDisElm = document.querySelector('.filter')
const productDeleteDisElm = document.querySelector('.product-delete')
const olDisElm = document.querySelector('.collection')
const errorMsgDisElm = document.querySelector('.errorMsg')
const msgDisElm = document.querySelector('.msg')
const keyNum = document.querySelector('.keyNum span')

let num=0


const productData=[]

function getData(productList){
    if(productList.length>0){
        msgDisElm.textContent=''
        let li=''
        

        productList.forEach(product => {
            li = document.createElement('li')
            li.className='collection-item mb-2'
            li.id=`product-${product.id}`
            li.innerHTML=`
                    <span>${product.productName}</span>
                    <button class="btn btn-dark btn-sm product-delete">Delete</button>
                     ${product.time}  
            `
            olDisElm.append(li)
        });

    }else{
        msgDisElm.textContent='No item to show'
    }

 
}

getData(productData)

inputValueDisElm.addEventListener('keypress',(e)=>{
    num++
    if(num>8){
        e.preventDefault()
        addBtnDisElm.setAttribute('disabled','disabled')
    }else if(e.keyCode===8){
        console.log(e.keyCode)
        num--
        keyNum.textContent=num
        addBtnDisElm.removeAttribute('disabled')
    }
    else{
        keyNum.textContent=num
    }
})

addBtnDisElm.addEventListener('click',(e)=>{
    e.preventDefault()
    let name = inputValueDisElm.value
    if(name === '' || name.length > 8){
        errorMsgDisElm.style.display=''
        errorMsgDisElm.textContent='Please give an input'
        errorMsgDisElm.style.color='red'
        setTimeout(function(){
            errorMsgDisElm.textContent=''
            errorMsgDisElm.style.display='none'
        },2000)
    }else{
        const productName= name.trim()
        const time = dayjs().format('h:m')
        const data={
            id:0,
            productName,
            time
        }
        olDisElm.innerHTML=''
        productData.push(data)
        getData(productData)
        num=0
        keyNum.textContent=num
        inputValueDisElm.value=''
    }
})




