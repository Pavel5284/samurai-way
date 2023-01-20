import {UsersDataType} from "../redux/usersReducer";

export const updateObjectInArray = (items:UsersDataType[], itemId:number, objPropName: keyof UsersDataType,
                                    newObjProps: {followed: boolean}): UsersDataType[] => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return{...u, ...newObjProps}
        }
        return u
    })
}