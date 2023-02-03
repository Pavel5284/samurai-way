import {create} from "react-test-renderer";
import {Paginator} from "./Paginator";

describe('Paginator component tests', () => {
    test('pages count is 11 but should be showed only 10', () => {
        const component = create(<Paginator totalUsersCount={11} pageSize={1} portionSize={10} currentPage={1}
                                            onPageChanged={() => {
                                            }}/>);
        const root = component.root;
        let span = root.findAllByType('span');
        expect(span.length).toBe(11);
    });


    test('if pages count is more than 10 button NEXT should be present', () => {
        const component = create(<Paginator totalUsersCount={11} pageSize={1} portionSize={10} currentPage={1}
                                            onPageChanged={() => {
                                            }}/>);
        const root = component.root;
        let span = root.findAllByType('span');
        expect(span.length).toBe(11);
    });
})