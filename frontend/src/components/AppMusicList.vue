<template>
  <div class="musicList">
        <div v-for="(searchResult,index) in searchResults.value" :key="index" :data-id="searchResult.temp.id" @click="searchResultsDown">
            <div><img :src="searchResult.temp.songCoverUrl" alt="" :data-id="searchResult.temp.id"></div>
            <span class="songName">{{ searchResult.temp.songName }}</span>
            <span class="artistsName">{{ searchResult.temp.artistsName }}</span>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { searchResults } from '@/public/public.js';
import { useToasted } from "@hoppscotch/vue-toasted"
const toast = useToasted()

function searchResultsDown(e) {
    let id = e.target.dataset.id
    let userId = null;
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('userId=')) {
            userId = cookie.substring('userId='.length, cookie.length);
            break;
        } else {
            userId = "";
        }
    }
    axios({
            url: '/api/song/addMusic/',  //加入列表
            method: 'post',
            data: {
                userId: userId, //这里读取cookie中的userId并发送
                songs: id
            }
        })
        .then((res) => {
            console.log(res.data)
            if (res.data == 2) {
                toast.show("加入列表", { position: "bottom-right", duration: 3000 })
            } else if (res.data == 0) {
                toast.show("加入失败", { position: "bottom-right", duration: 3000 })
            } else if (res.data == 1) {
                toast.show("立即播放", { position: "bottom-right", duration: 3000 })
            }
        })
        .catch(err => {
            console.log(err)
        })
}


</script>

<style>

</style>