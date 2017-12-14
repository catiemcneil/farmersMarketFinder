# farmersMarketFinder

# Notes
//This is so that we can loop through each link and git it it's own onClick
selectID = document.querySelector('.whatever');

for(let market = 0; market < selectID.length; market++){
  selectID[market].onClick = functionName
  //selectID[market].id <-- this is what we will use in the api query
}
