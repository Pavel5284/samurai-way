import axios from "axios";

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
        return instance.post(`follow/${userId}`, {}
        )
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    getProfile(userId: number) {
       return instance.get(`profile/` + userId)

    }

}

export const authAPI = {
   me() {
       return instance.get(`auth/me`)
   }

}
