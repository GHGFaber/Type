const url = "https://api.api-ninjas.com/v1/quotes?category=movies";
fetch(url, {
  method: "GET",
  withCredentials: true,
  headers: {
    "X-Auth-Token": "xCy2+7K4+sCujiFJWTqYMg==KLgD8GTdYqlJ5WCE"
  }
})
  .then(resp => resp.json())
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.log(error);
  });