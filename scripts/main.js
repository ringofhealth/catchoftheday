var React = require('react')
var ReactDOM = require('react-dom')
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var Navigation = ReactRouter.Navigation
var History = ReactRouter.History
const helpers = require('./helpers');
var createBrowserHistory = require('history/lib/createBrowserHistory')

var App = React.createClass({
  getInitialState: function () {
    return {
      fishes:{},
      order:{}
    }
  },

  addFish:function (fish) {
    var timeStamp = (+new Date())
    this.state.fishes[`fish-${timeStamp}`] =fish
    this.setState({fishes: this.state.fishes})
  },
  render: function() {
    return (
      <div className="catch-of-the-day">
        <div>
          <Header tagline="Fresh Seafood Market"/>
        </div>
        <Order/>
        <Inventory addFish={this.addFish}/>
      </div>
    )
  }
})

var AddFishForm = React.createClass({
  createFish :function createFish(event) {
    event.preventDefault()
    var fish ={
      name:this.refs.name.value,
      price:this.refs.price.value,
      status:this.refs.status.value,
      desc: this.refs.desc.value,
      image:this.refs.image.value

    }
    console.log(fish)

    this.props.addFish(fish)
    this.refs.fishForm.reset()
  },
  render:function render() {
    return (<form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name"/>
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Desc"></textarea>
        <input type="text" ref="image" placeholder="URL to Image" />
        <button type="submit">+ Add Item </button>
      </form>)
  }
})

var Header = React.createClass({
  render: function() {
    return (
      <header className="top">
        <h1>Catch <span className="ofThe"><span className="of">of</span><span className="the">the</span> </span>Day</h1>
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
})


var Order = React.createClass({
  render: function() {
    return (
      <p>Order</p>
    )
  }
})


var Inventory = React.createClass({
  render: function() {
    return (
      <div>
        <h2>Inventory</h2>
        <AddFishForm {...this.props}/>
      </div>

    )
  }
})

var StorePicker = React.createClass({
  mixins : [History],
 goToStore : function(event) {
   event.preventDefault();
   // get the data from the input
   var storeId = this.refs.storeId.value;
   this.history.pushState(null, '/store/' + storeId);
 },
  render: function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A store</h2>
        <input type="text" ref="storeId" defaultValue={helpers.getFunName()} required/>
        <input type="Submit"/>
      </form>
    )
  }
});

var NotFound = React.createClass({
  render: function () {
    return <h1>not found</h1>
  }
})

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="/*" component={NotFound } />

  </Router>
)
ReactDOM.render(routes, document.querySelector("#main"))
