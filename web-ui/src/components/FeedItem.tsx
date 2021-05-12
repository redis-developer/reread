import React from 'react';
import { withRouter } from 'react-router-dom';

import { Feed } from '../api/Model';
import Icon from './Icon';

interface FeedItemProps {
    feed: Feed;
    history: any;
    mode?: string;
}

class FeedItem extends React.Component<FeedItemProps, any> {

    showFeed = () => {
        const { feed, history, mode } = this.props;
        const path = 'folder' === mode ? '/folder/' : '/feed/';
        history.push(path + feed.masterFeedID);
    }

    render() {
        const { feed } = this.props;
        const hasImage = !!feed.iconUrl;
        return <li>
            <a href='#' className='link-dark rounded feed-list-link' onClick={this.showFeed}>
                {hasImage && <img className='feed-list-icon' src={feed.iconUrl} /> }
                {!hasImage && <Icon name='rss' />}
                {feed.title}
            </a>
        </li>
    }

}

export default withRouter(FeedItem);
