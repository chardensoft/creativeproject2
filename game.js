document.getElementById("dateSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  let date = document.getElementById("dateInput").value;
  if (date === "")
    return;
  var str1 = date.slice(-2);
  date = date.slice(0, -2) + (parseInt(str1) + 1); // "te"
  const url = "https://www.balldontlie.io/api/v1/games?dates[]=" + date;
  fetch(url)
  .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      let results = '<div class="games">';
      for (let i=0; i < json.data.length; i++) {
        results += '<div class="game_info">';
        results += '<h4 class = "date">' +
        moment(json.data[i].date).format('dddd[,] MMM DD [@] h:mm a') + '</h4>';
        results += '<div class = "teams">';
        results += '<h5 class = "team">' + json.data[i].home_team.full_name + '</h5>';
        results += '<h5 class = "team">'+ json.data[i].visitor_team.full_name + '</h5>';
        results += '</div>'
        results += '<div class="scores">'
        results += '<h4 class = "score">' + json.data[i].home_team_score + '</h4>';
        results += '<h4 class = "score">' + json.data[i].visitor_team_score + '</h4>';
        results += '</div>'
        results += '</div>'
      }
      results += '</div';
      document.getElementById("gameResults").innerHTML = results;
    }).catch(function(error) {
      let results = '<h2>No Data</h2>';
      document.getElementById("gameResults").innerHTML = results;
    });
});
