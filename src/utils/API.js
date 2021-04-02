// set of functions for dealing with API calls
// import { AwsClient } from 'aws4fetch';

export default {
	// "/dev/v1/nfl/games/284943"
	// environment / version / sport / category / identifier
	// environment and version can be figured out by the app, the rest should be passed in as a config object
	// config = {
	//   sport: Str,
	//   category: Str,
	//   identifier: Str or Num
	// }
	// https://na2rsxl5mh.execute-api.us-east-2.amazonaws.com/dev/v1/
	
	returnApiEndpoint() {
		return "";
	},
	
	get: ({ route, token }) => {
		// console.log(token)
		const headers = {
			"token" : token
		};
		const urlConfig = {
			method: "GET",
			// headers,
			// mode: 'cors',
			headers: headers
		};
		
		return fetch(route, urlConfig).then(response => response.json());
	},
	
	post: ({ route, body }) => {
		// console.log(token)
		const urlConfig = {
			method: "POST",
			body: body
		};
		
		return fetch(route, urlConfig).then(response => response.json());
	},
	
}
