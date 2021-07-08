import data from "./data"
import storage from "./storage"

class UI{
    constructor(){
  
    }
    selectors=()=>{
      const inputValueDisElm = document.querySelector('.tweet-name')
      const addBtnDisElm = document.querySelector('.addBtn')
      const filterInputDisElm = document.querySelector('.filter')
      const olDisElm = document.querySelector('.collection')
      const errorMsgDisElm = document.querySelector('.errorMsg')
      const msgDisElm = document.querySelector('.msg')
      const keyNumElm = document.querySelector('.keyNum span')
      return {
          inputValueDisElm,addBtnDisElm,filterInputDisElm,olDisElm,errorMsgDisElm,
          msgDisElm,msgDisElm,keyNumElm
      }
    }
     // load all event
    loadAllEventListener = ()=>{
      const {inputValueDisElm,addBtnDisElm,olDisElm,filterInputDisElm} = ui.selectors()
      window.addEventListener('DOMContentLoaded',()=>ui.getData(data.tweetData))
      inputValueDisElm.addEventListener('keydown',(e)=>data.checkWordLimit(e))
      addBtnDisElm.addEventListener('click',(e)=>ui.addTweet(e))
      olDisElm.addEventListener('click',(e)=>ui.modifyOrDeleteTweet(e))
      filterInputDisElm.addEventListener('keyup',(e)=>ui.searchTweet(e))
    }
    // show message if tweet found or not
    showMessage=(msg ='')=>{
      const {msgDisElm} = ui.selectors()  
      msgDisElm.textContent=msg
    }
    // getting data form store and populate ul
    getData=(tweetList)=>{
      const {olDisElm} = ui.selectors()  
        if(tweetList.length>0){
            ui.showMessage()
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
            ui.showMessage('No item to show')
        }
    }
    invalidInputMsg=()=>{
      const {errorMsgDisElm} = ui.selectors()  
      errorMsgDisElm.style.display=''
      errorMsgDisElm.textContent='Enter text between 1-15'
      errorMsgDisElm.style.backgroundColor='yellow'
      errorMsgDisElm.style.color='black'
      setTimeout(function(){
          errorMsgDisElm.textContent=''
          errorMsgDisElm.style.display='none'
      },2000)
    }
    resetInputValue=()=>{
      const {inputValueDisElm} = ui.selectors() 
      inputValueDisElm.value=''
    }
    // adding tweet
    addTweet=(e)=>{
      const {inputValueDisElm,olDisElm,keyNumElm} = ui.selectors()  
      const {
          date,time,checkTimeFromNow
      } = data.getDateTime()
      const id = data.generateTweetId()
      e.preventDefault()
      let name = inputValueDisElm.value
      const isInputOk = data.inValidInput(name)
      if(isInputOk){
          ui.invalidInputMsg()
      }else{
          const tweetName= name.trim()
          const tweetData={
              id,
              tweetName,
              date,
              time,
              checkTimeFromNow
          }
          olDisElm.innerHTML=''
          data.tweetData.push(tweetData)
          ui.getData(data.tweetData)
          storage.saveDataToLocalStorage(tweetData)
          data.num=0
          keyNumElm.textContent=data.num
          ui.resetInputValue()
      }
    }
    populateEditItem=(foundTweet)=>{
      const {inputValueDisElm,addBtnDisElm,keyNumElm} = ui.selectors()  
      inputValueDisElm.value = foundTweet.tweetName
      addBtnDisElm.style.display = 'none'
      const updateBtn =
          "<button type='submit' class='btn btn-primary btn-block middle2 w-50 update-tweet'>update</button>"
      document.querySelector('form').insertAdjacentHTML('beforeend', updateBtn)
      const checkCharCount = foundTweet.tweetName.length
      data.num=checkCharCount
      keyNumElm.textContent = checkCharCount
    }
    updateTweetItem=(id)=>{
      const {inputValueDisElm,olDisElm,keyNumElm,addBtnDisElm} = ui.selectors()  
          document.querySelector('.update-tweet').addEventListener('click',(e)=>{
              e.preventDefault()
              const isInputOk = data.inValidInput(inputValueDisElm.tweetName)
              if (isInputOk) {
                alert('input is not valid')
              }else{
                  data.updateTweetData(id)
              }
              olDisElm.innerHTML=''
              ui.getData(data.tweetData)
              ui.resetInputValue()
              addBtnDisElm.style.display = 'block'
              document.querySelector('.update-tweet').remove()
              //save updated array to localStorage
              localStorage.setItem('TweetItems', JSON.stringify(data.tweetData))
              data.num=0
              keyNumElm.textContent=data.num
          }) 
    }
    // edit,update and delete tweet from view and call deleteItemFromLocalStorage(id) for delete in localStorage
    modifyOrDeleteTweet=(e)=>{ 
          const target = e.target.parentElement
          const id = parseInt(target.id.split('-')[1])
          if(e.target.classList.contains('tweet-delete')){
              e.target.parentElement.parentElement.removeChild(target)
              data.filterData(id)
              storage.deleteItemFromLocalStorage(id)
          }else if(e.target.classList.contains('tweet-edit')){
              const foundTweet = data.findTweet(id)
              //i have to select the item to edit
              ui.populateEditItem(foundTweet)
              e.target.style.display='none'
              //update tweet
              ui.updateTweetItem(foundTweet.id)
           }
    }
    // search tweet from view
    searchTweet=(e)=>{
          const text = e.target.value.toLowerCase()
          let itemLength = 0
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
              ui.showMessage('')
          }else{
              ui.showMessage('No item found')
          }
    }
  
}
  
const ui = new UI()

export default ui