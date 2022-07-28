import renderer from 'react-test-renderer';
import Combate from './Combate';

describe ('Pruebas unitarias al componente combate', () => {
    it('Should render ', () => {
        const tree = renderer.create(<Combate />);
        expect(tree).toBeTruthy();
    })
})

