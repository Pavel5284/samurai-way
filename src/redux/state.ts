import {rerenderEntireTree} from "../render";

export type AppStatePropsType = {
    profilePage: ProfilePageType
    messagesPage: MessagesPageType
}
export type ProfilePageType = {
    posts: PostDataType[]
}

export type PostDataType = {
    id: number
    message: string
    likesCount: number
}

export type MessagesPageType = {
    messages: PropsMessageType[]
    dialogs: PropsDialogType[]
}

export type PropsDialogType = {
    id: number
    name: string
}

export type PropsMessageType={
    id?: number
    message: string
}

export  let appState: AppStatePropsType = {

    profilePage: {
        posts: [
            {id: 1, message: "Hi, it's me", likesCount: 12},
            {id: 2, message: 'This is first post', likesCount: 8},
            {id: 3, message: 'This is second post', likesCount: 10}
        ]
    },

    messagesPage: {
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'Ha-ha'},
            {id: 3, message: 'Hello'},
            {id: 4, message: 'How is your samurai-way?'}
        ],
        dialogs: [
            {id: 1, name: 'Dimych'},
            {id: 2, name: 'Andrew'},
            {id: 3, name: 'Sveta'},
            {id: 4, name: 'Sasha'},
            {id: 5, name: 'Viktor'}
        ]
    }
}

export const  addPost = (postMessage: string) => {
    let newPost: PostDataType = {
        id: new Date().getTime(),
        message:postMessage,
        likesCount: 0
    }
    appState.profilePage.posts.push(newPost);
    rerenderEntireTree(appState)
}