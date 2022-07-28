import renderer from 'react-test-renderer';
import BuscadorCombate from './BuscadorCombate';

describe ('Pruebas unitarias al componente buscadorCombate', () => {


    
    it('Should render ', () => {
        const tree = renderer.create(<BuscadorCombate />);
        expect(tree).toBeTruthy();
    })
})