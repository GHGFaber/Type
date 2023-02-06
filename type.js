(fetch('https://reqres.in/api/users')
    .then(res => {
        if(res.ok){
            console.log('SUCCES')
        } else {
            console.log("Not Successful")
        }
    })
    .then(data => console.log(data)))
    .catch(error => console.log('ERROR'))