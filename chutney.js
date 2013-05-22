var chutney = (function(){
		
	var key,
		rootRTURL,
		dataFormat;

	function setApiKey(apiKey){

		key = apiKey;

	}

	function setDataFormat(format){
		if(format !== "json" && format !== "xml"){
			console.warn("Not a valid format. Must be JSON or XML");
			return false;
		}

		dataFormat = format.toLowerCase();

	}
	
	function makeRequest(URL){
		URL += "&callback=?";
		return jQuery.ajax({type : "GET", dataType : dataFormat, url : URL, cache: true});
	}
	
	function search(args, callbackFunction){
		
		if(args.page === undefined) args.page = 1;
		if(args.type === undefined) args.type = "movies";
		if(args.pageLimit === undefined) args.pageLimit = 10;
		if(args.query === undefined) {
			console.error("You've not defined a search term");
			return false;
		}
		
		var requestURL = rootRTURL;

		requestURL += args.type + "." + dataFormat + "?apikey=" + key + "&q=" + args.query + "&page_limit=" + args.pageLimit + "&page=" + args.page;
		
		if(callbackFunction === undefined || typeof callbackFunction !== "function") callbackFunction = success;

		jQuery.when(makeRequest(requestURL)).then(callbackFunction);
	
	}

	
	var movie = (function(){
		
		function checkID(ID){
			if(ID === undefined){
				console.error("You've not passed a ID");
				return false
			} else {
				return true;
			}
		}
		
		function getMovieInformation(ID, callbackFunction){
			if(!checkID(ID)) return false;
			
			var requestURL = rootRTURL;
			
			requestURL += "movies/" + ID + "." + dataFormat + "?apikey=" + key;
			
			if(callbackFunction === undefined || typeof callbackFunction !== "function") callbackFunction = success;
			
			jQuery.when(makeRequest(requestURL)).then(callbackFunction);
		
		}
		
		function getCastInformation(ID, callbackFunction){
			if(!checkID(ID)) return false;
			
			var requestURL = rootRTURL;
			
			requestURL += "movies/" + ID + "/cast." + dataFormat + "?apikey=" + key;
			
			if(callbackFunction === undefined || typeof callbackFunction !== "function") callbackFunction = success;
			
			jQuery.when(makeRequest(requestURL)).then(callbackFunction);
		}
		
		
		function getSimilarMovies(args, callbackFunction){
			
			if(!checkID(args.ID)) return false;
			
			if(args.limit === undefined) args.limit = 5;
			
			var requestURL = rootRTURL;
			
			requestURL += "movies/" + args.ID + "/similar." + dataFormat + "?limit=" + args.limit + "&apikey=" + key;
			
			if(callbackFunction === undefined || typeof callbackFunction !== "function") callbackFunction = success;
			
			jQuery.when(makeRequest(requestURL)).then(callbackFunction);
		}
		
		return {
			info : getMovieInformation,
			cast : getCastInformation,
			similar : getSimilarMovies
		}
		
	})();
	
	function success(data){
		console.log(data);
	}

	function error(data){
		console.log("ERROR");
		console.log(data);
		return data;
	}

	(function(){
		//This will set some of the variable
		rootRTURL = "http://api.rottentomatoes.com/api/public/v1.0/";
		dataFormat = "json"
		
	})()


	return{
		key : setApiKey,
		format : setDataFormat,
		search : search,
		movie : movie.info,
		cast : movie.cast,
		similar : movie.similar
	};

})();