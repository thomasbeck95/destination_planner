/*
    document.querySelector("my selector goes here") ->
                                                        HTMLElement (object)
                                                        null

        tripForm                    -> HTMLElement object representing a <form>
        tripForm.destination        -> HTMLElement object representing a <input>
        tripForm.destination.value  -> string

    const newTrip = {
        destination: "Seoul",
        start: "2025-06-03",
        end: "2025-06-18",
        category: "Vacation"
    }
*/
const tripForm = document.querySelector("#tripForm");
const tripContainer = document.querySelector("#trips");
const modalBackdrop = document.querySelector('.modal-backdrop')
const editForm = document.querySelector("#editForm")

let trips = JSON.parse(localStorage.getItem('trips')) || [];

let today = new Date();
let pad0 = n => n < 10 ? "0"+n : n;
let todayFormatted = `${today.getFullYear()}-${pad0(today.getMonth()+1)}-${pad0(today.getDate())}`
console.log(todayFormatted)
//  today.format("YYYY-MM-DD")

let weekFromToday = new Date(today.getTime() + (7*24*60*60*1000))
console.log(weekFromToday)

console.log("today:", today)

console.log("trips:", trips)

renderTrips()

// prevent used to stop default behaviour
// tripForm is an HTMLElement
// destination is accessed using . insted of using ID query selector
tripForm.addEventListener("submit", function(event){
    event.preventDefault();
    const newTrip = {
        destination: tripForm.destination.value,
        start: tripForm.start.value,
        end: tripForm.end.value,
        category: tripForm.category.value
    };
    trips.push(newTrip);
    renderTrips();
    saveTrips();
})

function renderTrips(){
    // it was adding all previous trips again so used the line below to empty it in each itteration
    tripContainer.innerHTML = "";
    for (let i = 0; i < trips.length; i++){
        let trip = trips[i]
        /*
            tripContainer.insertAdjacentHTML("beforeend", `
                <div class="card">
                    <h4 class="cardHeadings">
                        ${trip.destination}
                        ${trip.start}
                        ${trip.end}
                        ${trip.category}
                    </h4>
                    <button id="deleteButton${i}" name="deleteButton">Delete</button>
                </div>
            `)
            let delBut = document.querySelector(`#deleteButton${i}`);
        */
        let card = document.createElement("div")
        let h4 = document.createElement("h4")
        let delBut = document.createElement("button");
        let editBut = document.createElement("button")

        card.classList.add('card')
        h4.innerHTML = trip.destination

        delBut.classList.add('delBut')
        delBut.innerText = "Delete"

        editBut.id = `editButton`
        editBut.innerText = `Edit`

        tripContainer.append(card);
        card.append(h4);
        card.insertAdjacentHTML('beforeend', `
            <p>${trip.start}</p>
            <p>${trip.end}</p>
            <p>${trip.category}</p>
        `)
        card.append(delBut);
        card.append(editBut);

        // needed used to click instead of submit
        delBut.addEventListener("click", function(){
            trips.splice(i,1);
            renderTrips();
            saveTrips();
        })

        editBut.addEventListener("click", function(){
            openEditForm(trip, i)
        })
    }
}

function openEditForm(trip, i) {
    modalBackdrop.classList.remove("hidden");
    editForm.destination.value = trip.destination
    editForm.start.value = trip.start;
    editForm.end.value = trip.end;
    editForm.category.value = trip.category;

    // create the save button and append to the form
    editForm.insertAdjacentHTML("beforeend",`
    <button id="saveButton">Save</button>
    `);

    const saveButton = document.querySelector("#saveButton");
    saveButton.addEventListener("click",function(event){
        event.preventDefault();
        const updatedTrip = {
            destination: editForm.destination.value,
            start: editForm.start.value,
            end: editForm.end.value,
            category: editForm.category.value
        };
        // spice takes in index, number of elements, updated
        trips.splice(i,1,updatedTrip);
        renderTrips();
        close();
        saveTrips();
    })

}

/*
    Cancel button in the modal?
    Save button?
        How does it know which trip to edit?
            Maybe we add the event listener on edit,
            and remove it on save/cancel
    // https://www.youtube.com/watch?v=hhur7pY8i1A
*/



// using local storage
// everything is stored as a string
// console.log(typeof localStorage.getItem('a'))
// function to save the storage
// save trips to local storage

/*
    localStorage.setItem(key, value)
    localStorage.getItem(key)
    JSON.stringify(any)
    JSON.parse(string)
*/

let obj = { a: 1, b: 2, c: undefined, d: [0, 0, 0], e: "hello", doSomething() {} }
let stringifiedObj = JSON.stringify(obj)
let parsedObj = JSON.parse(stringifiedObj)
console.log(obj, stringifiedObj, parsedObj)

function saveTrips(){
    localStorage.setItem('trips', JSON.stringify(trips));
}

canBut = document.querySelector("#cancelButton");
canBut.addEventListener("click", close)

function close(){
        modalBackdrop.classList.add("hidden");
    saveButton = document.querySelector("#saveButton");
    saveButton.remove();
}

// const testBtn = document.querySelector("#test-btn");

// function handleTestBtnClick() {
//     document.body.style.backgroundColor = `hsl(${Math.floor(Math.random()*360)}, 75%, 75%)`
// }

// testBtn.addEventListener('click', handleTestBtnClick)

// setTimeout(function() {
//     testBtn.removeEventListener('click', handleTestBtnClick)
// }, 5000);



