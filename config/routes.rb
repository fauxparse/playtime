Rails.application.routes.draw do
  resources :passwords, controller: 'clearance/passwords', only: %i[create new]
  resource :session, controller: 'clearance/sessions', only: %i[create]

  resources :users, controller: 'clearance/users', only: %i[create] do
    resource :password,
      controller: 'clearance/passwords',
      only: %i[create edit update]
  end

  get '/login' => 'clearance/sessions#new', as: 'sign_in'
  delete '/logout' => 'clearance/sessions#destroy', as: 'sign_out'
  get '/register' => 'clearance/users#new', as: 'sign_up'

  root to: 'teams#index'
end
