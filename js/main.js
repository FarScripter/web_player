var playerAppName = 'Playlist' ;
var data1 = (localStorage.getItem('farscripterPlayer')) ? JSON.parse(localStorage.getItem('farscripterPlayer')):{playlist1: []};
var curentAutoPlay; var curentAutoMusic;
var nextRandom; var succses; var randomAutoMode = false;
var autoPlayIsOn = false; var musicIs = null; var warning = false; var isPaused = false;
var multippleValues = new Array ();
var randomPlayedAmmountMax = data1.playlist1.length ;
var randomPlayed = new Array(randomPlayedAmmountMax);
var empties = randomPlayed.length;

var groups = new Array();
var arrayFile = new Array();
var locationPlayList;
var fileInfo = new Array();

jQuery.get("playlist.txt", undefined, function(data) {
    
    locationPlayList = data;
    arrayFile = locationPlayList.split(',\n');
    fileInfo = new Array(arrayFile.length);

    for (var i = 0; i < arrayFile.length; i++) {
        fileInfo[i] = new Array(2);
    }

    arrayFile.forEach(function(element,index){
        groups[index] = element.split(' - ')[0];
        fileInfo[index][1] = element.split(' - ')[0];
        fileInfo[index][0] = element.split(' - ')[1];
    });

    arrayFile.sort();
    
    groups.sort();
    groups = unique(groups);

    groups.forEach(function(element,index){
        namesOfGroup(element,index);
    });

}, "html").done(function() {
}).fail(function(jqXHR, textStatus) {
alert('Error loading playlist.txt');
}).always(function() {
});

function namesOfGroup(group,indexOfGroup){
    fileInfo.forEach(function(element,index){
        if(fileInfo[index][1] == groups[indexOfGroup]){
        // console.log(fileInfo[index][0]);
        addGroup(group,fileInfo[index][0]);
        }
    });
}

function addGroup(group,element){
    var groupList = document.getElementById('groupList');
    var groupItem = document.createElement('li');
    groupItem.innerText = group +' - ' + element;
    var array = element.split(' ');
    var array2 = group.split(' ');
    element = null;
    group = null;
    var classOfItem = '';
    array.forEach(function(element,index){
        if(index != 0)
            classOfItem += '_' + element;
        else classOfItem +=  element;
    });
    groupItem.classList.add(classOfItem);

    var groupOfItem = '';
    array2.forEach(function(element,index){
        if(index != 0)
            groupOfItem += '_' + element;
        else groupOfItem +=  element;
    });

    groupItem.classList.add(groupOfItem);
    groupItem.onclick = function() { addFromSearch(this.innerText); };
    groupList.appendChild(groupItem, groupList.childNodes[0]);
}

var container = $('#groupList');

$('#searchGroup').click(function() {
    var selector = document.getElementById('groupInput').value;
    if(selector[0] != '!'){
        var array1 = selector.split(' ');
        selector = null;
        selector = '';
        array1.forEach(function(element,index){
            if(index != 0)
                selector += '_' + element;
            else selector +=  element;
        });
        if(document.getElementById('groupInput').value != '' || document.getElementById('groupInput').value) selector = "." + selector;
            document.getElementById('groupInput').value = '';
            container.isotope({
            filter: selector,
            layoutMode: 'vertical'
        });
        return false;
    }

});

document.getElementById('groupInput').addEventListener('keydown', function (e) {
    if (e.code === 'Enter' ){
            if(true){
            var selector = document.getElementById('groupInput').value;
            var array1 = selector.split(' ');
            selector = null;
            selector = '';
            array1.forEach(function(element,index){
            if(index != 0)
                selector += '_' + element;
            else selector +=  element;
            });

            if(document.getElementById('groupInput').value != '' || document.getElementById('groupInput').value) selector = '.' + selector;
                document.getElementById('groupInput').value = '';
                container.isotope({
                    filter: selector,
                    layoutMode: 'vertical'
                });
            return false;
        }
    }
});

function addFromSearch(element){
    addItemIfNoRepeated(element);
}

randomPlayed.forEach(function(x){ empties--  });

var rSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect class="noFill" width="22" height="22"/><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6V18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.5-0.6-0.6v-6.8c0-0.4,0.5-0.6,0.6-0.6s0.6,0.5,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.5-0.6-0.6v-6.8c0-0.4,0.5-0.6,0.6-0.6c0.4,0,0.6,0.5,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.5-0.6-0.6v-6.8c0-0.4,0.5-0.6,0.6-0.6c0.4,0,0.6,0.5,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
var cSVG = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.5-0.5-0.5-0.8,0-1.1s0.8-0.5,1.1,0l2.1,2.1l4.8-4.8c0.5-0.5,0.8-0.5,1.1,0s0.5,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';

renderPlayList1();

document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' songs';

function checkMusicInput(value){
    if(value == '!remove' || value == '!delete' || value == '!Remove' || value == '!Delete'){
        if(!curentAutoMusic){
            while(randomPlayedAmmountMax > 0)
            data1.playlist1.forEach(function(element,index){
                removeAllItems(index);
            });
            document.getElementById('music').value = '';
        }
    }
    else if(value == '!all' || value == '!addall' || value == '!aa'){
        arrayFile.forEach(function(element,index){
            addFromSearch(element);
        });
    }
    else if(document.getElementById('music').value.split(' ')[0] == '!volume' || document.getElementById('music').value.split(' ')[0] == '!vol'){
        curentAutoMusic.volume = document.getElementById('music').value.split(' ')[1]/100;
        document.getElementById('music').value = '';
    }
    else if(value[0] == 'h' && value[1] == 't' && value[2] == 't' && value[3] == 'p' ){
        var arrayWeb = value.split(', ');
        var href = arrayWeb[0]; // ссылка
        var name = '' + arrayWeb[1]; // _имя
        addItemIfNoRepeatedWeb(name, href);
        saveFile(href,name);
    }
    else if(value){
        multippleValues = value.split(', ');
        multippleValues.forEach(function(element){ addItemIfNoRepeated(element); });
    }
}

document.getElementById('addMusic').addEventListener('click', function() {
    var valueIn = document.getElementById('music').value;
    checkMusicInput(valueIn)
});

document.getElementById('music').addEventListener('keydown', function (e) {
    var valueIn = this.value;
    if (e.code === 'Enter' ){
        checkMusicInput(valueIn)
    }
});


function addItemWeb (value1,href) {
  if(musicIs == null){
    addItemToDOM1(value1);
    document.getElementById('music').value = '';
    data1.playlist1.push(value1);
    dataObjectUpdated1();
    randomPlayedAmmountMax += 1;
    document.getElementById('playerStatus').innerText = playerAppName + ' | '+randomPlayedAmmountMax +' песни';
    var newAudio = document.createElement('audio');
    newAudio.setAttribute("id", value1);
    var newSource = document.createElement('source');
    newSource.setAttribute("src", href + "");
    newSource.setAttribute("hidden", "true");
    newAudio.appendChild(newSource);
    document.getElementById('audiocode').appendChild(newAudio);
  }
  else{
        warning = true;
        document.getElementById('music').value = '';
        document.getElementById('music').placeholder = 'Нельзя добавлять во время воспроизведения';
        setTimeout( function() {
            warning = false;
            document.getElementById('music').placeholder = 'Добавить песню...';
        } , 1500);
    }
}

function addItemIfNoRepeatedWeb(value1,href){
    var notvalue = value1;
    data1.playlist1.forEach(function(element){
        if(element == value1){
            value1 = null; return;
        }
    });
    if(value1){
        addItemWeb(value1,href);
    }
    else{
        warning = true;
        document.getElementById('music').value = '';
        document.getElementById('music').placeholder = notvalue + ' уже есть в плейлисте';
        setTimeout( function() {
            warning = false; notvalue = null;
            document.getElementById('music').placeholder = 'Добавить песню...';
        } , 1500);
    }
}

function addItemIfNoRepeated(value1){
    var notvalue = value1;
    data1.playlist1.forEach(function(element){
        if(element == value1){
            value1 = null;
            return;
        }
    });
    if(value1){
        addItem1(value1);
    }
    else{
        warning = true;
        document.getElementById('music').value = '';
        document.getElementById('music').placeholder = notvalue + ' уже есть в плейлисте';
        setTimeout( function() {
            warning = false; notvalue = null;
            document.getElementById('music').placeholder = 'Добавить песню...';
        } , 1500);
    }
}

// 295 строка AddItem1 