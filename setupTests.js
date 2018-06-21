import dotenv from 'dotenv';
import Enzyme, { shallow, render, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

dotenv.config();

Enzyme.configure({ adapter: new EnzymeAdapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
