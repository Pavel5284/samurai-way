import {ChangeNewMessageActionType, SendMessageActionType} from "./dialogsReducer";

/*export type ProfilePageType = {
    posts: PostDataType[]
    newPostText: string
}*/
export type PostDataType = {
    id: number
    message: string
    likesCount: number
}

export type ActionsType = AddPostActionType | ChangeNewTextActionType | ChangeNewMessageActionType | SendMessageActionType


export type AddPostActionType = ReturnType<typeof addPostActionCreator>
export type ChangeNewTextActionType = ReturnType<typeof ChangeNewTextActionCreator>
export const addPostActionCreator = (newPostText: string) => {
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
}

type InitialStateType = {
    posts: PostDataType[],
    newPostText: string

}

const initialState:  InitialStateType = {
        posts: [
            {id: 1, message: "Hi, it's me", likesCount: 12},
            {id: 2, message: 'This is first post', likesCount: 8},
            {id: 3, message: 'This is second post', likesCount: 10}
        ],
        newPostText: ''

}


const profileReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {

    switch (action.type) {
        case 'ADD-POST':
            let newPost: PostDataType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            return  {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };


        case 'UPDATE-NEW-POST-TEXT':
            return {
                ...state,
                newPostText: action.newText
            };
        default:
            return state;
    }
}





export default profileReducer;