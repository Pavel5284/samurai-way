import profileReducer, {AddPostActionType, ChangeNewTextActionType} from "./profileReducer";
import dialogReducer, {ChangeNewMessageActionType, SendMessageActionType} from "./dialogsReducer";

/*export let store: StoreType = {
    _appState: {
        profilePage: {
            posts: [
                {id: 1, message: "Hi, it's me", likesCount: 12},
                {id: 2, message: 'This is first post', likesCount: 8},
                {id: 3, message: 'This is second post', likesCount: 10}
            ],
            newPostText: '',
            profile: ''
        },

        messagesPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrew'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'Ha-ha'},
                {id: 3, message: 'Hello'},
                {id: 4, message: 'How is your samurai-way?'}
            ],
            newMessageBody: ''

        }
    },


    subscribe (observer)  {
        this._rerenderEntireTree = observer;
    },
    _rerenderEntireTree ()  {
        console.log('state is changed')
    },
    getState() {
        return this._appState
    },
    dispatch(action) {

        this._appState.profilePage = profileReducer(this._appState.profilePage, action)
        this._appState.messagesPage = dialogReducer(this._appState.messagesPage, action)
        this._rerenderEntireTree()

        /!*if (action.type === 'ADD-POST') {
            let newPost: PostDataType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            this._appState.profilePage.posts.push(newPost);
            this._appState.profilePage.newPostText='';
            this._rerenderEntireTree()
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._appState.profilePage.newPostText = action.newText
            this._rerenderEntireTree()
        } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
            this._appState.messagesPage.newMessageBody = action.newMessageText;
            this._rerenderEntireTree()
        } else if (action.type === 'SEND-MESSAGE') {
            let newMessage: PropsMessageType = {
                id: new Date().getTime(),
                message: action.newMessage
            }
            this._appState.messagesPage.newMessageBody = '';
            this._appState.messagesPage.messages.push(newMessage);
            this._rerenderEntireTree()
        }*!/
    }

};*/



export type StoreType = {
    _appState: AppStatePropsType
    subscribe: (observer: () => void) => void
    _rerenderEntireTree: () => void
    getState: () => AppStatePropsType
    dispatch: (action: ActionsType) => void
}
export type AppStatePropsType = {
    profilePage: ProfilePageType
    messagesPage: MessagesPageType
}
type ProfilePageType = {
    posts: PostDataType[]
    newPostText: string
    profile: string
}
type PostDataType = {
    id: number
    message: string
    likesCount: number
}
type MessagesPageType = {
    messages: PropsMessageType[]
    dialogs: PropsDialogType[]
    newMessageBody: string
}
type PropsDialogType = {
    id: number
    name: string
}
type PropsMessageType={
    id?: number
    message: string
}
export type ProfileType= {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
    photos: UserPhotos
}
export type ContactType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type UserPhotos = {
    small: string | null
    large: string | null
}


/*
type AddPostActionType = ReturnType<typeof addPostActionCreator>
type ChangeNewTextActionType = ReturnType<typeof ChangeNewTextActionCreator>
type ChangeNewMessageActionType = ReturnType<typeof ChangeNewMessageActionCreator>
type SendMessageActionType = ReturnType<typeof SendMessageActionCreator>
*/



/*export const addPostActionCreator = (newPostText: string) => {
    return {
        type: 'ADD-POST',
        newPostText: newPostText
    } as const
}

export const ChangeNewTextActionCreator = (newText: string) => {
    return {
        type: "UPDATE-NEW-POST-TEXT",
        newText: newText
    } as const
}*/

/*export const SendMessageActionCreator = (newMessage: string) => {
    return {
        type: 'SEND-MESSAGE',
        newMessage: newMessage
    } as const
}

export const ChangeNewMessageActionCreator = (newMessageText: string) => {
    return {
        type: "UPDATE-NEW-MESSAGE-TEXT",
        newMessageText: newMessageText
    } as const
}*/
type ActionsType = AddPostActionType | ChangeNewTextActionType | ChangeNewMessageActionType | SendMessageActionType




