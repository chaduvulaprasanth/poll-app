Rails.application.routes.draw do
  root 'pollings#index'
  get 'signup', to: 'users#new'
  get 'login', to: "sessions#new"
  delete "logout", to:"sessions#destroy"
  resources 'users', only: [:create]
  resources 'sessions', only: [:create]
  resources 'pollings', only: [:new, :create, :update]
  resources 'votes', only: [:create]
end
