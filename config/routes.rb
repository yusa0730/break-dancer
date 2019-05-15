Rails.application.routes.draw do
  get 'likes/create'
  get 'likes/destroy'
  get 'uploader/index'
  get 'uploader/form'

  post 'uploader/upload'

  get 'uploader/download'
  resources :articles
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'users#index'
  # root 'articles#index'
  get 'top' => 'users#top'
  get 'all' => 'users#all'
  resources :messages, :only => [:create] do
    resources :likes, only: [:create, :destroy]
  end


  resources :rooms, :only => [:create, :show,:index]

  resources :places
  resources :relationships

  resources :users do
  	member do
  		get :following, :followers
  	end
  end

end
