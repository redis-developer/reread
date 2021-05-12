import Axios from 'axios';
import { DiscoveredFeed, FeedList } from './Model';

export default class FeedApi {

    private static FEED_LIST: FeedList = [];

    static async getFeedList() {
        const response = await Axios.get('/feeds/me');
        const list: FeedList = response.data;
        FeedApi.FEED_LIST = list;
        return list;
    }

    static getFeedDetails(feedID: string) {
        const list = FeedApi.FEED_LIST;
        let found = list.feeds.find(item => item.masterFeedID === feedID);
        if (!found) {
            list.folders.forEach(folder => {
                found = folder.childFeeds.find(feed => feed.masterFeedID === feedID);
            });
        }

        return found;
    }

    static async discoverFeed(url: string): Promise<Array<DiscoveredFeed>> {
        const response = await Axios.post('/feeds/discover', {
            url: url
        });
        return response.data;
    }

    static async subscribeFeed(feed: DiscoveredFeed) {
        const response = await Axios.post('/feeds/subscribe', {
            url: feed.feedUrl,
            site: feed.siteUrl,
            iconUrl: feed.iconUrl,
            title: feed.title
        });
        return response.data;
    }
}
