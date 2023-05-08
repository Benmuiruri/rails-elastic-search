Rails.application.routes.draw do
  root 'posts#index'
  post 'search', to: 'search#search', as: 'search'
  post 'search/suggestions', to: 'search#suggestions', as: 'search_suggestions'

  resources :posts
end
