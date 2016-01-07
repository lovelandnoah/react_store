class ItemsController < ApplicationController
	def index
		render json: Item.all.order(:created_at)
	end




	# def buy_item
	# 	item = item.find(params[:id])
	# 	item.update(quantity: )
	# end



	def create
		item = Item.create(item_params)
		render json: item
	end

	def update
		item = Item.find(params[:id])
		item.update(item_params)
		render json: item
	end

	def destroy
		item = Item.find(params[:id]).destroy
		head :ok
	end

	private
	
	def item_params
		params.require(:item).permit(:name, :description, :cost, :quantity)
	end
end
