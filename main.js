
(function (){
    const inputValueDisElm = document.querySelector('.tweet-name')
    const addBtnDisElm = document.querySelector('.addBtn')
    const filterInputDisElm = document.querySelector('.filter')
    // const tweetDeleteDisElm = document.querySelector('.tweet-delete')
    const olDisElm = document.querySelector('.collection')
    const errorMsgDisElm = document.querySelector('.errorMsg')
    const msgDisElm = document.querySelector('.msg')
    const keyNum = document.querySelector('.keyNum span')
    let num=0
    let tweetData=getDataFromLocalStorage()
    
    // load all event
    const loadAllEventListener = ()=>{
       window.addEventListener('DOMContentLoaded',getData.bind(null,tweetData))
       inputValueDisElm.addEventListener('keydown',checkWordLimit)
       addBtnDisElm.addEventListener('click',addTweet)
       olDisElm.addEventListener('click',modifyOrDeleteTweet)
       filterInputDisElm.addEventListener('keyup',searchTweet)
    }
    
    // show message if tweet found or not
    function showMessage(msg =''){
        msgDisElm.textContent=msg
        
    }
    
    // tweet getting from localStorage
    function getDataFromLocalStorage(){
        let items=''
        if(localStorage.getItem('TweetItems')===null){
            items=[]
        }else{
            items = JSON.parse(localStorage.getItem('TweetItems'))
        }
        return items
    }
    
    // saving tweet in localStorage
    function saveDataToLocalStorage(item){
        let items=''
        if(localStorage.getItem('TweetItems')===null){
            items=[]
            items.push(item)
            localStorage.setItem('TweetItems',JSON.stringify(items))
        }else{
            items = JSON.parse(localStorage.getItem('TweetItems'))
            items.push(item)
            localStorage.setItem('TweetItems',JSON.stringify(items))
        }
    }
    
    //tweet deleting form localStorage
    function deleteItemFromLocalStorage(id){
        const items =  JSON.parse(localStorage.getItem('TweetItems'))
        const result = items.filter((TweetItem)=>{
            return TweetItem.id!==id
        })
        localStorage.setItem('TweetItems',JSON.stringify(result))
        if(result.length===0){
            location.reload()
        }
    }
    
    // getting data form store and populate ul
    function getData(tweetList){
        if(tweetList.length>0){
            showMessage()
            let li=''
            tweetList.forEach(tweet => {
                li = document.createElement('li')
                li.className='collection-item mb-2'
                li.id=`tweet-${tweet.id}`
                li.innerHTML=`
                        <span>${tweet.tweetName}</span>
                        <button class="btn btn-primary btn-sm tweet-edit">Edit</button>
                        <button class="btn btn-danger btn-sm  tweet-delete">Delete</button>
                         ${tweet.date} ${tweet.time} ${tweet.checkTimeFromNow}
                `
                olDisElm.append(li)
            });
    
        }else{
            showMessage('No item to show')
        }
    }
    
    // counting word and if maximum then no word add to input filed
    const checkWordLimit = (e)=>{
        if (num < 15 && e.keyCode !== 8) {
            num++
        } else if (num > 0 && e.keyCode === 8) {
            num--
            addBtnDisElm.removeAttribute('disabled')
        } else if (num >= 15) {
            e.preventDefault()
            addBtnDisElm.setAttribute('disabled', 'disabled')
        }
        keyNum.textContent = num
    }

    function inValidInput(name) {
        return (
          name === ''
        )
      }
    
    // adding tweet
    const addTweet = (e)=>{
        e.preventDefault()
        let name = inputValueDisElm.value
        const isInputOk = inValidInput(name)
        if(isInputOk){
            errorMsgDisElm.style.display=''
            errorMsgDisElm.textContent='Enter text between 1-15'
            errorMsgDisElm.style.backgroundColor='yellow'
            errorMsgDisElm.style.color='black'
            setTimeout(function(){
                errorMsgDisElm.textContent=''
                errorMsgDisElm.style.display='none'
            },2000)
        }else{
            const tweetName= name.trim()
            const date = dayjs().format('MMM/DD/YYYY')
            const time = dayjs().format('LT')
            const checkTimeFromNow = dayjs().fromNow()
            let id
            if(tweetData.length===0){
                id=0
            }else{
                id=tweetData[tweetData.length-1].id+1
            }
            const data={
                id,
                tweetName,
                date,
                time,
                checkTimeFromNow
            }
            olDisElm.innerHTML=''
            tweetData.push(data)
            getData(tweetData)
            saveDataToLocalStorage(data)
            num=0
            keyNum.textContent=num
            inputValueDisElm.value=''
        }
    }
    
    // edit,update and delete tweet from view and call deleteItemFromLocalStorage(id) for delete in localStorage
    const modifyOrDeleteTweet = (e)=>{
        const target = e.target.parentElement
        const id = parseInt(target.id.split('-')[1])
        if(e.target.classList.contains('tweet-delete')){
            e.target.parentElement.parentElement.removeChild(target)
            const result = tweetData.filter(tweet=>{
                return tweet.id!==id
            })
            tweetData=result
            deleteItemFromLocalStorage(id)
        }else if(e.target.classList.contains('tweet-edit')){
            const foundTweet = findTweet(id)
            //i have to select the item to edit
            populateEditItem(foundTweet)
            //update tweet
            updateTweetItem(foundTweet.id)
         }
    }

    function findTweet(id) {
        const foundTweet = tweetData.find((TweetItem) => TweetItem.id === id)
        if (!foundTweet) {
          alert('You tweet is not Found')
          return
        }
        return foundTweet
    }

    function populateEditItem(foundTweet) {
        inputValueDisElm.value = foundTweet.tweetName
        addBtnDisElm.style.display = 'none'
        const updateBtn =
          "<button type='submit' class='btn btn-primary btn-block middle2 w-50 update-tweet'>update</button>"
        document.querySelector('form').insertAdjacentHTML('beforeend', updateBtn)
        const checkCharCount = foundTweet.tweetName.length
        num=checkCharCount
        keyNum.textContent = checkCharCount
        // document.querySelector('.edit-tweet').style.display = 'none'
    }

    function updateTweetItem(id){
        document.querySelector('.update-tweet').addEventListener('click',(e)=>{
            e.preventDefault()
            const isInputOk = inValidInput(inputValueDisElm.tweetName)
            if (isInputOk) {
              alert('input is not valid')
            }else{
                tweetData = tweetData.map((TweetItem) => {
                    if (TweetItem.id === id) {
                      return {
                        ...TweetItem,
                        tweetName: inputValueDisElm.value,
                      }
                    } else {
                      return TweetItem
                    }
                  })
            }
            olDisElm.innerHTML=''
            getData(tweetData)
            inputValueDisElm.value = ''
            addBtnDisElm.style.display = 'block'
            document.querySelector('.update-tweet').remove()
            //save updated array to localStorage
            localStorage.setItem('TweetItems', JSON.stringify(tweetData))
            num=0
            keyNum.textContent=num
        }) 
    }
    
    // search tweet from view
    const searchTweet=(e)=>{
        const text = e.target.value.toLowerCase()
        let itemLength= 0
        document.querySelectorAll('.collection .collection-item').forEach(item=>{
            const nameOfTweet = item.firstElementChild.textContent.toLowerCase()
            if(nameOfTweet.indexOf(text)===-1){
                item.style.display='none'
            }else{
                item.style.display='block'
                itemLength++
            }
        })
        if(itemLength>0){
            showMessage('')
        }else{
            showMessage('No item found')
        }
    }
    
    loadAllEventListener()    

})()

