class Storage{
    constructor(){
 
    }
      // tweet getting from localStorage
     getDataFromLocalStorage=()=>{
         let items=''
         if(localStorage.getItem('TweetItems')===null){
             items=[]
         }else{
             items = JSON.parse(localStorage.getItem('TweetItems'))
         }
         return items
     }
     // saving tweet in localStorage
     saveDataToLocalStorage=(item)=>{
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
     deleteItemFromLocalStorage=(id)=>{
         const items =  JSON.parse(localStorage.getItem('TweetItems'))
         const result = items.filter((TweetItem)=>{
             return TweetItem.id!==id
         })
         localStorage.setItem('TweetItems',JSON.stringify(result))
         if(result.length===0){
             location.reload()
         }
     }
}
 
 const storage = new Storage()

 export default storage