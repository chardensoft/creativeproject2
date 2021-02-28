
document.getElementById("nameSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  let name = document.getElementById("nameInput").value;
  if (name === "")
    return;
  const url = "https://www.balldontlie.io/api/v1/players?search=" + name;
  const stats_url = "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=";
  fetch(url)
  .then(function(response) {
      return response.json();
    }).then(function(json1) {
      let results = '<div class="players">';
      results += '<div class="player_head">'
      results += '<h3 class="player_header">' + "Last Name, First Name" + '</h3>';
      results += '<h3 class = "player_header">' + "Height" + '</h3>';
      results += '<h3 class = "player_header">' + "Position" + '</h3>';
      results += '</div>';
      for (let i=0; i < json1.data.length; i++) {
        results += '<div class="player_info">';
        results += '<h4 class = "player">' + json1.data[i].first_name + ' ' +
          json1.data[i].last_name + '</h4>';
        results += '<h4 class ="height">' + json1.data[i].height_feet + '\' ' +
          json1.data[i].height_inches + '\"' + '</h4>';
        results += '<h4 class ="position">' + json1.data[i].position + '</h4>';
        results += '</div>';
        let new_url = stats_url + json1.data[i].id;
        console.log(new_url);
        fetch(new_url)
        .then(function(response) {
            return response.json();
          }).then(function(json2) {
            console.log(json2);
            results += '<div class="player_stats">';
            results += '<h4 class = "games_played">' + json2.data[0].games_played + '</h4>';
            results += '</div>'
          });
      }
      results += '</div>';
      document.getElementById("playerResults").innerHTML = results;
    });
});
