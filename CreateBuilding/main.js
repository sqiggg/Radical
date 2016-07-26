function go(form) {
    var name2 = form.name.value;
    var FPS2 = form.FPS.value;
    var Cost2 = form.cost.value;
    var Description2 = form.description.value;

	var obj = JSON.parse(data);
	var buildings = {};

	for(var i = 0; i < Object.keys(obj[0].buildings).length; i++){

		//Fetching all of the data from the json 
		var name = Object.keys(obj[0].buildings)[i];
		var cost = obj[0].buildings[name].cost;
		var description = obj[0].buildings[name].description;
		var FPS = obj[0].buildings[name].BFPS;

		//putting them into the buildings dict
		buildings["buildings"] = {};
		buildings["buildings"][name] = {};
		buildings["buildings"][name]["name"] = Object.keys(obj[0].buildings)[i];
		
		buildings["buildings"][name]["cost"] = cost;
		buildings["buildings"][name]["description"] = description;
		buildings["buildings"][name]["BFPS"] = FPS;


	}

	buildings.buildings[name2] = {};
	buildings.buildings[name2]["name"] = escape;
	buildings.buildings[name2]["cost"] = Cost2;
	buildings.buildings[name2]["description"] = Description2.replace("\\'");
	buildings.buildings[name2]["BFPS"] = FPS2;

    alert("data='[" + JSON.stringify(buildings).replace("\\'") + "]'");
}
