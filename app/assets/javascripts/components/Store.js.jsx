var Store =  React.createClass({
	getInitialState: function() {
		return { items: [] }
	},

	componentDidMount: function() {
		this.refreshStore();
	},

	showAddForm: function() {
		this.setState({ showAdd: !this.state.showAdd});
	},

	addItemName: function(e) {
		this.setState({ itemName: e.currentTarget.value });
	},

	addItemDescription: function(e) {
		this.setState({ itemDescription: e.currentTarget.value });
	},

	addItemCost: function(e) {
		this.setState({ itemCost: e.currentTarget.value });
	},

	addItemQuantity: function(e) {
		this.setState({ itemQuantity: e.currentTarget.value });
	},

	submitItem: function(e) {
		e.preventDefault();
		var name = this.state.itemName;
		var description = this.state.itemDescription;
		var cost = this.state.itemCost;
		var quantity = this.state.itemQuantity;
		var self = this;
		$.ajax({
			url: '/items',
			type: 'POST',
			data: { item: { name: name, description: description, cost: cost, quantity: quantity }},
			success: function(data) {
				var items = self.state.items;
				items.push(data);
				self.setState({ items: items, showAdd: false, itemName: null, itemDescription: null, itemCost: null, itemQuantity: null });
			}
		});
	},

	addItemForm: function() {
		if(this.state.showAdd){
			return(<div>
						 	 <form onSubmit={this.submitItem}>
						 	 	 <div className="input-field">
						 	 	 	 <input autoFocus='true' placeholder="Name your Item" type='text' onChange={this.addItemName} />
						 	 	 	 <textarea placeholder="Description" onChange={this.addItemDescription} />
						 	 	 	 <input type="number" placeholder="Item Cost" onChange={this.addItemCost} />
						 	 	 	 <input placeholder="Quantity" type="number" onChange={this.addItemQuantity} />
						 	 	 	 <button className="btn waves-effect waves-light black" type="submit">Save</button>
						 	 	 </div>
						 	 </form>
						 </div>);
		}
	},

	refreshStore: function() {
		var self = this;
		$.ajax({
			url: '/items',
			type: 'GET',
			success: function(data) {
				self.setState({ items: data });
			}
		});
	},

	displayItems: function() {
		var items = [];
		for(var n = 0; n < this.state.items.length; n++){
			var item = this.state.items[n];
			var key = "Item-" + item.id;
			items.push(<Item refreshStore={this.refreshStore} key={key} id={item.id} name={item.name} description={item.description} cost={item.cost} quantity={item.quantity} />);
		}
		return items;
	},

	render: function() {
		return (<div>
							<h1>Welcome to React-Store</h1>
							<h3>Here are our products!!</h3>
							<button className="waves-effect waves-light btn purple" onClick={this.showAddForm}>Add Item</button>
								{this.addItemForm()}
							<div className="row">
								<div className="col s10">
									<div className="card green">
										<div className="card-content white-text">
											<div className="card-title">to be added later</div>
												{this.displayItems()}
										</div>
									</div>	
								</div>
							</div>
						</div>);
	}
});