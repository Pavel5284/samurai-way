import {ActionsType,  PostDataType, ProfilePageType} from "./state";

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


const profileReducer = (state: ProfilePageType, action: ActionsType) => {

    switch (action.type) {
        case 'ADD-POST':
            let newPost: PostDataType = {
                id: new Date().getTime(),
                message: action.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost);
            state.newPostText='';
            return state;
        case 'UPDATE-NEW-POST-TEXT':
            state.newPostText = action.newText
            return state;
        default:
            return state;
    }
}





export default profileReducer;