class MusicPlayer{
    constructor(musicList){
        this.musicList = musicList;
        this.index=1;
    }
    getMusic(){
        return this.musicList[this.index];
    }

    next(){
        if(this.index==this.musicList.length){
            this.index=0;
        }else{
            this.index++;
        }
   
    }

    previus(){
        if(this.index==0){
            this.index = this.musicList.length;
        }else{
            this.index--;
        }
   
    }
}