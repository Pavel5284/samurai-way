import usersReducer, {followSuccessAC, InitialStateType, unfollowSuccessAC} from "./usersReducer";

let state: InitialStateType

    beforeEach(() => {
        state = {
            users: [
                {
                    id: 0, name: 'Pavel', followed: false,
                    photos: {small: null, large: null}, status:'status 0', location: {city: 'Kaliningrad', country: 'Russia'}
                },
                {
                    id: 1, name: 'Nikolay', followed: false,
                    photos: {small: null, large: null}, status:'status 1', location: {city: 'Moskow', country: 'Russia'}
                },
                {
                    id: 2, name: 'Jack', followed: true,
                    photos: {small: null, large: null}, status:'status 2', location: {city: 'New York', country: 'USA'}
                },
                {
                    id: 3, name: 'Sveta', followed: false,
                    photos: {small: null, large: null}, status:'status 3', location: {city: 'Kaliningrad', country: 'Russia'}
                },
            ],
            pageSize: 10,
            totalUsersCount: 0,
            currentPage: 1,
            filter: {term: '', friend: null},
            isFetching: true,
            followingInProgress: [] as Array<number>,
            portionSize: 10
        }
    })




test('follow success', () => {

    const newState = usersReducer(state, followSuccessAC(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('unFollow success', () => {

    const newState = usersReducer(state, unfollowSuccessAC(2))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[2].followed).toBeFalsy()
})