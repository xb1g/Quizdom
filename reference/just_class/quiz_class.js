class Quiz{
    constructor(num,file){
        this.num=num;
        this.file=file;
    }
    random_number(){
        return Math.floor(Math.random()*10)+1;
    }
    call_quiz(){
        fetch("./${this.file}")
    }
}