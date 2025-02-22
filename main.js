const prompt = require('prompt-sync')()

helpMessage =  `
$add todo # adds todo with title todo
$show todo # details about todo 
$done todo # flag todo as todo as done
$

`
do{
    console.log()
    input = prompt("")   
}while(true)