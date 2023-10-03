import { ref } from 'vue';
import axios from 'axios';

export const songId = ref(0)
export const sharedValue = ref(new Set());
export const onPlaying = ref(false)
export const searchResults = ref(new Set())
export const artists = ref("")
export const songName = ref("")
export const coverUrl = ref(require("../assets/Cover.jpg"))

//获取信息
export const getSongInfo = (id) => {
    axios({
        url: '/api/song/detail?ids=' + id,  // 获取歌曲信息
        method: 'get'
    })
        .then(res => {
            artists.value = ""
            for (let i = 0; i < res.data.body.songs[0].ar.length; i++) {
                artists.value += res.data.body.songs[0].ar[i].name;
                if (i != res.data.body.songs[0].ar.length - 1) {
                    artists.value += ","
                }
            }
            coverUrl.value = res.data.body.songs[0].al.picUrl
            songName.value = res.data.body.songs[0].name
        })
        .catch(err => {
            console.log(err)
        })
}
export const getSongName = async (id) => {
    try {
        const response = await axios({
            url: '/api/song/detail?ids=' + id,
            method: 'get'
        });
        
        const songName = response.data.body.songs[0].name;
        return songName;
    } catch (error) {
        console.error(error);
    }
}
export const getUserName = async (id) => {
    try {
        const response = await axios({
            url: '/api/user/query',
            method: 'post',
            data: {
                userId: id
            }
        });
        const userName = response.data.name;
        return userName;
    }catch (error) {
        console.error(error);
    }
}