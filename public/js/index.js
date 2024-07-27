const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (evt)=>{
    evt.preventDefault()

    const location = search.value

    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`,
        {
            headers: {  
                'Origin': 'http://localhost:3000'
            }
        }
    ).then(res=>res.json().then(data=>{
        if(data.error)
            return messageOne.textContent = data.error
    
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        return 
    })).catch(err=>console.log(err))

    
})