import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets,
    }
} 

function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet
    };
}

export function handleAddTweet(text, replyingTo) {
    return (dispatch, getState) => {
        console.log(getState());
        const {authedUser} = getState();
        console.log( 'Authed User', authedUser );
        dispatch(showLoading());
        return saveTweet({
            text,
            auther: authedUser,
            replyingTo
        }).then((tweet) => dispatch(addTweet(tweet))).then(() => { dispatch(hideLoading()) });
    };
}

function toggleTweet({id, authedUser, hasLiked}) {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked
    };
}

export function handleToggleTweet(info) {
    return (dispatch) => {
        dispatch(toggleTweet(info));

        return saveLikeToggle(info).catch((e) => {
            console.warn('Error in the handleToggleTweet: ', e);
            dispatch(toggleTweet); // To reset the tweet like back to the oppossite value.
            alert('There was an error liking the tweet. Try again.')
        });
    };
}