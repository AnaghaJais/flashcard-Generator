var ClozeCard=function(text,cloze){
	this.cloze=cloze;
	this.fullText=text;
	this.partial=(this.fullText).replace(this.cloze,"...");
}


module.exports = ClozeCard;