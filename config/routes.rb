Rails.application.routes.draw do
  get 'uploader/index'
  get 'uploader/form'

  post 'uploader/upload'

  get 'uploader/download'
  resources :articles
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'users#index'
  # root 'articles#index'
  resources :users
  resources :places
end
