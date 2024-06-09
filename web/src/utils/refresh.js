import axios from 'axios';
import { useInfoStore } from "@/stores/info.js";
import { storeToRefs } from 'pinia';
const store = useInfoStore();
const { items } = storeToRefs(store)

function getinfos() {
    const token = localStorage.getItem('token');
    // const usertypes = {
    //     0: "融资企业",
    //     1: "物流企业",
    //     2: "金融企业",
    //     3: "管理员"
    // }
    axios.post('/api/users', {
        token: token
    }).then((response) => {
        items.value = []
        response.data.forEach(e => {
            // e.usertype = usertypes[e.usertype]
            items.value.push(e)
        })
    })
}




export default getinfos;