import Axios from 'axios';

export default class PostApi {

    static async search(text: string) {
        const response = await Axios.get('/posts/search?query=' + encodeURIComponent(text));
        return response.data;
    }

    static async markRead(postID: string) {
        const response = await Axios.get('/posts/read/' + postID);
        return response.data;
    }

    static async markAllRead(ids: Array<string>) {
        const response = await Axios.post('/posts/markAllRead', ids);
        return response.data;
    }

    static async markAllUnread(ids: Array<string>) {
        const response = await Axios.post('/posts/markAllUnread', ids);
        return response.data;
    }
}