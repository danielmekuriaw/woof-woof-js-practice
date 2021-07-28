function renderAllPups(){
    fetch("http://localhost:3000/pups")
    .then(r => r.json())
    .then(pups => {
        pups.forEach(pup => renderPup(pup))
    })
}

renderAllPups()

let dogBar = document.querySelector("div#dog-bar")

function renderPup(pup){
    const dogSpan = document.createElement("span")  
    dogSpan.textContent = pup.name

    dogSpan.addEventListener('click', () => {
        let dogInfo = document.querySelector("div#dog-info")
        dogInfo.innerHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
        `
        let dogBtn = document.createElement('button')

        if (pup.isGoodDog){
            dogBtn.textContent = "Good Dog!"
        } else {
            dogBtn.textContent = "Bad Dog!" 
        }

        dogBtn.addEventListener('click', ()=> {
            let update;

            if (dogBtn.textContent === "Good Dog!"){
                dogBtn.textContent = "Bad Dog!"
                update = {"isGoodDog": false}
            }else {
                dogBtn.textContent = "Good Dog!"
                update = {"isGoodDog": true}
            }

            fetch(`http://localhost:3000/pups/${pup.id}`,{
                method: "PATCH",
                headers:{
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(update)
            }).then(_ => {
                if (goodDogFilter.textContent === "Filter good dogs: ON"){
                    renderFilteredPups()
                }
            })
        })

        dogInfo.append(dogBtn)
    })
    dogBar.append(dogSpan)
}

const goodDogFilter = document.querySelector("button#good-dog-filter")

goodDogFilter.addEventListener('click', ()=> {
    if (goodDogFilter.textContent === "Filter good dogs: OFF"){
        goodDogFilter.textContent = "Filter good dogs: ON"
        renderFilteredPups()
    } else {
        goodDogFilter.textContent = "Filter good dogs: OFF"
        resetDogBar()
        renderAllPups()
    }
})

function renderFilteredPups(){
    resetDogBar()
    fetch("http://localhost:3000/pups")
    .then(r => r.json())
    .then(pups => {
        let filteredPups = pups.filter((pup) => {
            return pup.isGoodDog === true
        })
        filteredPups.forEach(pup => renderPup(pup))
    })
}

function resetDogBar(){
    dogBar.innerHTML = ""
}