var SearchCmp = React.createClass({
	getDefaultProps: function() {
		return {
			onSubmit: function() {}
		}
	}, 
	handleClick: function() {
		var txtDom = document.getElementById('txt1'); 
		var onSubmit = this.props.onSubmit; 
		onSubmit(txtDom.value);
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
	getDefaultProps: function() {
		return {
			searchValue: ''
		}
	}, 
	render: function() {
		return (
			<div>{this.props.searchValue}</div>
		);
	}
})

var Wrapper = React.createClass({
	handleSubmit: function(value) {
		console.log(value)
		this.setState({
			searchValue: value
		})
	}, 
	getInitialState: function() {
		return {
			searchValue: ''
		}
	}, 
	render: function() {
		return (
			<div>
				Wrapper

				<SearchCmp onSubmit={this.handleSubmit} />
				<ShowCmp   searchValue={this.state.searchValue} />
			</div>
		);
	}
})

