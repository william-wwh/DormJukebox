<template>
    <div class="left">
        <div class="songCover">
            <img :src="coverUrl" alt="">
        </div>
        <div class="songInfo">
            <div class="songTitle">{{ songName }}</div>
            <div class="songSinger">{{ artists }}</div>
        </div>
    </div>
    <div class="center">
        <div class="playerControls">
            <div class="playerControlsLeft">
                <div>
                    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"
                        class="Svg-sc-ytk21e-0 gQUQL">
                        <path
                            d="M13.151.922a.75.75 0 1 0-1.06 1.06L13.109 3H11.16a3.75 3.75 0 0 0-2.873 1.34l-6.173 7.356A2.25 2.25 0 0 1 .39 12.5H0V14h.391a3.75 3.75 0 0 0 2.873-1.34l6.173-7.356a2.25 2.25 0 0 1 1.724-.804h1.947l-1.017 1.018a.75.75 0 0 0 1.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 0 0 .39 3.5z">
                        </path>
                        <path
                            d="m7.5 10.723.98-1.167.957 1.14a2.25 2.25 0 0 0 1.724.804h1.947l-1.017-1.018a.75.75 0 1 1 1.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 1 1-1.06-1.06L13.109 13H11.16a3.75 3.75 0 0 1-2.873-1.34l-.787-.938z">
                        </path>
                    </svg>
                </div>
                <div>
                    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"
                        class="Svg-sc-ytk21e-0 gQUQL">
                        <path
                            d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z">
                        </path>
                    </svg>
                </div>
            </div>
            <div class="playerControlsMiddle" @click="playButtonClick">
                <svg v-show="onPlaying == false" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"
                    data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL">
                    <path
                        d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z">
                    </path>
                </svg>
                <svg v-show="onPlaying == true" role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16"
                    data-encore-id="icon" class="Svg-sc-ytk21e-0 gQUQL">
                    <path
                        d="M2.7 1a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7H2.7zm8 0a.7.7 0 0 0-.7.7v12.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-2.6z">
                    </path>
                </svg>
            </div>
            <div class="playerControlsRight">
                <div @click="playNextSong">
                    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"
                        class="Svg-sc-ytk21e-0 gQUQL">
                        <path
                            d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z">
                        </path>
                    </svg>
                </div>
                <div>
                    <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"
                        class="Svg-sc-ytk21e-0 gQUQL">
                        <path
                            d="M0 4.75A3.75 3.75 0 0 1 3.75 1h8.5A3.75 3.75 0 0 1 16 4.75v5a3.75 3.75 0 0 1-3.75 3.75H9.81l1.018 1.018a.75.75 0 1 1-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 1 1 1.06 1.06L9.811 12h2.439a2.25 2.25 0 0 0 2.25-2.25v-5a2.25 2.25 0 0 0-2.25-2.25h-8.5A2.25 2.25 0 0 0 1.5 4.75v5A2.25 2.25 0 0 0 3.75 12H5v1.5H3.75A3.75 3.75 0 0 1 0 9.75v-5z">
                        </path>
                    </svg>
                </div>
            </div>
        </div>
        <div class="playerBar" :class="{ 'hovered': hoverProgressActive }" @mouseenter="hoverProgressActive = true,mouseOutProgress=false"
            @mouseleave="hoverProgressActiveMouseUp">
            <div>{{ playedTime }}</div>
            <div class="progressBar" ref="customProgressBar" @mousedown="startDragProgress" @click="handleProgressBarClick">
                <div class="progressBackground">
                    <div class="progressFill" :style="'right:' + (100 - songPercentage) + '%;'">
                        <!-- <audio id="myAudio" @ended="playNextSong" :src="sondUrl" autoplay @canplay="getDuration"></audio> -->
                    </div>
                </div>
                <span v-if="hoverProgressActive"
                :style="'right:' + (100 - songPercentage) + '%;'"
                ></span>
            </div>
            <div>{{ songTime }}</div>
        </div>
    </div>
    <div class="right">
        <div class="list" @click="playListIsShow=!playListIsShow">
            <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon"
                class="Svg-sc-ytk21e-0 gQUQL">
                <path
                    d="M15 15H1v-1.5h14V15zm0-4.5H1V9h14v1.5zm-14-7A2.5 2.5 0 0 1 3.5 1h9a2.5 2.5 0 0 1 0 5h-9A2.5 2.5 0 0 1 1 3.5zm2.5-1a1 1 0 0 0 0 2h9a1 1 0 1 0 0-2h-9z">
                </path>
            </svg>
        </div>
        <div class="playList" v-show="playListIsShow">
            <div v-show="playList.length==0" style="margin:20px auto;text-align:center;">没有在播放的列表</div>
            <div class="songitem" v-for="(songItem,index) in playList" :key="index" >
                <div class="song-details" >
                    <div class="song-title">{{songItem.name}}</div>
                    <div class="song-user">{{songItem.voteBy}}</div>
                </div>
                <button class="delete-button" v-show="isAdmin" @click="deleteSong(index)">删除</button>
            </div>
        </div>
        <div>
            <svg role="presentation" height="16" width="16" viewBox="0 0 16 16" v-if="volume >= 65">
                <path
                    d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z">
                </path>
                <path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z">
                </path>
            </svg>
            <svg role="presentation" height="16" width="16" viewBox="0 0 16 16" v-else-if="volume >= 35">
                <path
                    d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 6.087a4.502 4.502 0 0 0 0-8.474v1.65a2.999 2.999 0 0 1 0 5.175v1.649z">
                </path>
            </svg>
            <svg role="presentation" height="16" width="16" viewBox="0 0 16 16" v-else-if="volume > 0">
                <path
                    d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z">
                </path>
            </svg>
            <svg role="presentation" height="16" width="16" viewBox="0 0 16 16" v-else>
                <path
                    d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z">
                </path>
                <path
                    d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z">

                </path>
            </svg>
        </div>
        <div class="volumeBar" ref="customVolumeBar" @click="handleVolumeBarClick" :class="{ 'hovered': hoverVolumeActive }"
            @mouseenter="hoverVolumeActive = true,mouseOutVolume=false" @mouseleave="hoverVolumeActiveMouseUp" @mousedown="startDragVolume">
            <div class="volumeBackground">
                <div class="volumeFill" :style="'right:' + (100 - volume) + '%;'"></div>
            </div>
            <span class="volumeIndicator" v-if="hoverVolumeActive" :style="'right:' + (97 - volume) + '%;'"></span>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { onBeforeMount, ref, watch } from 'vue'
import { socket } from '../plugins/websocket'
import { coverUrl, songName, artists, getSongInfo,getSongName,getUserName } from '../public/public'

const onPlaying = ref(true)     //正在播放
const playedTime = ref("00:00") //已经播放的时长
const songTime = ref("00:00")   //歌曲总时长
const currentTime = ref(0)      //已经播放的秒数
const durationTime = ref(0)     //歌曲总秒数
const songPercentage = ref(0)   //歌曲现在播放的百分比
const volume = ref(50)          //音量大小
const customProgressBar = ref(null);//进度条ref
const customVolumeBar = ref(null);  //音量进度条ref
const hoverProgressActive = ref(false); //是否激活当鼠标悬浮时class
const hoverVolumeActive = ref(false);   //是否激活当鼠标悬浮时class
const mousedownProgress = ref(false);   //鼠标按下 进度条
const mousedownVolume = ref(false);     //鼠标按下 音量
const mouseOutProgress = ref(true);     //鼠标移出进度条
const mouseOutVolume = ref(true);       //鼠标移出音量
const playList = ref([]);
const playListIsShow = ref(false);      //是否显示播放列表
const isAdmin = ref();

// Format seconds to "mm:ss" format
const formatTime = (timeInSeconds) => {
    if (durationTime.value < 3600) {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
};

onBeforeMount(() => {
    // 读取cookie
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('isAdmin=')) {
            isAdmin.value = cookie.substring('isAdmin='.length, cookie.length);
        }
    }
    // 更新时间
    socket.addEventListener('open', () => {
        console.log('WebSocket connection opened');
        // 获取当前播放歌曲ID
        socket.send(JSON.stringify({ action: 'getMusicID' }));
        // 获取当前播放时间
        socket.send(JSON.stringify({ action: 'getCurrentTime' }));
        socket.send(JSON.stringify({ action: 'playStatus' }))
        // 获取总时长
        socket.send(JSON.stringify({ action: 'getDurationTime' }));
        // 获取播放列表
        socket.send(JSON.stringify({ action: 'getPlayList'}))

        // 定时刷新总时长
        setInterval(() => {
            socket.send(JSON.stringify({ action: 'getDurationTime' }));
        }, 1000); // 1000 毫秒（1 秒）为刷新间隔
        setInterval(() => {
            socket.send(JSON.stringify({ action: 'getCurrentTime' }));
        }, 1000); // 1000 毫秒（1 秒）为刷新间隔
    });

    //收到消息
    socket.addEventListener('message', async (event) => {
        let time
        const data = JSON.parse(event.data);
        if (data.action === 'currentTime') {
            if (!mousedownProgress.value) {
                currentTime.value = data.currentTime;
                time = formatTime(currentTime.value)
                playedTime.value = time;
                progressBar();
                // 在前端更新当前播放时间的状态
            }
        } else if (data.action === 'durationTime') {
            durationTime.value = data.durationTime;
            time = formatTime(durationTime.value)
            songTime.value = time;
            // 在前端更新总时长的状态
        } else if (data.action === "setMusicID") { //接收到当前音乐ID
            // console.log("data:", data)
            const songId = data.songId
            getSongInfo(songId) //设置界面显示音乐信息
        } else if (data.action === "switchMusic") { //接收到切换音乐的信息
            console.log("switchMusic +1")
            playList.value.shift()
            const songId = data.songId
            getSongInfo(songId) //设置界面显示音乐信息
        } else if (data.action === "musicStoped") {
            onPlaying.value = false
        } else if (data.action === "musicPlayed") {
            onPlaying.value = true
        } else if (data.action === "setVolume") {
            if (!mousedownVolume.value) {
                volume.value = data.volume;
            }
        } else if (data.action === "playStatus") {
            switch (data.playStatus) {
                case "playing":
                    onPlaying.value = true;
                    break;
                case "stopped":
                    onPlaying.value = false;
                    break;
                case "paused":
                    onPlaying.value = false;
                    break;
            }
        } else if (data.action === "updatePlayList") {
            console.log("dataplayList", data.playList)
            const updatedPlayList = await Promise.all(data.playList.map(async (item) => {
                const songName = await getSongName(item.songId); // 使用异步的getSongName函数获取歌曲名
                return { ...item, name: songName }; // 将歌曲名保存在名为"name"的属性中
            }));

            playList.value = updatedPlayList;
            console.log("Updated Playlist:", playList.value);
        } else if (data.action === "addMusic") {
            const songName = await getSongName(data.songId);
            const userName = await getUserName(data.userId);
            const music = { songId: data.songId, voteBy: userName, name: songName };
            playList.value.push(music);
            console.log("playList:", playList.value);
        } else if (data.action === "deleteMusic") {
            const idx = data.idx;
            playList.value.splice(idx, 1);
            console.log("playList:", playList.value);
        }

    });

})
watch(currentTime, (newTime) => {
    playedTime.value = formatTime(newTime);
});

const startDragProgress = (e) => { //鼠标按下进度条
    mousedownProgress.value = true;
    const progressBarRect = customProgressBar.value.getBoundingClientRect();
    const offsetX = e.clientX - progressBarRect.left;
    const newPercentage = (offsetX / progressBarRect.width) * 100;
    if (newPercentage >= 0 && newPercentage <= 100) {
        songPercentage.value = newPercentage;
        currentTime.value = (newPercentage / 100) * durationTime.value;
    }
}
const startDragVolume = (e) => { //鼠标按下音量条
    mousedownVolume.value = true;
    console.log("startDragVolume")
    const volumeBarRect = customVolumeBar.value.getBoundingClientRect();
    const offsetX = e.clientX - volumeBarRect.left;
    const newVolume = (offsetX / volumeBarRect.width) * 100;
    if (newVolume >= 0 && newVolume <= 100) {
        volume.value = newVolume;
    }
}
const handleBarDrag = (e) => { //移动
    if (mousedownProgress.value) {//鼠标移动时设定进度条跟随
        const progressBarRect = customProgressBar.value.getBoundingClientRect();
        const offsetX = e.clientX - progressBarRect.left;
        const newPercentage = (offsetX / progressBarRect.width) * 100;

        if (newPercentage >= 0 && newPercentage <= 100) {
            songPercentage.value = newPercentage;
            currentTime.value = (newPercentage / 100) * durationTime.value;
        }
    }
    if (mousedownVolume.value) { //鼠标移动时设定音量条跟随
        const volumeBarRect = customVolumeBar.value.getBoundingClientRect();
        const offsetX = e.clientX - volumeBarRect.left;
        const newVolume = (offsetX / volumeBarRect.width) * 100;

        if (newVolume >= 0 && newVolume <= 100) {
            volume.value = newVolume;
        }
    }
}
document.addEventListener('mousemove', handleBarDrag); //检测两个进度条的移动

const handleProgressBarMouseUp = () => {       //监听全局鼠标抬起事件
    if (mousedownProgress.value) {
        socket.send(JSON.stringify({ action: "setProgress", progress: songPercentage.value }))
        mousedownProgress.value = false;
        if (mouseOutProgress.value) {
            hoverProgressActive.value=  false
        }
    }
};
const handleVolumeBarMouseUp = () => {       //监听全局鼠标抬起事件
    if (mousedownVolume.value) {
        socket.send(JSON.stringify({ action: "setVolume", volume: volume.value }))
        mousedownVolume.value = false;
        if (mouseOutVolume.value) {
            hoverVolumeActive.value=  false
        }
    }
};
document.addEventListener('mouseup', handleProgressBarMouseUp);
document.addEventListener('mouseup', handleVolumeBarMouseUp);
const handleProgressBarClick = (event) => { //点击时设定进度
    if (!mousedownProgress.value) {
        const progressBarRect = customProgressBar.value.getBoundingClientRect();
        const offsetX = event.clientX - progressBarRect.left;
        const newPercentage = (offsetX / progressBarRect.width) * 100;

        if (newPercentage >= 0 && newPercentage <= 100) {
            songPercentage.value = newPercentage;
            currentTime.value = (newPercentage / 100) * durationTime.value;
        }
    }
};
const handleVolumeBarClick = (event) => {
    if (!mousedownVolume.value) {
        const volumeBarRect = customVolumeBar.value.getBoundingClientRect();
        const offsetX = event.clientX - volumeBarRect.left;
        const newVolume = (offsetX / volumeBarRect.width) * 100;

        if (newVolume >= 0 && newVolume <= 100) {
            volume.value = newVolume;
        }
    }
};
const hoverProgressActiveMouseUp = () => { //在进度条内松开鼠标时移除hoverActive样式
    mouseOutProgress.value = true
    if (!mousedownProgress.value) {
        hoverProgressActive.value = false
    }
}
const hoverVolumeActiveMouseUp = () => { //在进度条内松开鼠标时移除hoverActive样式
    mouseOutVolume.value = true
    if (!mousedownVolume.value) {
        hoverVolumeActive.value = false
    }
}
const progressBar = () => { //接收到消息时通过两个值设定songPercentage百分比
    songPercentage.value = (currentTime.value / durationTime.value) * 100
}

const playButtonClick = () => {
    onPlaying.value = !onPlaying.value
    if (onPlaying.value) {
        axios({
            url: '/api/song/playMusic',  //播放
            method: 'post',
        })
    } else {
        axios({
            url: '/api/song/stopMusic',  //暂停
            method: 'post',
        })
    }
}
const playNextSong = () => {
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('isAdmin=')) {
            const isAdmin = cookie.substring('isAdmin='.length, cookie.length);
            axios({
                url: '/api/song/nextMusic/',  //下一首
                method: 'post',
                data: {
                    isAdmin: isAdmin, //这里读取cookie中的userId并发送
                }
            })
            break;
        }
    }

}
//读取删除按钮的id
const deleteSong = (idx) => {
    axios({
        url: '/api/song/deleteMusic',  //删除
        method: 'post',
        data: {
            idx: idx
        }
    }).then(response => {
        console.log(response.data);
    })
}

</script>