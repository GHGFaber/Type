fetch('https://api.api-ninjas.com/v1/quotes?category=movies')
  .then((response) => response.json())
  .then((data) => console.log(data));
