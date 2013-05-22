#Chutney.js
A simple jQuery library for making JSONP requests to the Rotten Tomatoes API. Made as a part of a hack project which is why only some aspects of the API are covered.

##Basic Usage

Include the scripts in your HTML document, The make calls like so...

	chutney.METHODNAME(VALUES);

##Methods

#### key(APIKEY)

This should be the first method called before trying to use the library. It sets the api key that every request will use to get information from RT.

#### format(DATAFORMAT)

Sets the preferred data format you'd like responses in. Supported types are JSON and XML.

#### search(ARGUMENTS OBJECT, CALLBACK FUNCTION)

Allows you to search the RT database for movies. Pass the query parameters as an object.

Required values  
query : "MOVIE NAME"

Optional Values  
page : INT //Which page of results would you like  
type : STRING //Search type. Default to "movies"  
pageLimit : INT //The number of results you'd like per page. Defaults to 10.  

#### movie(MOVIE ID, CALLBACK FUNCTION)

Gets extended information for a movie.

#### cast(MOVIE ID, CALLBACK FUNCTION)

Gets the full cast list of a movie.

#### similar(ARGUMENTS OBJECT, CALLBACK FUNCTION)

Gets films similar to this move.

Required value  
id : Movie ID  

Optional values  
limit : INT //Number of results  
