var Child = React.createClass({
	render: function() {
		return <div>child</div>; 
	}
})

var Parent = React.createClass({
	render: function() {
		return (
			<div>
				Parent
				<Child />
			</div>
		);
	}
})

