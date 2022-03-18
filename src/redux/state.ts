
export type ProfileType = {
    posts: Array<PostDataType>
    dialogs: Array<PropsDialogType>
    messages: Array<PropsMessageType>
}

export type PostsType = {
    posts: Array<PostDataType>
}

export type PostDataType = {
    id: number
    message: string
    likesCount: number
}

export type PropsDialogType={
    id: number
    name: string
}

export type PropsMessageType={
    message: string
}



export  let appState = {

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