Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: 'json'} do 
    resource :session, only: [:create, :update, :destroy]
    resources :users, only: [:create, :show, :index]
    resources :videos, only: [:index, :create, :show, :update, :destroy]
    resources :comments, only: [:index, :create, :show, :update, :destroy]
    resources :likes, only: [:create, :update, :destroy]
    match 'users' => 'users#update', :via => :patch
  end
  root 'static_pages#root'
end
