fetch('https://api.api-ninjas.com/v1/quotes?category=movies')
    .then(response => {
        return response.json();
    })
    .then(quotes =>{
        console.log(quotes);
    })