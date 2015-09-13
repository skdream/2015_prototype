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
				<input type="button" value="submit" onClick={this.handleClick} />
			</div>
		);
	}
})

var Wrapper = React.createClass({
	handleSubmit: function(value) {
		console.log(value);
	}, 
	render: function() {
		return (
			<div>
				Wrapper
				<br />
				<SearchCmp onSubmit={this.handleSubmit} />
			</div>
		);
	}
})

