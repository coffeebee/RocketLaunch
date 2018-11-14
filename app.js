
var httpRequest = new XMLHttpRequest();
var num = 0;
var net;
var name;
var countdown;
var nextLaunchDate;
doThis(0)
//getting the date 
//var date = datestring.split(' ').slice(0,4).join(' ');

function doThis(num){
    if(num==0){
        httpRequest.open('GET', 'https://launchlibrary.net/1.4/launch?next=5')
    }else if(num==1){
        httpRequest.open('GET', 'https://launchlibrary.net/1.4/launch?name=falcon&next=5?')
    }else if(num==2){
        httpRequest.open('GET', 'https://launchlibrary.net/1.4/launch?next=5&name=ariane')
    }else if(num==3){
        httpRequest.open('GET', 'https://launchlibrary.net/1.4/launch?name=launcherone&next=5')
    }
    httpRequest.send();
    httpRequest.onreadystatechange = aFunction;
}
function aFunction(){
    if (httpRequest.readyState == 4){
        var launch = httpRequest.responseText;
        var jsLaunch = JSON.parse(launch);
        //console.log(jsLaunch);
        //console.log(jsLaunch.launches[0]);
        //console.log(jsLaunch.launches[0].name);
        
        nextLaunchDate = (jsLaunch.launches[0].net).split(' ').slice(0, 3).join(' ')        
        document.getElementById("nextLaunch").innerHTML = "<p><strong>Next Launch:</strong> " + nextLaunchDate + "</p>";
        document.getElementById("listLaunches").innerHTML = ""; 
        //next 5 launches
        for(i=0; i<5; i++){
            net = jsLaunch.launches[i].net;
            name = jsLaunch.launches[i].name;
            document.getElementById("listLaunches").innerHTML += "<p><strong>" + net + ":</strong> " + name + "</p>";
        }
        //countdown        
        // I totally looked this up on w3schools
        
        var launchTime = (new Date(jsLaunch.launches[0].net)).getTime()
        var current, count;
        var days, hours, mins, secs;
        setInterval(function(){            
            current = new Date().getTime()
            count = launchTime - current
            console.log(launchTime);
            console.log(current);
            console.log(count);
            days = Math.floor(count / (1000 * 60 * 60 * 24));
            hours = Math.floor((count % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            mins = Math.floor((count % (1000 * 60 * 60)) / (1000 * 60));
            secs = Math.floor((count % (1000 * 60)) / 1000);
            document.getElementById("countdown").innerHTML = "<p><strong>Countdown to Launch: </strong>" + days + " Days: " + hours + " Hours: "
        + mins + " Minutes " + secs + " Seconds " + "</p>";
        }, 1000)
        


    }
}