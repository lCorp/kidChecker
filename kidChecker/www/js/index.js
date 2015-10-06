/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

// DuyHT yeah yeah
//----------------------------------------------------//

function loadDataToMenu() {
    var db = openDatabase('kidChecker', '1.0', 'Database for kidChecker', 5 * 1024 * 1024);
	
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM CHILDREN', [], function (tx, result) {
          
            var len = result.rows.length;
			console.log('Len: ' + len);
            var childId, childName, childBirthday, childSex;
            for (index = 0; index < len; index++) {
                var row = result.rows.item(index);
                childId = row.id;
                childName = row.childName;
				
				itemContent = "<a style='text-align: left;' class='item' href='detail.html?id=" + childId + "'><span class='glyphicon glyphicon-user'></span>&nbsp;&nbsp;&nbsp; " + childName + " </a>";
				$('#manageChildrenLink').after(itemContent);
            };
        }, null);
    });
}

function loadDataToIndex() {
    var db = openDatabase('kidChecker', '1.0', 'Database for kidChecker', 5 * 1024 * 1024);
	
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM CHILDREN', [], function (tx, result) {
          
            var len = result.rows.length;
			console.log('Len: ' + len);
            var childId, childName, childBirthday, childSex;
            for (index = len - 1; index >= 0; index--) {
                var row = result.rows.item(index);
                childId = row.id;
                childName = row.childName;
				
				itemContent = "<button onclick='location.href=\"detail.html?id="+ childId +"\"' style='margin-bottom: 10px; text-align: left;' type='button' class='btn btn-default col-xs-12 col-sm-12 col-md-12 col-lg-12'>" + childName + "<span class='glyphicon glyphicon-chevron-right pull-right'></span></button>";

				$('#listChildren').append(itemContent);
            };
        }, null);
    });
}

function loadDataToDetail(idChild) {
    var db = openDatabase('kidChecker', '1.0', 'Database for kidChecker', 5 * 1024 * 1024);
	
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM CHILDREN WHERE id="+idChild, [], function (tx, result) {
          
            var len = result.rows.length;
			console.log('idChild: ' + idChild);
			console.log('Len: ' + len);
            var childId, childName, childBirthday, childSex;
            for (index = len - 1; index >= 0; index--) {
                var row = result.rows.item(index);
                childId = row.id;
                childName = row.childName;
				birthday = row.birthday;
				sex = row.sex;

				var btnChart = "<button type='button' class='btn pull-right' onclick='location.href=\"chart.html?id="+ childId +"\"'><span class='glyphicon glyphicon-equalizer pull-right'></span></button>";

				$('title').html(childName + "'s information");

				$('#titleName').html("");
				$('#titleName').append(childName);
				$('#titleName').append(btnChart);
				$('#childName').html(childName);
				$('#birthday').html(birthday);
				$('#sex').html(sex);
            };
        }, null);
    });

	var days = [
			'Sun, ', //Sunday starts at 0
			'Mon, ',
			'Tue, ',
			'Wed, ',
			'Thu, ',
			'Fri, ',
			'Sat, '
		];

	db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM MEASUREMENT WHERE idChild="+idChild+" ORDER BY measurementDate", [], function (tx, result) {
          
            var len = result.rows.length;
			console.log('idChild: ' + idChild);
			console.log('Len: ' + len);
            var weight, height, head, date, dddName;
            for (index = len - 1; index >= 0; index--) {
                var row = result.rows.item(index);
                weight = row.weight;
                height = row.height;
				head = row.head;
				date = row.measurementDate;

				dddName = "kaka";
				dddName = days[new Date(date).getDay()];

				var measurementItem = "<div style='height: 55px;' class='panel-heading'>";
                measurementItem += dddName + date;
                measurementItem += "<button style='' type='button' class='btn pull-right'>";
                measurementItem += "<span class='glyphicon glyphicon-edit'></span>";
                measurementItem += "</button></div>";
				measurementItem += "<div class='panel-body'>";
                measurementItem += "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center'>";
                measurementItem += "<span class='glyphicon glyphicon-download-alt'></span>&nbsp;&nbsp;&nbsp; " + weight + " kg</div>";
                measurementItem += "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center'>";
                measurementItem += "<span class='glyphicon glyphicon-stats'></span>&nbsp;&nbsp;&nbsp; " + height + " cm</div>";
                measurementItem += "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center'>";
                measurementItem += "<span class='glyphicon glyphicon-user'></span>&nbsp;&nbsp;&nbsp; " + head + " cm</div></div>";

				$('#measurementList').append(measurementItem);
            };
        }, null);
    });
}

function loadDataToChart(idChild) {
    var db = openDatabase('kidChecker', '1.0', 'Database for kidChecker', 5 * 1024 * 1024);
	
    db.transaction(function (tx) {
        tx.executeSql("SELECT * FROM CHILDREN WHERE id="+idChild, [], function (tx, result) {
          
            var len = result.rows.length;
			console.log('idChild: ' + idChild);
			console.log('Len: ' + len);
            var childId, childName, childBirthday, childSex;
            for (index = len - 1; index >= 0; index--) {
                var row = result.rows.item(index);
                childId = row.id;
                childName = row.childName;
				sex = row.sex;

				var btnEdit = "<button type='button' class='btn pull-right' onclick='location.href=\"detail.html?id="+ childId +"\"'><span class='glyphicon glyphicon-edit pull-right'></span></button>";

				$('title').html(childName + "'s chart");

				$('#titleName').html("");
				$('#titleName').append(childName + " ("+sex+")");
				$('#titleName').append(btnEdit);
				$('#sexValue').val(sex);
            };
        }, null);
    });
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function createChildProfile(nameInput, birthdayInput, sexInput) {
    var db = openDatabase('kidChecker', '1.0', 'Database for kidChecker', 5 * 1024 * 1024);

    // CHILDREN ADD NEW
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO CHILDREN (childName, birthday, sex) VALUES (?, ?, ?)', [toTitleCase(nameInput), birthdayInput, sexInput]);
    });
}

function deleteChildProfile(idChild) {
    var db = openDatabase('kidChecker', '1.0', 'Database for kidChecker', 5 * 1024 * 1024);

    // CHILDREN DELETE
    db.transaction(function (tx) {
		tx.executeSql("DELETE FROM CHILDREN WHERE id="+idChild);
    });
}



function addMeasurement(weightValue, heightValue, headValue, measurementDate, idChild){
	var db = openDatabase('kidChecker', '1.0', 'Database for kidChecker', 5 * 1024 * 1024);

    // MEASUREMENT ADD NEW
    db.transaction(function (tx) {
        tx.executeSql('INSERT INTO MEASUREMENT (weight, height, head, measurementDate, idChild) VALUES (?, ?, ?, ?, ?)', [weightValue, heightValue, headValue, measurementDate, parseInt(idChild, 10)]);
    });

}



function initializeMasterData() {
    var db = openDatabase('kidChecker', '1.0', 'Database for kidChecker', 5 * 1024 * 1024);

    // CHILDREN
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS CHILDREN (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, childName, birthday, sex)');
    });

	// MEASUREMENT
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MEASUREMENT (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, weight, height, head, measurementDate, idChild)');
    });
}

