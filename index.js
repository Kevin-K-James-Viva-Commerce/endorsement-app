import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsement-app-71b4f-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database, "endorsementList")

const inp = document.getElementById("input")
const  btn = document.getElementById("btn")
const endorsements = document.getElementById("endorsements")


btn.addEventListener("click", function() {
    let  endorsementMessage = inp.value
    push(endorsementListInDB, endorsementMessage)
    clearInputField()
    console.log("hello")
})

onValue(endorsementListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearEndorsementList()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            //let currentItemID = currentItem[0]
            //let currentItemValue = currentItem[1]
            
            appendCommentToEndorsementList(currentItem)
        }    
    } else {
        endorsementList.innerHTML = "No comments here... yet"
    }
})


function clearInputField() {
    inp.value = ""
}

function clearEndorsementList() {
    endorsements.innerHTML = ""
}

function appendCommentToEndorsementList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.classList.add("endorsement-message")
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `endorsementList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
    
    endorsements.append(newEl)
}