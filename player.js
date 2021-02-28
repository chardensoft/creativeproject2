function mainFetch(url, stats_url) {
  const mainResponse = fetch(url)
  .then(function(response) {
      return response.json();
    }).then(async function(json1) {
      if (json1.data.length === 0) {
        let results = '<h2>No Data</h2>';
        document.getElementById("playerResults").innerHTML = results;
      } else {
        let results = '<div class="players">';
        results += '<div class="player_head">';
        results += '<h3 class="player_header">' + "Last, First" + '</h3>';
        results += '<h3 class = "player_header">' + "Height" + '</h3>';
        results += '<h3 class = "player_header">' + "Position" + '</h3>';
        results += '<h3 class = "player_header">' + "GP" + '</h3>';
        results += '<h3 class = "player_header">' + "MPG" + '</h3>';
        results += '<h3 class = "player_header">' + "PTS" + '</h3>';
        results += '<h3 class = "player_header">' + "AST" + '</h3>';
        results += '<h3 class = "player_header">' + "REB" + '</h3>';
        results += '</div>';
        for (let i=0; i < json1.data.length; i++) {
          results += '<div class="player_info">';
          results += '<h4 class = "player">' + json1.data[i].last_name + ', ' +
            json1.data[i].first_name + '</h4>';
          results += '<h4 class ="height">' + json1.data[i].height_feet + '\' ' +
            json1.data[i].height_inches + '\"' + '</h4>';
          results += '<h4 class ="position">' + json1.data[i].position + '</h4>';
          let new_url = stats_url + json1.data[i].id;
          await secondFetch(new_url)
          .then(function(response) {
            return response.json();
          }).then(function(json2) {
            console.log(json2);
            results += '<h4 class="gp">' + json2.data[0].games_played + '</h4>';
            results += '<h4 class="min">' + json2.data[0].min + '</h4>';
            results += '<h4 class="pts">' + json2.data[0].pts + '</h4>';
            results += '<h4 class="ast">' + json2.data[0].ast + '</h4>';
            results += '<h4 class="reb">' + json2.data[0].reb + '</h4>';
          }).catch(function(error) {
            results += '<h4 class = "gp">' + "No data" + '</h4>';
            results += '<h4 class = "min">' + "No data" + '</h4>';
            results += '<h4 class = "pts">' + "No data" + '</h4>';
            results += '<h4 class = "ast">' + "No data" + '</h4>';
            results += '<h4 class = "reb">' + "No data" + '</h4>';
          });
          results += '</div>';
        }
        results += '</div>';
        document.getElementById("playerResults").innerHTML = results;
      }
    });
  return mainResponse;
}

function secondFetch(url) {
  const response = fetch(url);
  return response;
}


document.getElementById("nameSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  let name = document.getElementById("nameInput").value;
  if (name === "")
    return;
  const url = "https://www.balldontlie.io/api/v1/players?search=" + name;
  const stats_url = "https://www.balldontlie.io/api/v1/season_averages?player_ids[]=";
  mainFetch(url, stats_url);
});
