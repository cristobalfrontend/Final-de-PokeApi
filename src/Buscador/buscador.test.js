import renderer from 'react-test-renderer';
import Buscador from './Buscador';

describe ('Pruebas unitarias del componente buscardor', () => {
    it('Should render ', () => {
        const tree = renderer.create(<Buscador />);
        expect(tree).toBeTruthy();
    })
})

