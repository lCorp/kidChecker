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
				$('#birthday #timePicker').val(birthday);
				$('#sex').val(sex);
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
				birthday = row.birthday;
				sex = row.sex;

				var btnEdit = "<button type='button' class='btn pull-right' onclick='location.href=\"detail.html?id="+ childId +"\"'><span class='glyphicon glyphicon-edit pull-right'></span></button>";

				$('title').html(childName + "'s chart");

				$('#titleName').html("");
				$('#titleName').append(childName);
				$('#titleName').append(btnEdit);
            };
        }, null);
    });
}

function initializeMasterData() {
    var db = openDatabase('kidChecker', '1.0', 'Database for kidChecker', 5 * 1024 * 1024);

    // CHILDREN
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS CHILDREN (id unique, childName, birthday, sex)');
        tx.executeSql('DELETE FROM CHILDREN');
        tx.executeSql('INSERT INTO CHILDREN (id, childName, birthday, sex) VALUES (?, ?, ?, ?)', [1, "Huynh Thanh Duy", "1991/06/14", "Boy"]);
        tx.executeSql('INSERT INTO CHILDREN (id, childName, birthday, sex) VALUES (?, ?, ?, ?)', [2, "Ngo Huu Loc", "1980/04/16", "Girl"]);
        tx.executeSql('INSERT INTO CHILDREN (id, childName, birthday, sex) VALUES (?, ?, ?, ?)', [3, "Bon Bon", "1990/09/03", "Girl"]);
    });
}

