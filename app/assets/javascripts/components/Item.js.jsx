var Item = React.createClass({
	getInitialState: function() {
		return { edit: false };
	},

	toggleEdit: function() {
		this.setState({ edit: !this.state.edit });
	},

	// buyItem: function() {
	// 	$.ajax({
	// 		url: '/buy_item',
	// 		type: 'PUT',
	// 		data: { item: { quantity: this.props.quantity - 1 }, id: this.props.id }
				// success: function() {
				// 	self.props.refreshStore();
				// }
	// 	});
	// },

	deleteItem: function() {
		var self = this;
		$.ajax({
			url: '/items/' + this.props.id,
			type: 'DELETE',
			sucess: function() {
				self.props.refreshStore();
			}
		})
	},

	updateItem: function(e) {
		e.preventDefault();
		var name = ReactDOM.findDOMNode(this.refs.itemName).value;
		var description = ReactDOM.findDOMNode(this.refs.itemDescription).value;
		var cost = ReactDOM.findDOMNode(this.refs.itemCost).value;
		var quantity = ReactDOM.findDOMNode(this.refs.itemQuantity).value;
		var self = this;
		$.ajax({
			url: '/items/' + this.props.id,
			type: 'PUT',
			data: { item: { name: name, description: description, cost: cost, quantity: quantity }},
			success: function() {
				self.setState({edit: false});
				self.props.refreshStore();
			},
		});
	},

	edit: function() {
		return(<li>
						<div className="row">
							<div className="col s10">
								<form onSubmit={this.updateItem}>
									<input autoFocus={true} type="text" defaultValue={this.props.name} ref="itemNamee" />
									<input type="textarea" defaultValue={this.props.description} ref="itemDescription" />
									<input type="number" defaultValue={this.props.cost} ref="itemCost" />
									<input type="number" defaultValue={this.props.quantity} ref="itemQuantity" />
								</form>
							</div>	
							<div className="col s2">
								<a onClick={this.toggleEdit}>Cancel</a>
							</div>
						</div>
					 </li>)
	},

	item: function() {
		var id = "item-" + this.props.id;
		return(<li>
						<div className="row">
							<div onClick={this.toggleEdit}>
								{this.props.name}
								{this.props.description}
								{this.props.cost}
								{this.props.quantity}
							</div>
							<div className='col s9'>
								{this.props.name}
							</div>
							<div onClick={this.buyItem} className="col s2">
								<button className="btn grey waves-effect waves-light" id={id} type="submit">Buy One!</button> 
								<label htmlFor={id}>Buy it Now!</label>
							</div>
							<div onClick={this.deleteItem} className="col s1">
								X
							</div>
						</div>
					 </li>);
	},


	render: function() {
		if(this.state.edit) 
			return this.edit();
		 else 
			return this.item();
	}
});