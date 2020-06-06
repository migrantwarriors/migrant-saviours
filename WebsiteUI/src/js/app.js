 if($('.page-content-wrapper').hasClass('dashboard_page')) {
    google.charts.load('current', { 'packages': ['corechart'], 'language': 'en' });
 }
// google.charts.setOnLoadCallback(drawChart);
$(window).on("throttledresize", function (event) {
    // drawChart();
});


var max_limit = 3; // Max Limit
$(document).ready(function () {

	if($('#map').length != 0) {
        getGeojson();
	}

    /********************** Carousel function **********************/
    $("#myCarousel").carousel("pause");


    /********************** Marquee of states function **********************/
    $(function () {
        $('.simple-marquee-container').SimpleMarquee({
            hover: true,
            duration: 30000
        });
    });


    /********************** Real date & time function **********************/
    var d = new Date().toString();
    var date_res = d.slice(4, 21);
    // var zone_res = d.slice(25, d.length);
    $('.date-text .date').html(date_res);
    // $('.date-text .time-zone').html(zone_res);


    $(".checkbox input:checkbox").each(function (index) {
        this.cbInput = $(this);
        this.checked = (".checkbox input:checkbox" < max_limit);
    }).change(function () {
        if ($(".checkbox input:checkbox:checked").length > max_limit) {
            this.checked = false;
        }
        else {
            if (this.cbInput.prop("checked") == true) {
                this.cbInput.parents('.checkbox').addClass('checkbox-checked');
            }
            else if ($(this).prop("checked") == false) {
                this.cbInput.parents('.checkbox').removeClass('checkbox-checked');
            }
        }
    });
});



function draw_topfiveSkills_chart(data) {
    
    // Data for skills pie chart
    var skillname = [];
    var skillcount = [];
    var api_skills_data = data[0];
    for (var prop in api_skills_data) {
        skillname.push(prop);
        skillcount.push(api_skills_data[prop]);
    }

    var data1 = google.visualization.arrayToDataTable([
        ['Skill', 'Manpower'],
        [skillname[0], skillcount[0]],
        [skillname[1], skillcount[1]],
        [skillname[2], skillcount[2]],
        [skillname[3], skillcount[3]],
        [skillname[4], skillcount[4]]
    ]);

    // Options for skills pie chart
    var options1 = {
        title: 'Top 5 skills as % of registration',
        titleTextStyle: { 
            color: "#16619c",
            fontSize: 16
        },
        colors: ['orange', '#00cc33', 'pink', 'yellow', 'lightblue'],
        legend: {
            textStyle: {
                fontSize: 14
            },
            alignment: 'center'
        },
        width: '100%',
        height: 300,
        chartArea: {
            left: "10%",
            top: 60,
            height: 200,
            width: "90%"
        }
    };

    
    var len = skillcount.length;
    for(var i=0;i<len;i++) {
        if(skillcount[i] != 0) {
            // Instantiate and draw skills pie chart, passing in some options.
            var chart1 = new google.visualization.PieChart(document.getElementById('skills-graph'));
            chart1.draw(data1, options1);
            break;
        }
        else if(i == len - 1) {
            document.getElementById('skills-graph').innerHTML = '<div class="noData-graph"><p>No data available</p></div>';
        }
    }
    
    
    function selectHandler() {
        window.location.href = 'skills.html';
    }

    // Listen for the 'select' event, and call my function selectHandler() when
    // the user selects something on the chart.
    if(chart1 != undefined || chart1 != null) {
        google.visualization.events.addListener(chart1, 'select', selectHandler);
    }

}

function draw_timebasedUsers_chart(data) {

    // Data for time based line chart
    var value1 = [];
    var value2 = [];
    var value3 = [];
    
    var api_skills_data = data[0];
    for (var prop in api_skills_data) {
        value1.push(prop);
        value2.push(api_skills_data[prop].verified);
        value3.push(api_skills_data[prop].unVerified);
    }
    
    var data2 = google.visualization.arrayToDataTable([
        ['Days', 'Verified', 'Non verified'],
        [value1[0], value2[0], value3[0]],
        [value1[1], value2[1], value3[1]],
        [value1[2], value2[2], value3[2]],
        [value1[3], value2[3], value3[3]],
        [value1[4], value2[4], value3[4]],
        [value1[5], value2[5], value3[5]],
        [value1[6], value2[6], value3[6]]
    ]);

    // Options for time based line chart
    var options2 = {
        title: 'Verified & Non verified Migrants (Last 7 days)',
        titleTextStyle: { 
            color: "#16619c",
            fontSize: 16
        },
        curveType: 'function',
        colors: ['orange', '#00cc33'],
        legend: {
            textStyle: {
                fontSize: 14
            },
            position: 'bottom'
        },
        width: '100%',
        height: 300,
        chartArea: {
            left: "10%",
            top: 60,
            height: 200,
            width: "90%"
        }
    };
    
    var len = value2.length;
    for(var i=0;i<len;i++) {
        if(value2[i] != 0 || value3[i] != 0) {
            // Instantiate and draw time based line chart, passing in some options.
            var chart2 = new google.visualization.LineChart(document.getElementById('migrants-graph'));
            chart2.draw(data2, options2);
            break;
        }
        else if(i == len - 1) {
            document.getElementById('migrants-graph').innerHTML = '<div class="noData-graph"><p>No data available</p></div>';
        }
    }

}

function draw_regModes_chart(data) {
    // Data for modes of registration donut chart
    var value1 = [];
    var value2 = [];
    var api_data = data[0];
    for (var prop in api_data) {
        value1.push(prop);
        value2.push(api_data[prop]);
    }
    
    var data3 = google.visualization.arrayToDataTable([
        ['Registration mode', 'Count'],
        [value1[0], value2[0]],
        [value1[1], value2[1]],
        [value1[2], value2[2]],
        [value1[3], value2[3]],
        [value1[4], value2[4]]
    ]);

    var options3 = {
        title: 'Modes of registration',
        titleTextStyle: { 
            color: "#16619c",
            fontSize: 16
        },
        colors: ['#447aa6', '#008000', '#e13423', '#d79300', '#43b51f'],
        // pieHole: 0.4,
        is3D: true,
        legend: {
            textStyle: {
                fontSize: 14
            },
            alignment: 'center'
        },
        width: '100%',
        height: 300,
        chartArea: {
            left: "10%",
            top: 60,
            height: 200,
            width: "90%"
        }
    };
    
    var len = value2.length;
    for(var i=0;i<len;i++) {
        if(value2[i] != 0 ) {
            // Instantiate and draw time based donut chart, passing in some options.
            var chart3 = new google.visualization.PieChart(document.getElementById('reg_modes-graph'));
            chart3.draw(data3, options3);
            break;
        }
        else if(i == len - 1) {
            document.getElementById('reg_modes-graph').innerHTML = '<div class="noData-graph"><p>No data available</p></div>';
        }
    }

}

function draw_skillBasedUsers_chart(data) {
    // Data for Top 5 skills based verified & non-verified users combo chart
    var value1 = [];
    var value2 = [];
    var value3 = [];
    var api_data = data[0];
    for (var prop in api_data) {
        value1.push(prop);
        var single_data = api_data[prop]; 
        value2.push(single_data.verified);
        value3.push(single_data.unverified);
    }

    var data6 = google.visualization.arrayToDataTable([
        ['Skill', 'Verified Uers', 'Non verified users'],
        [value1[0], value2[0], value3[0]],
        [value1[1], value2[1], value3[1]],
        [value1[2], value2[2], value3[2]],
        [value1[3], value2[3], value3[3]],
        [value1[4], value2[4], value3[4]],
    ]);

    var options6 = {
        title: 'Top 5 Skills as registrations',
        titleTextStyle: { 
            color: "#16619c",
            fontSize: 16,
            alignment: 'center'
        },
        tooltip: {
            textStyle: {
                fontSize: 14
            }
        },
        legend: {
            textStyle: {
                fontSize: 14
            },
            position: 'bottom'
        },
        colors: ['green', '#ff4c4c'],
        width: '100%',
        height: 300,
        chartArea: {
            left: "10%",
            top: 60,
            height: 170,
            width: "90%"
        }
    };
    
    var len = value2.length;
    for(var i=0;i<len;i++) {
        if(value2[i] != 0 || value3[i] != 0) {
            // Instantiate and draw time based donut chart, passing in some options.
            var chart6 = new google.visualization.ColumnChart(document.getElementById('skillBasedUsers-graph'));
            chart6.draw(data6, options6);
            break;
        }
        else if(i == len - 1) {
            document.getElementById('skillBasedUsers-graph').innerHTML = '<div class="noData-graph"><p>No data available</p></div>';
        }
    }

}

// No filter based on state/district
function draw_maleUsers_chart(data) {

    // Data for Male Registrants column chart
    var value1 = [];
    var value2 = [];
    var api_data = data[0];
    for (var prop in api_data) {
        value1.push(prop);
        value2.push(api_data[prop]);
    }
    
    var data4 = google.visualization.arrayToDataTable([
        ['State', 'Male Migrants'],
        [value1[0], value2[0]],
        [value1[1], value2[1]],
        [value1[2], value2[2]],
        [value1[3], value2[3]],
        [value1[4], value2[4]],
    ]);

    var view = new google.visualization.DataView(data4);
    view.setColumns([0]);

    var options4 = {
        title: "Top 5 States with Highest Male registration",
        titleTextStyle: { 
            color: "#16619c",
            fontSize: 16
        },
        tooltip: {
            textStyle: {
                fontSize: 14
            }
        },
        legend: {
            position: 'none'
        },
        width: '100%',
        height: 300,
        chartArea: {
            left: "10%",
            top: 60,
            height: 170,
            width: "90%"
        },
        bar: { groupWidth: "50%" }
    };

    var len = value2.length;
    for(var i=0;i<len;i++) {
        if(value2[i] != 0) {
            // Instantiate and draw time based column chart, passing in some options.
            var chart4 = new google.visualization.ColumnChart(document.getElementById('male-graph'));
            chart4.draw(data4, options4);
            break;
        }
        else if(i == len - 1) {
            document.getElementById('male-graph').innerHTML = '<div class="noData-graph"><p>No data available</p></div>';
        }
    }

}

// No filter based on state/district
function draw_femaleUsers_chart(data) {

    // Data for Female Registrants column chart
    var value1 = [];
    var value2 = [];
    var api_data = data[0];
    for (var prop in api_data) {
        value1.push(prop);
        value2.push(api_data[prop]);
    }
    
    var data5 = google.visualization.arrayToDataTable([
        ['State', 'Female Migrants', { role: 'style' }],
        [value1[0], value2[0], "pink"],
        [value1[1], value2[1], "pink"],
        [value1[2], value2[2], "pink"],
        [value1[3], value2[3], "pink"],
        [value1[4], value2[4], "pink"],
    ]);

    // var view = new google.visualization.DataView(data4);
    // view.setColumns([0]);

    var options5 = {
        title: "Top 5 States with Highest Female registration",
        titleTextStyle: { 
            color: "#16619c",
            fontSize: 16
        },
        tooltip: {
            textStyle: {
                fontSize: 14
            }
        },
        legend: {
            position: 'none'
        },
        width: '100%',
        height: 300,
        chartArea: {
            left: "10%",
            top: 60,
            height: 170,
            width: "90%"
        },
        bar: { groupWidth: "50%" }
    };

    var len = value2.length;
    for(var i=0;i<len;i++) {
        if(value2[i] != 0) {
            // Instantiate and draw time based column chart, passing in some options.
            var chart5 = new google.visualization.ColumnChart(document.getElementById('female-graph'));
            chart5.draw(data5, options5);
            break;
        }
        else if(i == len - 1) {
            document.getElementById('female-graph').innerHTML = '<div class="noData-graph"><p>No data available</p></div>';
        }
    }
    
}


/********************** DataCapture transitions function **********************/
$(".input-transition-effect").focusout(function () {
    var $this = $(this);
    if ($(this).val() == '' || $(this).val() == "null") {
        if(! $this.parent().parent().hasClass('custom_select-form_group')) {
            $(this)
                .removeClass("has-content")
                .parent().addClass('error-input-wrap')
                .find('.msg-div').html('Please enter you details');
        }
    }
    else {
        $(this).addClass("has-content").parent().removeClass('error-input-wrap');
    }
});

$("input.input-transition-effect").keyup(function () {
    if ($(this).val() == '' || $(this).val() == "null") {
        if(! $this.parent().parent().hasClass('custom_select-form_group')) {
            $(this).removeClass("has-content").parent().addClass('error-input-wrap');
        }
    }
    else {
        $(this).addClass("has-content").parent().removeClass('error-input-wrap');
    }
});


//TOGGLING NESTED ul
$(".drop-down .selected a").click(function () {
    $(this)
        .parent().addClass('select-focussed')
        .toggleClass('arrow-toggle')
        .find('.floated-label').addClass('active');
    $(this).parents('.drop-down').find('.options ul').toggle();
});

//SELECT OPTIONS AND HIDE OPTION AFTER SELECTION
$(document).on('click', '#gender_dropdown .drop-down .options ul li a', function () {
    $this = $(this);
    $this.parents('.drop-down').addClass('has-content');
    var text = $this.html();
    $this.parents('.drop-down').find('.selected a span').html(text);
    $this.parents('.drop-down').find('.options ul').hide();
    $this.parents('.drop-down').find('.selected').removeClass('arrow-toggle');
});

//HIDE OPTIONS IF CLICKED ANYWHERE ELSE ON PAGE
$(document).bind('click', function (e) {
    var $clicked = $(e.target);
    if ((!$clicked.parents().hasClass("drop-down"))) {
        $(".drop-down .options ul").hide();
        $('.selected').removeClass('arrow-toggle');
        if (!$('.drop-down').hasClass('has-content')) {
            $('.selected.select-focussed')
                .removeClass('select-focussed')
                .find('.floated-label').removeClass('active');
        }
    }
});


// Heat Map

function drawHeatMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibW9uYTE5MDIiLCJhIjoiY2thdXRqYjFoMGVvMDJybzk0am0zeXNzNyJ9._bsjvdk-8sBXUbZzkHfTGA';
    var map1 = document.getElementById('map');
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [77.21667, 28.66667],
        zoom: 3
    });
    var hoveredStateId = null;
    map.on('load', function() {

        map.addSource('trees', {
            type: 'geojson',
            data: 'js/data.json'
        });
    map.addLayer({
    id: 'trees-heat',
    type: 'heatmap',
    source: 'trees',
    maxzoom: 15,
    paint: {
        // increase weight as Migrants count increases
        'heatmap-weight': {
        property: 'MigrantPopulationCount',
        type: 'exponential',
        stops: [
            [1, 0],
            [10, 1]
        ]
        },
        // increase intensity as zoom level increases
        'heatmap-intensity': {
        stops: [
            [11, 1],
            [15, 3]
        ]
        },
        // assign color values be applied to points depending on their density
        'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0, 'rgba(236,222,239,0)',
        0.2, 'rgb(208,209,230)',
        0.4, 'rgb(166,189,219)',
        0.6, 'rgb(103,169,207)',
        0.8, 'rgb(28,144,153)'
        ],
        // increase radius as zoom increases
        'heatmap-radius': {
        stops: [
            [11, 15],
            [15, 20]
        ]
        },
        // decrease opacity to transition into the circle layer
        'heatmap-opacity': {
        default: 1,
        stops: [
            [14, 1],
            [15, 0]
        ]
        },
    }
    }, 'waterway-label');
    map.addLayer({
    id: 'trees-point',
    type: 'circle',
    source: 'trees',
    minzoom: 14,
    paint: {
        // increase the radius of the circle as the zoom level and MigrantPopulationCount value increases
        'circle-radius': {
        property: 'MigrantPopulationCount',
        type: 'exponential',
        stops: [
            [{ zoom: 15, value: 1 }, 5],
            [{ zoom: 15, value: 62 }, 10],
            [{ zoom: 22, value: 1 }, 20],
            [{ zoom: 22, value: 62 }, 50],
        ]
        },
        'circle-color': {
        property: 'MigrantPopulationCount',
        type: 'exponential',
        stops: [
            [0, 'rgba(236,222,239,0)'],
            [10, 'rgb(236,222,239)'],
            [20, 'rgb(208,209,230)'],
            [30, 'rgb(166,189,219)'],
            [40, 'rgb(103,169,207)'],
            [50, 'rgb(28,144,153)'],
            [60, 'rgb(1,108,89)']
        ]
        },
        'circle-stroke-color': 'blue',
        'circle-stroke-width': 1,
        'circle-opacity': {
        stops: [
            [14, 0],
            [15, 1]
        ]
        }
    }
    }, 'waterway-label');
    map.on('click', 'trees-point', function(e) {
    new mapboxgl.Popup()
        .setLngLat(e.features[0].geometry.coordinates)
        .setHTML('<b>MigrantPopulationCount:</b> ' + e.features[0].properties.MigrantPopulationCount)
        .addTo(map);	
    });
    });
}

function getGeojson() {
    var someData;
	applyLoader(true);
    $.ajax({
        method: 'GET',
        url: 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/coordinates/',
		headers: { "content-Type": "application/json", "Access-Control-Allow-Origin": "*"},
        success: function (data) {
            someData = data;
            
            
            // geojsonArr = [];
            var geojson1 = {
                "type":"FeatureCollection",
                features: []
            };
            for(var i in someData) {   
                var item = someData[i];
                geojson1.features.push({ 			
                    "type" : "Feature",
                    "geometry":{
                        "type":"Point",
                        "coordinates": [item.longitude, item.latitude]
                    },
                    "properties":{
                        "MigrantPopulationCount" : item.count
                    }
                });
            }
            // document.getElementById("output").value = JSON.stringify(geojson1, null, 4);

            /* var text = JSON.stringify(geojson1, null, 4);
            var pom = document.createElement('a');
            pom.setAttribute('href', 'data:text/plain;charset=utf-8,' +
            encodeURIComponent(text));
            pom.setAttribute('download', "data.geojson");
            pom.style.display = 'none';
            document.body.appendChild(pom);
            pom.click();
            document.body.removeChild(pom); */
			
			drawHeatMap();
			applyLoader(false);
        }
    });

}




// API calls

//////////////////////////// Widgets section API
// if ($('.widgets-wrap').length != 0) {
$.ajax({
    method: "GET",
    url: "http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants",
    success: function(data) {
        if(data) {
            init_api();
        }
    }
});

function init_api() {
    applyLoader(true);
    $.ajax({
        method: 'GET',
        url: "http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/paneldata",
        success: function (data) {
            /////////////////// Top widgets section
            $('#verified_count_api').html(data.verified);
            $('#unVerified_count_api').html(data.unVerified);
            $('#male_count_api').html(data.male);
            $('#female_count_api').html(data.female);

            /////////////////// Registration modes section
            $('#sms_count_api').html(data.registrationModeCount.sms).parents('li').attr('title', 'SMS ' + data.registrationModeCount.sms);
            $('#whatsapp_count_api').html(data.registrationModeCount.whatsapp).parents('li').attr('title', 'Whatsapp ' + data.registrationModeCount.whatsapp);
            $('#telegram_count_api').html(data.registrationModeCount.telegram).parents('li').attr('title', 'Telegram ' + data.registrationModeCount.telegram);
            $('#web_count_api').html(data.registrationModeCount.webForm).parents('li').attr('title', 'WebForm ' + data.registrationModeCount.webForm);
            $('#call_count_api').html(data.registrationModeCount.phoneCall).parents('li').attr('title', 'call ' + data.registrationModeCount.phoneCall);

            getStatesAPI();

        }
    });
}

function getStatesAPI() {
    $.ajax({
        method: 'GET',
        url: "http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/statewise",
        success: function (data) {
            createMarquee(data);

            if($('.page-content-wrapper').hasClass('dashboard_page')) {
                dashboardPage_stateAPI(data);
            }
            else if($('.page-content-wrapper').hasClass('registration_page')) {
                applyLoader(false);
            }
            else if($('.page-content-wrapper').hasClass('skills_page')) {
                skillPage_stateAPI();
            }
        }
    });
}

function createMarquee(data) {
    /////////////////// Marquee states section
    var states_name = [];
    $('#marquee_migrants_count_api').empty();
    for (var prop in data) {
        states_name.push(prop);
        $('#marquee_migrants_count_api').append('<li class="state-tag"><span class="name">' + prop + '</span><span class="counter">' + data[prop] + '</span></li>');
    }
}

function dashboardPage_stateAPI(data) {
    /////////////////// Filters section - STATES
    var states_name = [];
    for (var prop in data) {
        states_name.push(prop);
    }
    var statesLength = states_name.length;
    states_name.sort();
    $('#state_filter_api .options ul').empty();
    for (var i = 0; i < statesLength; i++) {
        $('#state_filter_api .options ul').append('<li><a href="javascript:void(0);" class="state_value_api">' + states_name[i] + '</a></li>');
    }
    $('#state_filter_api .options ul').css('box-shadow', '0px 1px 3px 1px rgba(0, 0, 0, 0.15)');

    // without filter graph calls
    fetchNoFilterGraphsApiData(function() {
        fetchGraphsApiData('india');
    });
}

function fetchNoFilterGraphsApiData(cb) {
    var topfiveMalestates_url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/topfivestates/male';
    var topfiveFemalestates_url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/topfivestates/female';
    callTopfiveStateForMaleUsersAPI(topfiveMalestates_url, function() {
        callTopfiveStateForFemaleUsersAPI(topfiveFemalestates_url, function() {
            cb();
        });
    });
}

function callTopfiveStateForMaleUsersAPI(url, cb) {
    $.ajax({
        method: 'GET',
        url: url,
        success: function (data) {
            draw_maleUsers_chart([data]);
            cb();
        }
    });
}

function callTopfiveStateForFemaleUsersAPI(url, cb) {
    $.ajax({
        method: 'GET',
        url: url,
        success: function (data) {
            draw_femaleUsers_chart([data]);
            cb();
        }
    });
}

function fetchGraphsApiData(param) {
    var topfiveskills_url = '';
    var timebasedusers_url = '';
    var regModes_url = '';
    var skillBasedUsers_url = '';
    
    if (param === 'india') {
        topfiveskills_url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/skills/topfive';
        timebasedusers_url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/graph';
        regModes_url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/modesOfRegistration';
        skillBasedUsers_url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/topfiveskills';
    }
    else {
        topfiveskills_url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/skills/topfive/' + param;
        timebasedusers_url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/graph/' + param;
        regModes_url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/modesOfRegistration/' + param;
        skillBasedUsers_url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/topfiveskills/' + param;
    }

    callTopfiveskillsAPI(topfiveskills_url, function(){
        callTimebasedUsersAPI(timebasedusers_url, function() {
            callRegmodesAPI(regModes_url, function() {
                callSkillBasedUsersAPI(skillBasedUsers_url, function() {
                    applyLoader(false);
                });
            });
        });
    });
    
}

function callTopfiveskillsAPI(url, cb) {
    $.ajax({
        method: 'GET',
        url: url,
        success: function (data) {
            draw_topfiveSkills_chart([data]);
            cb();
        }
    });
}

function callTimebasedUsersAPI(url, cb) {
    $.ajax({
        method: 'GET',
        url: url,
        success: function (data) {
            draw_timebasedUsers_chart([data]);
            cb();
        }
    });
}

function callRegmodesAPI(url, cb) {
    $.ajax({
        method: 'GET',
        url: url,
        success: function (data) {
            draw_regModes_chart([data]);
            cb();
        }
    });
}

function callSkillBasedUsersAPI(url, cb) {
    $.ajax({
        method: 'GET',
        url: url,
        success: function (data) {
            draw_skillBasedUsers_chart([data]);
            cb();
        }
    });
}

$(document).on('click', '#state_filter_api .drop-down .options ul li a', function () {
    $this = $(this);
    $this.parents('.drop-down').addClass('has-content');
    var text = $this.html();
    $this.parents('.drop-down').find('.selected a span').html(text);
    $this.parents('.drop-down').find('.options ul').hide();

    var stateName = $this.parents('.drop-down').find('.selected a span').text();
    applyLoader(true);
    callDistrictAPI(stateName);
    fetchGraphsApiData(stateName);
});

function callDistrictAPI(stateName) {
    $.ajax({
        method: 'GET',
        url: "http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/districts/" + stateName,
        success: function (data) {

            /////////////////// Filters section - DISTRICTS
            var districtLength = data.length;
            $('#district_filter_api .options ul').empty();
            for (var i = 0; i < districtLength; i++) {
                $('#district_filter_api .options ul').append('<li><a href="javascript:void(0);">' + data[i] + '</a></li>');
            }
            $('#district_filter_api .selected a span').html(data[0]);
            $('#district_filter_api .options ul').css('box-shadow', '0px 1px 3px 1px rgba(0, 0, 0, 0.15)');
        }
    });
}

//SELECT OPTIONS AND HIDE OPTION AFTER SELECTION - DISTRICT FILTER
$(document).on('click', '#district_filter_api .drop-down .options ul li a', function () {
    $this = $(this);
    $this.parents('.drop-down').addClass('has-content');
    var text = $this.html();
    $this.parents('.drop-down').find('.selected a span').html(text);
    $this.parents('.drop-down').find('.options ul').hide();

    var stateName = $('#state_filter_api .drop-down .selected a span').text();
    var districtName = $this.parents('.drop-down').find('.selected a span').text();
    var param = stateName + '/' + districtName;
    applyLoader(true);
    fetchGraphsApiData(param);
});




////////////////////////////////////////////////// SKILLS PAGE starts here
function skillPage_stateAPI() {
    applyLoader(true);
    $.ajax({
        method: 'GET',
        url: "http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/statewise",
        success: function (data) {
            
            var states_name = [];
            for (var prop in data) {
                states_name.push(prop);
            }
            var statesLength = states_name.length;
            states_name.sort();

            /////////////////// Filters section - STATES
            var statesLength = states_name.length;
            $('#state_skills_filter_api .options ul').empty();
            for (var i = 0; i < statesLength; i++) {
                $('#state_skills_filter_api .options ul').append('<li><a href="javascript:void(0);" class="state_value_api">' + states_name[i] + '</a></li>');
            }
            $('#state_skills_filter_api .options ul').css('box-shadow', '0px 1px 3px 1px rgba(0, 0, 0, 0.15)');

            fetchSkillsData('india');
        }
    });
}

//SELECT OPTIONS AND HIDE OPTION AFTER SELECTION - STATE SKILLS FILTER
$(document).on('click', '#state_skills_filter_api .drop-down .options ul li a', function () {
    $this = $(this);
    $this.parents('.drop-down').addClass('has-content');
    var text = $this.html();
    $this.parents('.drop-down').find('.selected a span').html(text);
    $this.parents('.drop-down').find('.options ul').hide();

    var stateName = $this.parents('.drop-down').find('.selected a span').text();
    applyLoader(true);
    callSkillsDistrictAPI(stateName, function (data) {
        fetchSkillsData(stateName);
    });
});

function callSkillsDistrictAPI(stateName, cb) {
    $.ajax({
        method: 'GET',
        url: "http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/districts/" + stateName,
        success: function (data) {

            /////////////////// Filters section - DISTRICTS
            var districtLength = data.length;
            $('#district_skills_filter_api .options ul').empty();
            for (var i = 0; i < districtLength; i++) {
                $('#district_skills_filter_api .options ul').append('<li><a href="javascript:void(0);">' + data[i] + '</a></li>');
            }
            $('#district_skills_filter_api .selected a span').html(data[0]);
            $('#district_skills_filter_api .options ul').css('box-shadow', '0px 1px 3px 1px rgba(0, 0, 0, 0.15)');
            cb('done');

        }
    });
}

//SELECT OPTIONS AND HIDE OPTION AFTER SELECTION - DISTRICT SKILLS FILTER
$(document).on('click', '#district_skills_filter_api .drop-down .options ul li a', function () {
    $this = $(this);
    $this.parents('.drop-down').addClass('has-content');
    var text = $this.html();
    $this.parents('.drop-down').find('.selected a span').html(text);
    $this.parents('.drop-down').find('.options ul').hide();

    var stateName = $('#state_skills_filter_api .drop-down .selected a span').text();
    var districtName = $this.parents('.drop-down').find('.selected a span').text();
    var param = stateName + '/' + districtName;
    applyLoader(true);
    fetchSkillsData(param);
});

function fetchSkillsData(param) {
    var url = '';
    if (param === 'india') {
        url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/skills';
    }
    else {
        url = 'http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants/skills/' + param;
    }

    $.ajax({
        method: 'GET',
        url: url,
        success: function (data) {
            /////////////////// skills page table section
            var i = 0;
            $('#skills_api').empty();
            // var name_arr = [];
            // var data_arr = [];
            // for (var prop in data) {
            //     name_arr.push(prop);
            //     data_arr.push(data[prop]);
            // }
            // data_arr.sort();
            // data_len = data_arr.length;
            // function sortByValue(jsObj){
                var sortedArray = [];
                for(var i in data)
                {
                    // Push each JSON Object entry in array by [value, key]
                    sortedArray.push([data[i], i]);
                }
                var x = sortedArray.sort();
            // } 
            
            var data_len = x.length;
            for(var i=0;i<data_len;i++) {
                var y = x[i];
                $('#skills_api').append('<tr><td>' + i + '</td><td>' + y[1] + '</td><td>' + y[0] + '</td></tr>');
            }
            applyLoader(false);
        }
    });
}
////////////////////////////////////////////////// SKILLS PAGE ends here



////////////////////////////////////// Loader
function applyLoader(value) {
    if (value) {
        $('.loader-wrapper').show();
    }
    else {
        $('.loader-wrapper').hide();
    }
}



////////////////////////////////POST Call - FORM SUBMIT
$('#form_submit_btn').click(function() {
    var skills_selected = [];
    var skills = $('#skills_checkboxes_api input:checkbox:checked');
    var skills_count = $('#skills_checkboxes_api input:checkbox:checked').length;
    for (var i=0;i<skills_count;i++) {
        skills_selected.push($(skills[i]).attr('data-value'));
    };

    var formData_obj = {
        "AadharNumber":Number($('#adhaar').val()),
        "AadharNumber":Number($('#adhaar').val()),
        "AadharNumber":Number($('#adhaar').val()),
        "Address":$('#address').val(),
        "Name":$('#fullname').val(),
        "Phone":Number($('#phone').val()),
        "Pincode":Number($('#pincode').val()),
        "Skill":skills_selected,
        "Gender": $('#gender_dropdown .selected span').text(),
        "Mode": "Web Form"
    };
    
    
    // $.post("http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants",
    // formData_obj,
    // function(data, status){
    //     alert("Data: " + data + "\nStatus: " + status);
    // });
    $.ajax({
        method: "POST",
        url: "http://ec2-3-7-57-138.ap-south-1.compute.amazonaws.com:8009/api/migrants",
        data: JSON.stringify(formData_obj),
		headers: { "content-Type": "application/json"},
		//headers: { "content-Type": "application/json", "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With" },
        //contentType: 'application/json',
        success: function (data) {
            console.log(data);

			if(data.status === 401) {
				$('.message-wrap').text('Your details has been successfully submitted.');
			}
			else if(data.status === 402) {
				$('.message-wrap').text('Your details has been submitted but Adhaar verification is pending.');
			}
			else if(data.status === 403) {
				$('.message-wrap').text('Your entered details already exists.');
			}
			else if(data.status === 404) {
				$('.message-wrap').text('We could not proceed with your registration. Please try again.');
			}
			else if(data.status === 405) {
				$('.message-wrap').text('Please enter correct Pincode and try again.');
            }
            $('.message-wrap').addClass('active');
            emptyAllInputs();
        },
        //dataType: "JSON"

    });

    function emptyAllInputs() {
        $('.regForm-wrapper .input-transition-effect').val('').removeClass('has-content');
        $('#gender_dropdown .drop-down').removeClass('error-input-wrap has-content');
        $('.selected.input-transition-effect').removeClass('select-focussed arrow-toggle').find('.floated-label').removeClass('active').next('span').text('');
        $('.regForm-wrapper .skills-wrap .checkbox').removeClass('checkbox-checked').prop("checked", false);
    }

});











/*
QueryApi('url', 'put', client, function(data){
	callback(data);
}, errorCallback);

function QueryApi(url, verb, data, callback, errorCallback, contentType) {
	$.ajax({
		url: url,
		type: verb,
		data: contentType ? data : JSON.stringify(data), // we could just put the data but jquery seems to serialize it a bit weirdly and ends up calling all its methods. this stops that.
		success: function (self) {return function (data) { self._Success(data, callback); } } (this),
		error: function (self) {return function (data) { self._Error(data, callback, errorCallback); } } (this),
		complete: function (self) {return function (data) { self._Complete(data, callback); } } (this),
		dataType: 'json',
		contentType: contentType ||'application/json',
		async: true,
		cache: false
	});
}, */


