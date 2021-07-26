import ui from "./ui"

class Data{
    constructor(){
        this.num=0
    }
    // counting word and if maximum then no word add to input filed
    checkWordLimit=(e)=>{
        const {addBtnDisElm,keyNumElm} = ui.selectors()  
        if (this.num < 15 && e.keyCode !== 8) {
            this.num++
        } else if (this.num > 0 && e.keyCode === 8) {
            this.num--
            addBtnDisElm.removeAttribute('disabled')
        } else if (this.num >= 15) {
            e.preventDefault()
            addBtnDisElm.setAttribute('disabled', 'disabled')
        }
        keyNumElm.textContent = this.num
    }
    inValidInput=(name)=>{
        return (
          name === ''
        )
    }
    generateTweetId=()=>{
        let id
        if(this.tweetData.length===0){
            id=0
        }else{
            id=this.tweetData[this.tweetData.length-1].id+1
        }
        return id
    }
    getDateTime=()=>{
        const date = dayjs().format('MMM/DD/YYYY')
        const time = dayjs().format('LT')
        const checkTime = dayjs().format()
        const checkTimeFromNow = dayjs(checkTime).fromNow()
        return {
            date,time,checkTime,checkTimeFromNow
        }
    }
    filterData=(id)=>{
        const result = this.tweetData.filter(tweet=>{
            return tweet.id!==id
        })
        this.tweetData=result
    }
    findTweet=(id)=>{
        const foundTweet = this.tweetData.find((TweetItem) => TweetItem.id === id)
        if (!foundTweet) {
          alert('You tweet is not Found')
          return
        }
        return foundTweet
    }
    updateTweetData=(id)=>{
        const {inputValueDisElm} = ui.selectors()
        const date = dayjs().format('MMM/DD/YYYY')
        const time = dayjs().format('LT')
        const checkTime = dayjs().format()
        const checkTimeFromNow = dayjs(checkTime).fromNow() 
        this.tweetData = this.tweetData.map((TweetItem) => {
            if (TweetItem.id === id) {
              return {
                ...TweetItem,
                tweetName: inputValueDisElm.value,
                date,
                time,
                checkTimeFromNow
              }
            } else {
              return TweetItem
            }
        })
    }
}
const data = new Data()

export default data