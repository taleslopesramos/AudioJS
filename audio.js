(function () {
    class AudioElem extends Audio{
        constructor(playerObj){
            super(playerObj.getAttribute("src"));

            this.createChildren(playerObj);

            this.listenEvents();
        }

        static searchAndCreateAll(selector){
            let listOfAudios = document.querySelectorAll(selector);
            let listOfAudioElemts = [];

            listOfAudios.forEach((value,index) => {
                listOfAudioElemts.push(new AudioElem(value));
            });

            return listOfAudioElemts;
        }

        createChildren(playerObj){
            this.player = playerObj;

            this.playPauseBtn = document.createElement('DIV');
            this.playPauseBtn.className = "icon-play play-pause mr10";

            let defaultMinutesSeconds1 = document.createTextNode("00:00");
            let defaultMinutesSeconds2 = document.createTextNode("00:00");
            
            this.currentTimeProp = document.createElement('DIV');
            this.currentTimeProp.appendChild(defaultMinutesSeconds1);
            this.currentTimeProp.className = "current-time pt5 mr10";

            this.timeSlider = document.createElement('PROGRESS');
            this.timeSlider.setAttribute('value','0');
            this.timeSlider.className = "time-slider mr10";
            
            this.durationProp = document.createElement('DIV');
            this.durationProp.className = "duration pt5 mr10";
            this.durationProp.appendChild(defaultMinutesSeconds2);

            this.volumeBtn = document.createElement('DIV');
            this.volumeBtn.className = "icon-volume-high volume-btn mr10";

            this.volumeSlider = document.createElement('INPUT');
            this.volumeSlider.className = "slider volume-slider";
            this.volumeSlider.setAttribute('type','range');
            this.volumeSlider.setAttribute('min','0');
            this.volumeSlider.setAttribute('max','100');
            this.volumeSlider.setAttribute('value','100');

            this.player.appendChild(this.playPauseBtn);
            this.player.appendChild(this.currentTimeProp);
            this.player.appendChild(this.timeSlider);
            this.player.appendChild(this.durationProp);
            this.player.appendChild(this.volumeBtn);
            this.player.appendChild(this.volumeSlider);
        }

        listenEvents(){
            this.ontimeupdate = this.update.bind(this);
            
            this.onloadedmetadata = this.initValues.bind(this);

            this.playPauseBtn.onclick = this.playPauseEvent.bind(this);
            
            this.timeSlider.onmousedown = this.changeTime.bind(this);

            this.volumeBtn.onclick = this.toogleVolume.bind(this);

            this.volumeSlider.onchange = this.changeVolume.bind(this);
        }

        update(){
            this.timeSlider.setAttribute("value", this.currentTime);
            this.currentTimeProp.innerHTML = secondsToMSformat(this.currentTime);
            
            if(this.ended) this.resetPlayer();
            
        }

        initValues(){
            this.timeSlider.setAttribute("max", this.duration);
            this.durationProp.innerHTML = secondsToMSformat(this.duration);
        }

        playPauseEvent(){
            if(this.isPlaying){
                this.pause();
                this.playPauseBtn.classList.remove('icon-pause');
                this.playPauseBtn.classList.add('icon-play');
            }else{
                this.play();
                this.playPauseBtn.classList.remove('icon-play');
                this.playPauseBtn.classList.add('icon-pause');
            }

            //toggle
            this.isPlaying = !this.isPlaying;
        }

        resetPlayer(){
            this.isPlaying = false;
            this.playPauseBtn.classList.remove('icon-pause');
            this.playPauseBtn.classList.add('icon-play');
            this.timeSlider.setAttribute("value", 0);
            this.currentTimeProp.innerHTML = "00:00";
        }

        changeTime(event){
            let currentSliderWidth = event.target.offsetWidth;
            let xMouseClk = event.offsetX;
            let percentage = xMouseClk / currentSliderWidth;
            
            this.currentTime = this.duration*percentage;
        }

        changeVolume(event){
            let volume = event.target.value;
            this.volume = volume / 100;
            this.changeVolumeBtnClass();
        }

        toogleVolume(event){
            if(this.volume > 0){
                this.volumeSlider.value = 0;
                this.volume = 0;
            }else{
                this.volumeSlider.value = 100;
                this.volume = 1;
            }

            this.changeVolumeBtnClass();
        }

        changeVolumeBtnClass(){
            let volume = this.volume * 100;

            // PEGA A LISTA DE CLASSES DO BOTAO E AS TRANSFORMA EM UM ARRAY
            let volumeBtnClasses = Array.from(this.volumeBtn.classList);
                        
            // RETIRA A PRIMEIRA CLASSE (A CLASSE DO ICONE)
            volumeBtnClasses.shift();

            // RETIRA A ULTIMA CLASSE (A CLASSE DA MARGIN)
            volumeBtnClasses.pop();

            // COLOCA A PRIMEIRA CLASSE DE ICONE E A ULTIMA CLASSE DA MARGIN
            if(volume == 0){
                volumeBtnClasses.unshift("icon-volume-mute");
                volumeBtnClasses.push('mr10');
            }else if(volume < 50){
                volumeBtnClasses.unshift("icon-volume-low");
                volumeBtnClasses.push('mr10');
            }else if(volume < 100){
                volumeBtnClasses.unshift("icon-volume-medium");
                volumeBtnClasses.push('mr10');
            }else if(volume == 100){
                volumeBtnClasses.unshift("icon-volume-high");
                volumeBtnClasses.push('mr9');
            }

            this.volumeBtn.className = volumeBtnClasses.join(" ");
        }
    }

    function pad(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function secondsToMSformat(seconds_input){
        var seconds = seconds_input % 60;
        var minutes = pad((seconds_input - seconds) / 60, 2);
        return minutes+":"+pad(Math.floor(seconds),2);
    }

    document.addEventListener("DOMContentLoaded", () => {
        const audioElems = AudioElem.searchAndCreateAll(".audio-player");
    });
})()
