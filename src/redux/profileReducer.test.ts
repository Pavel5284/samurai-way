import profileReducer, {addPostAC, deletePostAC} from "./profileReducer";
import {ProfileType} from "./state";

let state = {
    posts: [
        {id: 1, message: "Hi, it's me", likesCount: 12},
        {id: 2, message: 'This is first post', likesCount: 8},
        {id: 3, message: 'This is second post', likesCount: 10}
    ],
    profile: null as ProfileType | null,
    status: ""
}

test('length of posts should be incremented', () => {
    let action = addPostAC('newpost')

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(4)
})
test('message of posts should be corrected', () => {
    let action = addPostAC('newpost')

    let newState = profileReducer(state, action);

    expect(newState.posts[3].message).toBe('newpost')
})
test('correct  post should be deleted', () => {
    let action = deletePostAC(1)

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2)
})
test(`after deleting length should't be decrement if id is incorrect` , () => {
    let action = deletePostAC(1000)

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(3)
})