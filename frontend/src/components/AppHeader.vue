<template>
    <div class="search">
        <div class="search-bar" ref="box">
            <input type="text" name="searchInput" id="searchInput" @keyup.enter="searchButtonDown" :value="searchText" placeholder="search..."
                autocomplete="off" @input="onSearchInput">
            <button type="submit" @click="searchButtonDown">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16.3451 15.2003C16.6377 15.4915 16.4752 15.772 16.1934 16.0632C16.15 16.1279 16.0958 16.1818 16.0525 16.2249C15.7707 16.473 15.4456 16.624 15.1854 16.3652L11.6848 12.8815C10.4709 13.8198 8.97529 14.3267 7.44714 14.3267C3.62134 14.3267 0.5 11.2314 0.5 7.41337C0.5 3.60616 3.6105 0.5 7.44714 0.5C11.2729 0.5 14.3943 3.59538 14.3943 7.41337C14.3943 8.98802 13.8524 10.5087 12.8661 11.7383L16.3451 15.2003ZM2.13647 7.4026C2.13647 10.3146 4.52083 12.6766 7.43624 12.6766C10.3517 12.6766 12.736 10.3146 12.736 7.4026C12.736 4.49058 10.3517 2.1286 7.43624 2.1286C4.50999 2.1286 2.13647 4.50136 2.13647 7.4026Z"
                        fill="#FFF"></path>
                </svg>
            </button>
        </div>
        <div class="search-shadow"></div>
        <ul class="suggestList" v-show="suggestListIsNotShow" ref="box2">
            <li v-for="(suggestResult, index) in suggestResults" :key="index" :data-text="suggestResult"
                @click="suggestButtonDown">
                {{ suggestResult }}</li>
        </ul>
    </div>
    <div @click="showRegistrationForm" class="regsterText">
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
            viewBox="0 0 1280.000000 640.000000" preserveAspectRatio="xMidYMid meet">
            <metadata>
                Created by potrace 1.15, written by Peter Selinger 2001-2017
            </metadata>
            <g transform="translate(0.000000,640.000000) scale(0.100000,-0.100000)" fill="#CAC7FF" stroke="none">
                <path
                    d="M9638 6075 c-772 -93 -1504 -467 -2317 -1184 -198 -174 -334 -303 -657 -624 -230 -229 -264 -258 -281 -249 -11 6 -100 93 -199 194 -1144 1171 -1886 1664 -2745 1822 -560 103 -1141 38 -1669 -186 -885 -376 -1533 -1167 -1714 -2093 -41 -207 -51 -318 -51 -565 0 -392 54 -719 176 -1065 338 -964 1145 -1627 2164 -1779 634 -95 1337 26 1957 335 243 121 448 250 703 441 321 239 556 450 1061 950 176 175 327 318 334 318 8 0 77 -66 154 -146 172 -179 592 -584 770 -743 820 -731 1442 -1055 2226 -1163 58 -8 194 -12 350 -12 213 0 279 4 400 23 650 100 1205 379 1659 832 457 457 742 1045 823 1699 19 155 16 563 -6 720 -78 561 -275 1067 -568 1457 -95 128 -294 332 -425 435 -364 290 -837 486 -1378 570 -172 26 -594 34 -767 13z m-6331 -1199 c336 -71 676 -233 1010 -481 119 -88 297 -234 413 -339 146 -133 880 -850 880 -860 0 -16 -640 -649 -795 -788 -492 -438 -947 -715 -1375 -839 -202 -58 -321 -74 -565 -74 -190 0 -235 3 -334 23 -590 119 -1022 504 -1210 1077 -160 489 -130 953 90 1385 252 496 706 824 1266 915 63 10 146 13 293 10 172 -3 225 -8 327 -29z m6863 19 c327 -46 605 -171 841 -378 439 -384 649 -1063 517 -1677 -134 -625 -615 -1131 -1229 -1295 -148 -39 -279 -55 -454 -55 -310 0 -559 62 -870 215 -327 160 -642 391 -1037 761 -248 232 -743 719 -746 734 -3 16 466 495 668 681 682 630 1221 933 1800 1014 130 18 382 18 510 0z" />
            </g>
        </svg>
    </div>
    <div v-if="showForm" @click="hideRegistrationForm" class="modal-overlay">
        <!-- <div @click.stop class="modal-content">
            <form @submit.prevent="register">
                <label>
                    Username:
                    <input type="text" v-model="username" required>
                </label>
                <button type="submit">Register</button>
            </form>
            <button @click="hideRegistrationForm">关闭弹窗</button>
        </div> -->
        <div class="card" @click.stop>
            <div class="front modal-content">
                <form @submit.prevent="register">
                    <div class="close" @click="hideRegistrationForm">
                        <svg t="1685941307948" class="icon" viewBox="0 0 1024 1024" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="6517" xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="20" height="20">
                            <path
                                d="M511.968 376.224 796.096 92.096C833.536 54.624 894.4 54.624 931.84 92.096 969.312 129.568 969.312 190.4 931.84 227.872L647.744 512 931.84 796.096C969.312 833.568 969.312 894.4 931.84 931.872 894.4 969.344 833.536 969.344 796.096 931.872L511.968 647.744 227.84 931.872C190.4 969.344 129.536 969.344 92.096 931.872 54.624 894.4 54.624 833.568 92.096 796.096L376.224 512 92.096 227.872C54.624 190.4 54.624 129.568 92.096 92.096 129.536 54.624 190.4 54.624 227.84 92.096L511.968 376.224Z"
                                p-id="6518"></path>
                        </svg>
                    </div>
                    <div class="inputText">
                        <input type="text" required maxlength="15" v-model="username" v-bind:class="{ focus: isFocused }"
                            @focus="isFocused = true" @blur="onBlur">
                        <span data-placeholder="Username"></span>
                    </div>
                    <input type="submit" value="Login" class="loginbutton" />
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import { setCookie } from '@/plugins/cookie';
import { searchResults } from '../public/public';
import { socket } from '../plugins/websocket'
import { onMounted,onBeforeMount, ref } from 'vue'

const searchText = ref("")
const suggestListIsNotShow = ref(false)
const suggestResults = ref([])
const showForm = ref(false)
const username = ref('')
const isFocused = ref(false)
const box = ref(null)
const box2  = ref(null)

//启动时执行
onBeforeMount(() => {
    // 读取用户名
    quisitionUsername()

})

const handleOutsideClick = (event) => {
    const clickedElement = event.target;
    // Check if clicked element is outside of both search-bar and suggestList
    if (box.value && !box.value.contains(clickedElement) &&
      box2.value && !box2.value.contains(clickedElement)) {
        suggestListIsNotShow.value = false;
    }
};
onMounted(() => {
  window.addEventListener('click', handleOutsideClick);
});
//用户名如果存在则不移除获得焦点样式
const onBlur = () => {
    const trimmedUsername = username.value?.trim();
    isFocused.value = !!trimmedUsername;
}
function getSearchSuggest(searchText) {
    const requestData = {
        action: 'getSearchSuggest',
        keywords: searchText
    };
    socket.send(JSON.stringify(requestData));
}
function unique(arr) {
    return Array.from(new Set(arr));
}
socket.addEventListener('message', (event) => {

    const data = JSON.parse(event.data);
    if (data.action === 'searchSuggest') {
        // 处理搜索建议的数据
        const searchSuggest = data.result.body.result;
        // 更新页面显示
        let tempArr = [];
        if (searchSuggest != undefined && searchSuggest.order != undefined) {
            if (searchSuggest.order.indexOf('artists') >= 0) {
                for (let i = 0; i < searchSuggest.artists.length; i++) {
                    let tmp = searchSuggest.artists[i].name
                    tempArr.push(tmp)
                }
            }
            if (searchSuggest.order.indexOf('songs') >= 0) {
                for (let i = 0; i < searchSuggest.songs.length; i++) {
                    let tmp = searchSuggest.songs[i].name
                    tempArr.push(tmp)
                }
            }
            suggestResults.value = unique(tempArr);
            suggestListIsNotShow.value = true
        }
    }
});
// 在搜索框有输入时
function onSearchInput(e) {
    searchText.value = e.target.value

    if (searchText.value == "") {
        suggestListIsNotShow.value = false
    }
    getSearchSuggest(searchText.value)
}

// 搜索按钮按下
function searchButtonDown() {
    suggestListIsNotShow.value = false
    axios({
        url: '/api/cloudsearch?keywords=' + searchText.value,  // 搜索建议
        method: 'get'
    })
        .then(res => {
            searchResults.value = ref(new Set());
            // console.log(res)
            // for (var i = 0; i < res.data.body.result.songs.length; i++) {
            for (var i = 0; i < 20; i++) {
                let artists = ""
                for (var j = 0; j < res.data.body.result.songs[i].ar.length; j++) {
                    if (j < 3) {
                        artists += res.data.body.result.songs[i].ar[j].name
                        if (j != res.data.body.result.songs[i].ar.length - 1 && j < 2) {
                            artists += ","
                        }
                    }
                }
                let songName = res.data.body.result.songs[i].name
                let albumName = res.data.body.result.songs[i].al.name
                let songsId = res.data.body.result.songs[i].id
                let songCoverUrl = ""
                axios({
                    url: '/api/song/detail?ids=' + songsId,  // 获取歌曲信息
                    method: 'get'
                })
                    .then(res1 => {
                        songCoverUrl = res1.data.body.songs[0].al.picUrl
                        let tmp = { songName: songName, artistsName: artists, albumName: albumName, id: songsId, songCoverUrl: songCoverUrl }
                        searchResults.value.value.add({ temp: tmp })
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }
            // console.log(searchResults.value)
        })
        .catch(err => {
            console.log(err)
        })
}

// 填充搜索建议
function suggestButtonDown(e) {
    let text = e.target.dataset.text
    searchText.value = text
}

// 显示注册
function showRegistrationForm() {
    showForm.value = true;
}

// 隐藏注册
function hideRegistrationForm() {
    showForm.value = false;
}

// 注册代码
async function register() {
    try {
        const response = await axios.post('/api/user/add', { userName: username.value });
        // console.log("response", response)
        const userId = response.data.userId; // 从响应消息中提取 userId
        const isAdmin = response.data.isAdmin;
        setCookie('userId', userId); // 将 userId 保存在 cookie 中
        setCookie('isAdmin', isAdmin); // 将 userId 保存在 cookie 中
        hideRegistrationForm(); // 跳转到仪表盘页面
    } catch (error) {
        console.error(error);
    }
}

// 查询用户名
async function quisitionUsername() {
    let userId = null;
    const cookieString = document.cookie;
    const cookies = cookieString.split(';');
    // console.log("cookies", cookies)
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith('userId=')) {
            userId = cookie.substring('userId='.length, cookie.length);
            break;
        }
    }
    // console.log("userId", userId);
    try {
        if (userId != null || userId != undefined) {
            const response = await axios.post('/api/user/query', { userId: userId });
            // console.log("response", response)
            if (response != "") {
                const name = response.data.name; // 从响应消息中提取 userId
                // const isAdmin = response.data.isAdmin;
                username.value = name
                isFocused.value = true
            }
        }
    } catch (error) {
        console.error(error);
    }
}
</script>

<style></style>