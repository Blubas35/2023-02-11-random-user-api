const form = document.querySelector('#form')
const submitButton = document.querySelector('#submit-button')
const randomSubmitButton = document.querySelector('#random-submit-button')
const genderRadio = document.querySelector('[name="gender"]')
const resultSelectElement = document.querySelector('#results')
const countriesSelectElement = document.querySelector('#countries')
const randomUserWrapper = document.querySelector('.random-user-wrapper')
console.log(genderRadio)

let resultsArr = [1, 2, 3, 4, 5]
let countryArr = ['AU', 'BR', 'CA', 'CH', 'DE', 'DK', 'ES', 'FI', 'FR', 'GB', 'IE', 'IN', 'IR', 'MX', 'NL', 'NO', 'NZ', 'RS', 'TR', 'UA', 'US']

randomSubmitButton.addEventListener('click', (event => {
    event.preventDefault()

    generateUser()
    removePrevious('.new')
}))

submitButton.addEventListener('click', (event) => {
    event.preventDefault()
    const genderRadio = document.querySelector('[name="gender"]:checked')
    const genderSelect = genderRadio.value
    const resultSelect = resultSelectElement.value
    const countrySelect = countriesSelectElement.value
    console.log(genderSelect)

    generateUser(resultSelect, genderSelect, countrySelect)
    removePrevious('.new')
})

function showHidden() {

}

function generateUser(results, gender, nat) {
    fetch(`https://randomuser.me/api/?results=${results}&gender=${gender}&nat=${nat}`)
        .then(res => res.json())
        .then(data => {
            let information = data.results
            information.map(info => {
                const randomUserElement = document.createElement('div')
                randomUserElement.className = 'random-user'
                randomUserWrapper.append(randomUserElement)

                const firstName = info.name.first
                const lastName = info.name.last
                const gender = info.gender
                const email = info.email
                const phone = info.phone
                const username = info.login.username
                const password = info.login.password
                const country = info.location.country
                const city = info.location.city
                const profilePhotoUrl = info.picture.large

                randomUserElement.className += ' new'

                const nameElement = document.createElement('h2')
                nameElement.textContent = `${firstName} ${lastName} (${gender})`
                const imageWrapper = document.createElement('img')
                imageWrapper.className = 'profile-photo'
                imageWrapper.src = profilePhotoUrl
                const personalInfoTitle = document.createElement('h3')
                personalInfoTitle.textContent = 'Personal info: '
                const personalInfoList = document.createElement('ul')
                const personalInfoElement1 = document.createElement('li')
                personalInfoElement1.textContent = `Phone number: ${email}`
                const personalInfoElement2 = document.createElement('li')
                personalInfoElement2.textContent = `Email address: ${phone}`
                personalInfoList.append(personalInfoElement1, personalInfoElement2)

                const personalLoginInfoTitle = document.createElement('h3')
                personalLoginInfoTitle.textContent = 'Personal login info: '
                const personalLoginInfoList = document.createElement('ul')
                const personalLoginInfoElement1 = document.createElement('li')
                personalLoginInfoElement1.textContent = `Username: ****`
                const personalLoginInfoElement2 = document.createElement('li')
                personalLoginInfoElement2.textContent = `Password: ****`
                personalLoginInfoList.append(personalLoginInfoElement1, personalLoginInfoElement2)

                const locationInfoTitle = document.createElement('h3')
                locationInfoTitle.textContent = 'Location info: '
                const locationInfo = document.createElement('ul')
                const countryElement = document.createElement('li')
                countryElement.textContent = `Country: ${country}`
                const cityElement = document.createElement('li')
                cityElement.textContent = `City: ${city}`
                locationInfo.append(countryElement, cityElement)

                const showInfoButton = document.createElement('button')
                showInfoButton.textContent = 'Show private information'

                let privateInfo = false

                showInfoButton.addEventListener('click', () => {
                    if (privateInfo) {
                        showInfoButton.textContent = 'Show private information'
                        personalLoginInfoElement1.textContent = `Username: ****`
                        personalLoginInfoElement2.textContent = `Password: ****`
                    } else {
                        showInfoButton.textContent = 'Hide private information'
                        personalLoginInfoElement1.textContent = `Username: ${username}`
                        personalLoginInfoElement2.textContent = `Password: ${password}`
                    }
                    privateInfo = !privateInfo

                })

                const deleteUserButton = document.createElement('button')
                deleteUserButton.textContent = 'Delete this user'

                deleteUserButton.addEventListener('click', () => {
                    randomUserElement.remove()
                })

                const allButtonWrapper = document.createElement('div')
                allButtonWrapper.className = 'button-wrapper'
                allButtonWrapper.append(showInfoButton, deleteUserButton)

                randomUserElement.append(nameElement, imageWrapper, personalInfoTitle, personalInfoList, personalLoginInfoTitle, personalLoginInfoList, locationInfoTitle, locationInfo, allButtonWrapper)                
            })
        })
}

function removePrevious(className) {
    let previousUser = document.querySelector(className)
    if (previousUser) {
        previousUser.remove()
    }
}

function generateOptions(arr, select) {
    let firstOptionElement = document.createElement('option')
    firstOptionElement.textContent = 'Any'
    firstOptionElement.value = ''
    select.append(firstOptionElement)
    arr.map(item => {
        const optionElement = document.createElement('option')
        optionElement.textContent = item
        select.append(optionElement)
    })
}
generateOptions(resultsArr, resultSelectElement)
generateOptions(countryArr, countriesSelectElement)