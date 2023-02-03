import {follow, followSuccess, toggleIsFollowingProgress, unfollow, unfollowSuccess} from "./usersReducer";
import {ResponseType, ResultCodesEnum, usersAPI} from "../api/api";
jest.mock("../api/api")

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {

    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()
})

const result: ResponseType = {
    resultCode: ResultCodesEnum.Success,
    messages: [],
    data: {},
    fieldsErrors: []
}




test('success folow thunk', async () => {
    usersAPIMock.follow.mockReturnValue(Promise.resolve(result))
    const thunk = follow(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, followSuccess( 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollowingProgress(false, 1))
})

test('success unFolow thunk', async () => {
    usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))
    const thunk = unfollow(1)


    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, toggleIsFollowingProgress(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, unfollowSuccess( 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, toggleIsFollowingProgress(false, 1))
})