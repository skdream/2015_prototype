var evt = new Event;

var SearchCmp = React.createClass({
	handleClick: function() {
		var txtDom = document.getElementById('txt1'); 
		evt.fire('SEARCH', {
			value: txtDom.value
		})
	}, 
	render: function() {
		return (
			<div> 
				<input id="txt1" />
				<input type="button" value="submit" id="btn1" onClick={this.handleClick} />
			</div>
		);
	}
})

var ShowCmp = React.createClass({
	getInitialState: function() {
		return {
			searchValue: 'aa'
		}
	}, 
	componentDidMount: function() {
		var self = this;
		evt.on('SEARCH', function(options) {
			var val = options.value;
			self.setState({
				searchValue: val
			})
		})
	}, 
	render: function() {
		return (
			<div>{this.state.searchValue}</div>
		);
	}
})

var TitleBar = React.createClass({
	render: function() {
		return (
			<SearchCmp />
		);
	}
})

var CardBody = React.createClass({
	render: function() {
		return (
			<ShowCmp />
		);
	}
}); 

var Wrapper = React.createClass({
	render: function() {
		return (
			<div>
				Wrapper

				<TitleBar  />
				<CardBody  />
			</div>
		);
	}
})

