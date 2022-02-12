//https://teachablemachine.withgoogle.com/models/UCQEawv5O/

var prediction_1="";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(
        function(data_uri){
            document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
        }
    );
}

console.log("ml5 version", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/UCQEawv5O/model.json",modelloaded);

function modelloaded(){
    console.log("Model is loaded successfuly");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="the first prediction is "+prediction_1;
    var uterthis=new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(uterthis);
}

function check(){
    img=document.getElementById("captured_image")
    classifier.classify(img, gotresult);
}

function gotresult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction_1=results[0].label;
        speak();
        if(results[0].label=="Good_Job"){
            document.getElementById("update_emoji").innerHTML="&#128077";
        }
        if(results[0].label=="Bad_Job"){
            document.getElementById("update_emoji").innerHTML="&#128078";
        }
        if(results[0].label=="Amazing"){
            document.getElementById("update_emoji").innerHTML="&#128076";
        }
        if(results[0].label=="Peace"){
            document.getElementById("update_emoji").innerHTML="&#9996";
        }
    }
}