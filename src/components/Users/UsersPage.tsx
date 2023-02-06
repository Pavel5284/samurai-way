import {useAppSelector} from "../../redux/redux-store";
import {getIsFetching} from "../../redux/usersSelectors";
import {Preloader} from "../common/Preloader/Preloader";
import {Users} from "./Users";

type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
    const isFetching = useAppSelector(getIsFetching)
    return <>
        <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}