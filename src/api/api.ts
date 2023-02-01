import axios, {AxiosResponse} from "axios";
import {ProfileType} from "../redux/state";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ab6bfda0-a314-4258-a0ce-28cd6206b79f"
    }
})

export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number = 10)  {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userId: number) {
        return instance.post<any, AxiosResponse<ResponseType>>(`follow/${userId}`).then(response => response.data)
    },
    unfollow(userId: number) {
        return instance.delete<any, AxiosResponse<ResponseType>>(`follow/${userId}`).then(response => response.data)
    },
    getProfile(userId: number) {
       return profileAPI.getProfile(userId)

    }

}

export type ResponseType<T = {}> = {
    data: T;
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(photo: string) {
        const formData = new FormData();
        formData.append('image', photo)
        return instance.put ('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType | null) {
        return instance.put('profile', profile)
    }

}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchIsRequired = 10
}

type MeResponseDataType = {
    id: number
    email: string
    login: string
}

type MeResponseType = {
    data: MeResponseDataType
    resultCode: ResultCodesEnum
    messages: any
}

export const authAPI = {
   me() {
       return instance.get<MeResponseType>(`auth/me`)
   },
    login(email: string, password: string, rememberMe: boolean = false, captcha: string) {
       return instance.post(`auth/login`, { email, password, rememberMe, captcha})
    },
    logout() {
       return instance.delete(`auth/login`)
    }

}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}
