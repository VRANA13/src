/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:    VISHALKUMAR RANA
 *      Student ID: 151059219
 *      Date:  MARCH 23, 2023
 */

// All of our data is available on the global `window` object.
const { artists, songs } = window;

console.log({ artists, songs }, "App Data");

window.activeArtistID = window.songs.artistId;
var menu = document.getElementById("menu");

window.artists.forEach((element) => {
  var liEle = document.createElement("ul");
  var buttonEle = document.createElement("button");

  buttonEle.onclick = function () {
    window.activeArtistID = element.id;
    window.render(window.activeArtistID);
  };
  buttonEle.textContent = `${element.name}`;
  liEle.append(buttonEle);
  menu.append(liEle);
});

// var tHeadEle = document.querySelector("table thead");
// var trElement = document.createElement("tr");
// var thS_Name = document.createElement("th");
// thS_Name.innerHTML = "Song Name";
// trElement.append(thS_Name);
// var thYear = document.createElement("th");
// thYear.innerHTML = "Year Recorded";
// trElement.append(thYear);
// var thTime = document.createElement("th");
// thTime.innerHTML = "Duration(mm:ss)";
// trElement.append(thTime);
// tHeadEle.append(trElement);

window.render = function () {
  var selectedArtist = window.artists.find((artist) => artist.id === window.activeArtistID);

  var socialMediaLinks = selectedArtist.links
    .map((link) => `<a href="${link.url}" target="_blank">${link.name}</a>`)
    .join(", ");

  var artistInfo = `${selectedArtist.name} (${socialMediaLinks})`;

  var selectedArtistElement = document.getElementById("selected-artist");
  selectedArtistElement.innerHTML = artistInfo;
  var songsToRender = window.songs.filter((song) => song.artistId === window.activeArtistID);

  var songsTableElement = document.getElementById("songs");
  songsTableElement.innerHTML = "";

  // var line = document.createElement("hr");
  // selectedArtist.appendChild(line);

  // songsToRender.forEach((song) => {
  //   if (!song.discontinued) {
  //     // var trEle = document.createElement("tr");
  //     // var nm = document.createElement("td");
  //     // nm.innerHTML = song.title;
  //     // trEle.append(nm);
  //     // var yr = document.createElement("td");
  //     // yr.innerHTML = song.year;
  //     // trEle.append(yr);
  //     // var ti = document.createElement("td");
  //     // ti.textContent = `${song.duration}`;
  //     // trEle.append(ti);
  //     // songsTableElement.appendChild(trEle);
  //     var div_card = document.createElement("div");
  //     div_card;
  //   }
  // });

  songsToRender.forEach((song) => {
    // selectedArtistElement.insertAdjacentHTML("afterend", "<hr>");
    if (!song.discontinued) {
      var songCard = document.createElement("div");
      songCard.className = "song-card";

      var songTitle = document.createElement("h3");
      songTitle.textContent = song.title;
      songCard.appendChild(songTitle);

      var img = document.createElement("img");
      img.src = song.url;

      songCard.appendChild(img);
      var songYear = document.createElement("p");
      songYear.textContent = "(" + song.year + ")";
      songCard.appendChild(songYear);

      var songDuration = document.createElement("p");
      songDuration.textContent = song.duration;
      songCard.appendChild(songDuration);

      var musicAp = document.createElement("audio");
      musicAp.controls = true;
      musicAp.src = song.music;
      songCard.appendChild(musicAp);
      songsTableElement.appendChild(songCard);
    }
  });
};
