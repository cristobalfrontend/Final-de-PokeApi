import renderer from 'react-test-renderer';
import { FetchDataOne } from '../../src/Fetch/FetchDataOne';

describe('FetchDataOne', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<FetchDataOne />);
        expect(tree).toBeTruthy();
    })
});