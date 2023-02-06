let request = new XMLHttpRequest();
request.open("GET", "https://api.api-ninjas.com/v1/quotes?category=movies");
request.send();
request.onload= () => {
    confirm.length(request);
    if(request.status== 200){
        console.log(JSON.parse(request.response));
    }
    else {
        console.log(`error ${request.status} $request.statusText}`)
    }
}