class VideoPlay {

    setVastUrl (vastUrl){
        this.vastUrl = vastUrl
    }

    async load(){
           return await fetch(this.vastUrl)
            .then(response => response.text())
            .then(data=>{
                let parser = new DOMParser();
                let xmlDoc = parser.parseFromString(data, "application/xml");
                let allMediaFile=xmlDoc.getElementsByTagName('MediaFile')
                let mediaFile= '';
                for (let i = 0; i< allMediaFile.length; i++){
                    if(allMediaFile[i].textContent.includes('.mp4')){
                        mediaFile= allMediaFile[i].textContent
                    }
                }
                return mediaFile
            })
    }

    async start() {
        const link = await this.load();
        const domVideoContainer =  document.getElementById("video");
        const videoConteiner = `<video delivery="progressive" type="video/mp4" bitrate="0" width="650"     height="350" autosound="false" id ="video-player">
                <source src='${link}'>
                </video>
                <div id="controls">
                    <progress max="100" value="0" id="progress"></progress>
                    <div class="buttons">
                        <button id="play">Play</button>
                        <button id="pause">Pause</button>
                        <button id="close">Close</button>
                    </div>
                </div> `;

        domVideoContainer.innerHTML = videoConteiner;

        const payButton =  document.getElementById("play");
        payButton.addEventListener('click', () => {this.play()});

        const pauseButton =  document.getElementById("pause");
        pauseButton.addEventListener('click', () => {this.pause()});

        const closeButton =  document.getElementById("close");
        closeButton.addEventListener('click', () => {this.close()});
    }

    play(){
        const domVideoContainer =  document.getElementById("video-player");
        domVideoContainer.play();

        function progressUpdate(){
            const domVideoContainer =  document.getElementById("video-player");
                let fullTime = domVideoContainer.duration;
                let videoCurrentTime = domVideoContainer.currentTime;
                const progress = document.getElementById("progress");
                progress.value = 100*videoCurrentTime/fullTime;
            }
        domVideoContainer.ontimeupdate = progressUpdate;
    }

    pause(){
        const domVideoContainer =  document.getElementById("video-player");
        domVideoContainer.pause();
    }

    close(){
        const domVideoContainer =  document.getElementById("video");
        domVideoContainer.innerHTML = "";
    }
    
}

const player = new VideoPlay;

player.setVastUrl('https://inv-nets.admixer.net/dsp.aspx?rct=3&item=152bea5c-5635-4455-8cae-327b429cf376&pre=1');

player.start();


