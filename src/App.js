import { useDispatch, useSelector } from 'react-redux';
import ItemBox from './components/ItemBox';
import CartItems from './components/CartItems';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { House, Cart } from 'react-bootstrap-icons';
import NotificationBadge, { Effect } from 'react-notification-badge';
import './App.css';

const App = () => {
  const items = useSelector(state => state.items);
  const count = useSelector(state => state.count);
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {

    dispatch({ type: 'FILTER_ITEMS', payload: e });
  }

  let uniqueCategories = ['All'];
  items.map((item) => { 
    if (uniqueCategories.indexOf(item.category) === -1) { 
      uniqueCategories.push(item.category) 
    } return uniqueCategories });


  return (
    <div className="App">
      <Router>
        <Container className="d-flex justify-content-around align-items-center mb-3 p-2">
          <Link to="/">
            <Button variant="light">
              <House size={26} />
              <span> Home</span>
            </Button>
          </Link>
          <h1>Restaurant App</h1>
          <Link to="/cart">
          <NotificationBadge count={count} effect={Effect.SCALE} frameLength={15.0} />
            <Button variant="light">
              <Cart size={28} />
              <span>Cart</span>
            </Button>
          </Link>
        </Container>
        <label>Filter by:</label>
        <select onChange={e => onChangeHandler(e.target.value)}>
          {uniqueCategories.map(category => <option key={uuidv4()} value={category}>{category}</option>)}
        </select>
        <div className="mt-4">
          <Switch>
            <Route exact path="/" component={ItemBox} />
            <Route path="/cart"> {cartItems.length > 0 ? <CartItems /> : <h3>Your cart is empty. :(</h3>} </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
