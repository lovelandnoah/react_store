Rails.application.routes.draw do
  root 'store#index'
  resources 'items'
  
  put 'buy_item', to: 'items#buy_item' 
end
