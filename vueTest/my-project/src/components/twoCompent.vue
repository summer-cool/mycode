<template>
<div id="text">
    <h2>that is second component---{{msg}}</h2>
    <p v-for="item in article">{{item.text}}</p>
</div>
    
</template>
<script>
    export default{
        data(){
            return{
                msg:"Yes~",
                article:[{text:"hallo"},{text:"your son of bitch"},{text:"fuck you bitch"}],
            }
        },
        name:"twoCompent"
    }
</script>